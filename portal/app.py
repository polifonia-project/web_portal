#builtin libraries
import json
from collections import defaultdict

# local modules
import indexing as i

# external libraries
from flask import Flask, render_template, request, jsonify
import requests

# APP
app = Flask(__name__)

# CONFIG FILE
with open("config.json") as config_form:
	c = json.load(config_form)

# DATA INGESTION
#i.sonic_flush_bucket()
for source, details in c["data_sources"].items():
	i.ingest_data(source)
#print("count index:", i.sonic_count())


# ROUTING

@app.route('/index', methods=['POST', 'GET'])
def call_index():
	"""Callback function to query the index.
	Get the URIs matching the query string from the index.
	Dispatch queries to APIs based on the URI base (as specified in config.json)
	Return a list of URI, labels to be used in the text search.

	Parameters
	-------
		the string submitted in a text search, retrieved via GET from frontend

	Returns
	-------
		all_results: list of dictionaries including queried uris and labels
	"""
	# query the index
	try:
		uri_list = i.query_index(request.args.get('data'))
	except:
		return jsonify({'result': 'Invalid parameter'})

	# get apis based on uris base
	mappings = defaultdict(list)
	for source, details in c["data_sources"].items():
		for uri in uri_list:
			if details["iri_base"] in uri:
				mappings[details["rest_api"]+"/metadata/"].append(uri)
	mappings = dict(mappings)

	# dispatch query to the correct api
	all_results = []
	for api, uris in mappings.items():
		param = "__".join(["<"+uri+">" for uri in uris])
		req = requests.get(api+param)
		if req.status_code == 200:
			res = req.json()
			# merge results from apis
			for r in res:
				all_results.append(r)
	return jsonify(all_results)

@app.route('/')
def index():
	return render_template('index.html',conf=c["data_sources"])

@app.route('/resource/<path:res_iri>')
def call_lucinda(res_iri):
	return render_template('resource.html')

if __name__ == "__main__":
	app.run(host=c["app_host"], port=c["app_port"], debug=True) # CHANGE debug
