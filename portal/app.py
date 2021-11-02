#builtin libraries
import json

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
i.ingest_data("musow")
print("count index:", i.sonic_count())


# ROUTING

@app.route('/index', methods=['POST', 'GET'])
def call_index():
	"""Callback function to query the index. Used in the text search

	Returns
	-------
		a dictionary n:v where n is a progressive number
		and v is the URI of a resource.
	"""
	try:
		uri_list = i.query_index(request.args.get('data'))
	except:
		return jsonify({'result': 'Invalid parameter'})

	# TODO dispatch query to correct apis, based on uri base
	param = "__".join(["<"+uri+">" for uri in uri_list])
	req = requests.get("http://127.0.0.1:8081/musow/v1/metadata/"+param)
	res = ""
	if req.status_code == 200:
		res = req.json()
	return jsonify(res)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/resource/<path:res_iri>')
def call_lucinda(res_iri):
	return render_template('resource.html')

if __name__ == "__main__":
	app.run(host=c["app_host"], port=c["app_port"], debug=True) # CHANGE debug
