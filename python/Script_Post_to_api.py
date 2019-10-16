"""Scrip_Post_to_api"""
import requests
def main():
    data = str(list(range(20)))
    param = {"key": data}
    res = requests.post("https://api-t2o.ktnis.me", params = param)
    if res.text == "200":
        print("Success")
    else:
        print("Error")
main()
