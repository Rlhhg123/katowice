import json


def convert_wikipedia_name_to_url(wiki_name):
    parts = wiki_name.split(":")
    return f"https://{parts[0]}.wikipedia.org/wiki/{parts[1].replace(' ', '_')}"


def getCenter(ele):
    nodes = ele["nodes"]
    lats = []
    lons = []

    for new in dat["elements"]:
        if new["type"] == "node" and new["id"] in nodes:
            lats.append(new["lat"])
            lons.append(new["lon"])

    return {"lat": sum(lats) / len(lats), "lon": sum(lons) / len(lons)}


def getIcon(tags):
    if tags.get("tourism") == "museum":
        return "museum"
    if tags.get("leisure") == "park":
        return "park"
    if tags.get("building") in ["church", "cathedral", "chapel"]:
        return "church"
    if tags.get("historic") in ["memorial", "cemetery", "monument"]:
        return "monument"
    if tags.get("aeroway") == "aerodrome":
        return "airport"
    if tags.get("amenity") == "theatre":
        return "theatre"
    if tags.get("historic") in ["building", "ruins", "yes", "industrial"]:
        return "historic"
    if tags.get("tourism") in ["attraction", "gallery", "artwork"]:
        return "attraction"

    print("unable to find icon for:", tags)
    return None


def getDat(tags):
    data = {"wikipedia": convert_wikipedia_name_to_url(tags["wikipedia"])}
    if tags.get("website"):
        data["website"] = tags.get("website")
    if tags.get("contact:website"):
        data["website"] = tags.get("contact:website")
    if tags.get("phone"):
        data["phone"] = tags.get("phone")
    if tags.get("contact:phone"):
        data["website"] = tags.get("contact:phone")
    if tags.get("email"):
        data["phone"] = tags.get("email")
    if tags.get("contact:email"):
        data["website"] = tags.get("contact:email")
    if house_number := tags.get("addr:housenumber"):
        if street := tags.get("addr:street"):
            data["address"] = f"Katowice, {street} {house_number}"
        if place := tags.get("addr:place"):
            data["address"] = f"Katowice, {place} {house_number}"

    data.update({"img": [], "summary": "", "short": "", "discreption": ""})

    return data


dat = json.load(open("./export.json"))
exported = []

for index, ele in enumerate(dat["elements"]):
    if not ele.get("tags") or ele["type"] == "relation":
        continue
    new = {
        "lat": ele.get("lat"),
        "lon": ele.get("lon"),
        "id": index,
        "icon": getIcon(ele["tags"]),
        "name": ele["tags"].get("name", ele["tags"]["wikipedia"].lstrip("pl:")),
    }

    json.dump(
        getDat(ele["tags"]), fp=open(f"./PLACES/{index}.json", "w"), ensure_ascii=False
    )
    if not new["name"]:
        print("no name for:", ele["id"], ele["type"])
    if ele["type"] != "node":
        new.update(getCenter(ele))
    exported.append(new)


json.dump(exported, fp=open("./PLACES/data.json", "w"), ensure_ascii=False)
