import json


with open('./verbes_lowercase.json') as json_data:
    verbs = json.load(json_data)

print(verbs[0])
