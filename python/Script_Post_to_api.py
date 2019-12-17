"""NON-TOUCH-ROLL-CALL
Student's Card Scanner"""
import winsound
import requests
import calendar
import sys
import json
from datetime import datetime


def start(classID, num_std_in_class):
    """get classid and select mode from classid
    goto student card confirmation if classid is 'stdreg'
    goto attending classroom if not"""
    if classID == "stdreg":
        stdreg()
    else:
        attend_class(classID, num_std_in_class)


def stdreg():
    """get student card infomation and student id and send to API for confirming registration"""
    while True:
        cardID = input("Please tap the card:")
        if cardID.lower() == "end":
            terminate_program()
        studentID = input("Please enter the student id:")
        if cardID.isdigit() and len(cardID) == 10 \
                and studentID.isdigit() and len(studentID) == 8:
            stdreg_api_post(cardID, studentID)
        else:
            error()


def attend_class(classID, num_std_in_class):
    """get student card infomation and send to API for attendance class"""
    num_std_attend = 0
    while True:
        cardID = input("Please tap the card:")
        if cardID.lower() == "end":
            terminate_program()
        num_std_attend += 1
        timestamp_utc = datetime.utcnow()  # UTC Timestamp
        # covert UTC to Unix Timestamp
        timestamp_utx = calendar.timegm(timestamp_utc.utctimetuple())
        if cardID.isdigit() and len(cardID) == 10:
            attend_api_post(classID, cardID, timestamp_utx)
        else:
            error()


def attend_api_post(classID, cardID, timestamp):
    """student attending details to API"""
    param = {"classid": classID, "cardid": cardID, "Timestamp": timestamp}
    res = requests.post("http://103.253.72.94:3000/class/scan", json=param)
    recive_paramita(res)


def stdreg_api_post(cardID, studentID):
    """send registration details to API"""
    param = {"cardid": cardID, "studentid": studentID}
    res = requests.post("http://103.253.72.94:3000/std/register/confirm", json=param)
    recive_paramita(res)


def recive_paramita(res):
    """play sound and print status of respond"""
    if json.loads(res.text).get('status', 404) == 200:
        now = datetime.now()
        print("Success", now.strftime("%Y-%m-%d %H:%M:%S"))
        for _ in range(2):
            winsound.Beep(2500, 350)
    else:
        error()
        print(res.text)


# def percentage_attending_class(num_std_in_class, num_std_attend):
#     """The function calculates the student's attendance  as a percentage"""
#     percentage = (num_std_attend/num_std_in_class)*100
#     return percentage


def terminate_program():
    """program will stop when call this function
    """
    sys.exit()


def error():
    """Return Error Function"""
    print("Error")
    winsound.Beep(2500, 750)


start(input("Please fill in the classname:"), 0)
