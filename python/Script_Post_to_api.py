"""Scrip_Post_to_api"""
import winsound
import requests
def scrip():
    data = str(list(range(20)))
    param = {"key": data}
    res = requests.post("https://api-t2o.ktnis.me", params = param)
    if res.text == "200":
        print("Success")
        for _ in range(2):
            winsound.Beep(2500, 500)
    else:
        print("Error")
        winsound.Beep(2500, 1500)
    
scrip()
