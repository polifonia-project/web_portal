def split_uris(s):
    return "\"%s\"" % "\" \"".join(s.split("__")),
