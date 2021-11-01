import sonic
from sonicclient import SearchClient

# ingest
#with IngestClient("localhost", 1491, "SecretPassword") as ingestcl:
    # print(ingestcl.ping())
    # print(ingestcl.protocol)
    # print(ingestcl.bufsize)
    # ingestcl.push("wiki", "articles", "article-1", "for the love of god hell")
    # ingestcl.push("wiki", "articles", "article-2", "for the love of satan heaven")
    # ingestcl.push("wiki", "articles", "article-3", "for the love of lorde hello")
    # ingestcl.push("wiki", "articles", "article-4", "for the god of loaf helmet")

# query
with SearchClient("localhost", 1491, "SecretPassword") as querycl:
    print(querycl.ping())
    print("query")
    print(querycl.query("wiki", "articles", "love"))
    print("suggest")
    print(querycl.suggest("wiki", "articles", "lo"))
