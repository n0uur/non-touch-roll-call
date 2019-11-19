"""Script_Post_to_api"""
import winsound
import requests
import calendar
from datetime import datetime

def error():
    """Return Error Function"""
    print("Error")
    winsound.Beep(2500, 750)


def api_post(classID, cardID, timestamp):
    """Return api_shoot Function"""
    param = {"ClassID": classID, "CardID": cardID, "Timestamp": timestamp}
    res = requests.post("https://api-t2o.ktnis.me", params=param)
    if res.text == "200":
        print("Success")
        for _ in range(2):
            winsound.Beep(2500, 350)
    else:
        error()


def script():
    """Script to shoot api"""
    classID = input()
    while True:
        cardID = input()
        tsutc = datetime.utcnow() #UTC Timestamp
        tsutx = calendar.timegm(tsutc.utctimetuple()) #covert UTC to UTX Timestamp
        if cardID.isdigit() == True and len(cardID) == 10:
            api_post(classID, cardID, tsutx)
        else:
            error()


script()
