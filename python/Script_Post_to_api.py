"""Script_Post_to_api"""
import winsound
import requests
import calendar
from datetime import datetime

def error():
    """Return Error Function"""
    print("Error")
    winsound.Beep(2500, 750)


def attend_api_post(classID, cardID, timestamp):
    """Function to send student attendance API data to the web and receive data from the website"""
    param = {"ClassID": classID, "CardID": cardID, "Timestamp": timestamp}
    res = requests.post("https://api-t2o.ktnis.me", params=param)
    if res.text == "200":
        print("Success")
        for _ in range(2):
            winsound.Beep(2500, 350)
    else:
        error()


def stdreg_api_post(cardID, studentID):
    """This function is used to send the registration API data and receive data from the website."""
    param = {"CardID": cardID, "StudentID": studentID}
    res = requests.post("https://api-t2o.ktnis.me", params=param)
    if res.text == "200":
        print("Success")
        for _ in range(2):
            winsound.Beep(2500, 350)
    else:
        error()


def stdreg():
    """This function is used for registration. By student ID and student ID"""
    while True:
        cardID = input()
        studentID = input()
        if cardID.isdigit() == True and len(cardID) == 10 \
            and studentID.isdigit() == True and len(studentID) == 8:
            stdreg_api_post(cardID, studentID)
        else:
            error()

def attend_class(classID):
    """Functions for using student card scanning To attend class"""
    while True:
        cardID = input()
        tsutc = datetime.utcnow() #UTC Timestamp
        tsutx = calendar.timegm(tsutc.utctimetuple()) #covert UTC to UTX Timestamp
        if cardID.isdigit() == True and len(cardID) == 10:
            attend_api_post(classID, cardID, tsutx)
        else:
            error()

def start():
    """Function to start the system by scanning to attend class"""
    classID = input()
    if classID == "stdreg":
        stdreg()
    else:
        attend_class(classID)




start()
