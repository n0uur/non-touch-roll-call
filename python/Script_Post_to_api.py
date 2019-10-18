"""Script_Post_to_api"""
import winsound
import requests


def error():
    """Return Error Function"""
    print("Error")
    winsound.Beep(2500, 750)


def api_post(classID, data):
    """Return api_shoot Function"""
    param = {"ClassID": classID, "CardID": data}
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
    if len(classID) == 5:
        while True:
            data = input()
            if data.isdigit() == True and len(data) == 10:
                api_post(classID, data)
            else:
                error()
    else:
        error()


script()
