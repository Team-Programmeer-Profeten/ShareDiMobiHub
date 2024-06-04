import json

with open('wijk.json', 'r') as wijkJson:
    wijk = json.load(wijkJson)

    for feature in wijk['features']:
        print(feature['GM_NAAM'])
        