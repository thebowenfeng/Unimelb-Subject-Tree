import pymongo

client = pymongo.MongoClient("mongodb+srv://root:<pswd>@cluster0.09aek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.subjects
collection = db.subject

for obj in collection.find():
    if obj["code"] in obj["childs"]:
        print(f"Self child found in {obj['name']} ({obj['code']})")
        collection.update_one({"code": obj["code"]}, {"$pull": {"childs": obj["code"]}})