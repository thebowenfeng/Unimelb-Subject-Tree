from bs4 import BeautifulSoup
import requests
import re
import pymongo

client = pymongo.MongoClient("mongodb+srv://root:<pswd>@cluster0.09aek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.subjects
collection = db.subject


def parse_subject(url):
    html = requests.get(url).content
    soup = BeautifulSoup(html, features="html.parser")
    code = re.search(r'[a-z]{4}[0-9]{5}', url).group(0)
    spans = list(soup.find_all("span", {"itemprop": "name"}))

    if len(spans) == 3:
        name = spans[2].text
        print(f"Parsing {name} ({code})...")

        if collection.find_one({"code": code}) is None:
            obj = {"code": code, "name": name, "childs": []}
            collection.insert_one(obj)

        get_reqs(code)
    else:
        print(f"Error: {code} does not exist")


def insert_child(parent_code, child_code):
    html = requests.get(f"https://handbook.unimelb.edu.au/2022/subjects/{parent_code}").content
    soup = BeautifulSoup(html, features="html.parser")
    spans = list(soup.find_all("span", {"itemprop": "name"}))
    if len(spans) == 3:
        name = spans[2].text
        if collection.find_one({"code": parent_code}) is None:
            obj = {"code": parent_code, "name": name, "childs": []}
            collection.insert_one(obj)

        obj = collection.find_one({"code": parent_code})
        if child_code not in obj["childs"]:
            collection.update_one({"code": parent_code}, {'$push': {"childs": child_code}})


def get_reqs(code):
    html = requests.get(f"https://handbook.unimelb.edu.au/2022/subjects/{code}/eligibility-and-requirements").content
    soup = BeautifulSoup(html, features="html.parser")

    for elem in soup.find("div", {"id": "prerequisites"}):
        m = re.findall(r'[A-Z]{4}[0-9]{5}', elem.text)
        if m:
            print(f"Requirements found for: {code}. They are: {str(m)}")
            for req in m:
                insert_child(req.lower(), code)

def main():
    for i in range(1, 118):
        subj_list = requests.get(f"https://handbook.unimelb.edu.au/search?types%5B%5D=subject&year=2022&subject_level_type%5B%5D=undergraduate&study_periods%5B%5D=all&area_of_study%5B%5D=all&org_unit%5B%5D=all&campus_and_attendance_mode%5B%5D=all&page={i}&sort=_score%7Cdesc").content
        soup = BeautifulSoup(subj_list, features="html.parser")
        for subj in soup.find_all("li", {"class": "search-result-item search-result-item--subject search-result-item--subject-undergraduate"}):
            url = "https://handbook.unimelb.edu.au/" + subj.find("a").get("href")
            parse_subject(url)

parse_subject("https://handbook.unimelb.edu.au/2022/subjects/comp20003")