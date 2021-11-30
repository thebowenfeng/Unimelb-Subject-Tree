import pymongo
import requests
from bs4 import BeautifulSoup

client = pymongo.MongoClient("mongodb+srv://root:<pswd>@cluster0.09aek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.subjects
collection = db.subject


def test_if_discontinue(code):
    html = requests.get(f"https://handbook.unimelb.edu.au/2022/subjects/{code}").content
    soup = BeautifulSoup(html, 'html.parser')

    details = soup.find("p", {"class": "header--course-and-subject__details"})
    if list(details)[2].text == "Not available in 2022":
        return True
    else:
        return False


for obj in collection.find():
    if test_if_discontinue(obj['code']):
        print(f"Discontinued subject found: {obj['name']} ({obj['code']})")
        collection.delete_one({"code": obj["code"]})