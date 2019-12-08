"""Script_Post_to_api"""
import winsound
import requests
import calendar
import sys
import json
from datetime import datetime

def start():
    """Function to start the system by scanning to attend class"""
    classID = input()
    if classID == "stdreg":
        stdreg()
    else:
        attend_class(classID)


def stdreg():
    """This function is used for registration. By student ID and student ID"""
    while True:
        cardID = input()
        if cardID == "End":
            terminate_program()
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
        if cardID == "End":
            terminate_program()
        timestamp_utc = datetime.utcnow() #UTC Timestamp
        timestamp_utx = calendar.timegm(timestamp_utc.utctimetuple()) #covert UTC to Unix Timestamp
        if cardID.isdigit() == True and len(cardID) == 10:
            attend_api_post(classID, cardID, timestamp_utx)
        else:
            error()



def attend_api_post(classID, cardID,timestamp):
    """Function to send student attendance API data to the web and receive data from the website"""
    param = {"ClassID": classID, "CardID": cardID, "Timestamp": timestamp}
    res = requests.post("https://api-t2o.ktnis.me", params=param)
    recive_paramita(res)


def stdreg_api_post(cardID, studentID):
    """This function is used to send the registration API data and receive data from the website."""
    param = {"CardID": cardID, "StudentID": studentID}
    res = requests.post("https://api-t2o.ktnis.me", params=param)
    recive_paramita(res)


def recive_paramita(res):
    if json.loads(res.text).get('status', 404) == 200:
        now = datetime.now()
        print("Success", now.strftime("%Y-%m-%d %H:%M:%S"))
        for _ in range(2):
            winsound.Beep(2500, 350)
    else:
        error()


def terminate_program():
    """This function is used to stop the program"""
    sys.exit()


def error():
    """Return Error Function"""
    print("Error")
    winsound.Beep(2500, 750)

start()
