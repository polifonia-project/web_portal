import json

from sonicclient import SearchClient, IngestClient
from SPARQLWrapper import SPARQLWrapper, JSON

QUERY_METHODS = ['github', 'sparql_endpoint','rest_api']


with open("config.json") as config_form:
	c = json.load(config_form)

def query_index(text):
	"""Search a string in the index.

	Parameters
	----------
	text : str
		The string to be searched
	collection : str
		The collection in sonic index where to look in
	bucket : str
		The bucket in sonic index where to look in

	Returns
	-------
	resp_dict
		a list of identifiers of resources matching the query string

	"""

	return sonic_query(text)

def ingest_data(source_name):
	""" Ingest data from a source into the index.

	Parameters
	----------
	source: dict
		the object describing the data source in the config file
	collection : str
		The collection in sonic index where to look in
	bucket : str
		The bucket in sonic index where to look in

	Returns
	-------
	"""
	# check if the source has already been ingested
	source = c["data_sources"][source_name]
	is_ingested = False if "status" not in source else True

	# FIRST INGESTION
	if is_ingested == False:
		# query data: get all entities and labels
		print("[NEW] data source ingestion:", source_name)
		query_method = source["query_method"]
		if query_method in QUERY_METHODS:
			data = get_data(query_method, source[query_method], source["iri_base"])
			print("[SUCCESS] got data from endpoint:",source[query_method])
			sonic_ingest(data)
			print("[SUCCESS] updated index")
			# change status in config.json
			source["status"] = "ingested"
			with open("config.json", 'w') as fout:
				fout.write(json.dumps(c, indent=1))
	else:
		# check if changes happened in the data source
		print("[UPDATE] data source ingestion:", source_name)


def get_data(method, endpoint, iri_base=None):
	""" Dispatch query according to the method.

	Parameters
	----------

	Returns
	-------
	"""
	print("[Dispatch] query method:", method)
	return query_sparql(endpoint, iri_base) if method == "sparql_endpoint" else \
			query_api(endpoint, iri_base) if method == "rest_api" else \
			query_github(endpoint, iri_base)

def query_sparql(endpoint,iri_base):
	"""
	Parameters
	----------

	Returns
	-------
	"""

	if_iri_base = "filter( regex( str(?s), \"^"+iri_base+"\" ) ) . " if iri_base else ""
	QUERY = """SELECT DISTINCT ?s (SAMPLE(?o) AS ?l)
	WHERE {?s rdfs:label ?o . """+if_iri_base+"""
	FILTER NOT EXISTS { filter( regex( str(?s), "/$" ) ) } .  } GROUP BY ?s """

	data = get_sparql_results(QUERY,endpoint)
	print("[SUCCESS] query endpoint:",endpoint)
	data = {result["s"]["value"]:result["l"]["value"] for result in data["results"]["bindings"] if len(result["l"]["value"]) > 0}
	return data

def query_api(endpoint,iri_base):
	"""
	Parameters
	----------

	Returns
	-------
	"""
	# may be more than one API call
	data = ''
	return data

def query_github(endpoint,iri_base):
	"""
	Parameters
	----------

	Returns
	-------
	"""
	data = ''
	return data

def get_sparql_results(query, endpoint):
	"""
	Parameters
	----------

	Returns
	-------
	"""
	sparql = SPARQLWrapper(endpoint)
	sparql.setQuery(query)
	sparql.setReturnFormat(JSON)
	results = sparql.query().convert()
	return results

# SONIC specific methods

def sonic_ingest(data, collection="polifonia", bucket="entities"):
	"""
	Parameters
	----------

	Returns
	-------
	"""
	with IngestClient(c["index_host"], c["index_channel"], c["index_pw"]) as ingestcl:
		for iri,label in data.items():
			print(iri,label)
			ingestcl.ping()
			ingestcl.push(collection, bucket, iri, label)

def sonic_query(text, collection="polifonia", bucket="entities"):
	"""
	Parameters
	----------

	Returns
	-------
	resp: list
	"""
	with SearchClient(c["index_host"], c["index_channel"], c["index_pw"]) as querycl:
		print(querycl.ping())
		resp = querycl.query(collection, bucket, text)
		return resp

def sonic_flush_bucket():
	"""
	Parameters
	----------

	Returns
	-------
	"""
	with IngestClient(c["index_host"], c["index_channel"], c["index_pw"]) as ingestcl:
		ingestcl.flush_bucket(collection="polifonia",bucket="entities")

def sonic_count():
	"""
	Parameters
	----------

	Returns
	-------
	"""
	with IngestClient(c["index_host"], c["index_channel"], c["index_pw"]) as ingestcl:
		ingestcl.count(collection="polifonia",bucket="entities")
