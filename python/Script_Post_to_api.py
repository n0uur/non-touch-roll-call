"""Script_Post_to_api"""
import winsound
import requests


def error():
    """Return Error Function"""
    print("Error")
    winsound.Beep(2500, 750)


def api_shoot(data):
    """Return api_shoot Function"""
    param = {"ID": data}
    res = requests.post("https://api-t2o.ktnis.me", params=param)
    if res.text == "200":
        print("Success")
        for _ in range(2):
            winsound.Beep(2500, 250)
    else:
        error()


def script():
    """Script to shoot api"""
    while True:
        data = input()
        allnumber = "1234567890"
        count = 0
        for number in data:
            if number not in allnumber or len(data) != 10:
                count += 1
        if count > 0:
            error()
            count = 0
        else:
            api_shoot(data)
            count = 0
script()
