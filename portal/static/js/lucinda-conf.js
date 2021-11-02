var browser_conf = {
  "sparql_endpoint": "https://projects.dharc.unibo.it/musow/sparql",

  "prefixes": [
    {"prefix":"wd","iri":"http://www.wikidata.org/entity/"},
    {"prefix":"schema","iri":"https://schema.org/"},
    {"prefix":"rdfs","iri":"http://www.w3.org/2000/01/rdf-schema#"},
    {"prefix":"bd","iri":"http://www.bigdata.com/rdf#"}
    ],

  "categories":{

    "musow_resource": {
          "rule": "^https://w3id.org/musow/.*",
          "query": [
            `
            SELECT DISTINCT ?work ?title ?desc
            WHERE {
            BIND(<[[VAR]]> as ?work) .
            optional { ?work rdfs:label ?title .}
            optional { ?work schema:description ?desc .}
            }
            `
          ],
          "links": {
            "work": {"field":"work","prefix":""}
          },
          "none_values": {
                      "desc": "No description",
                      "title": "Document without title"
          },

          "contents": {
            "header": [
                {"fields": ["title"], "classes":["header-title"]}
            ],
            "details": [
              {"classes":["20px"]},
              {"fields": ["work"], "classes":["uri_res"] },
              {"classes":["10px"]},
              {"fields": ["desc"], "classes":["desc"] }
            ]
          }
    }
  }
}

//Heuristics
function not_unknown(val){
  return (val != 'unknown')
}
