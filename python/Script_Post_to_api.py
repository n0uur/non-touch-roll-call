"""Script_Post_to_api"""
import winsound
import requests
import calendar
import sys
import json
from datetime import datetime


def start(classID, num_std_in_class):
    """Function to start the system by scanning to attend class"""
    if classID == "stdreg":
        stdreg()
    else:
        attend_class(classID, num_std_in_class)


def stdreg():
    """This function is used for registration. By student ID and student ID"""
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
    """Functions for using student card scanning To attend class"""
    num_std_attend = 0
    while True:
        cardID = input("Please tap the card:")
        if cardID.lower() == "end":
            percentage = percentage_attending_class(
                num_std_in_class, num_std_attend)
            print(
                "The number of students attending the class is %.2f percent of the total students." % percentage)
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
    """Function to send student attendance API data to the web and receive data from the website"""
    param = {"ClassID": classID, "CardID": cardID, "Timestamp": timestamp}
    res = requests.post("https://api-t2o.ktnis.me", params=param)
    recive_paramita(res)


def stdreg_api_post(cardID, studentID):
    """This function is use for send the registration API data and receive data from the website."""
    param = {"CardID": cardID, "StudentID": studentID}
    res = requests.post("https://api-t2o.ktnis.me", params=param)
    recive_paramita(res)


def recive_paramita(res):
    """Function for status notifications"""
    if json.loads(res.text).get('status', 404) == 200:
        now = datetime.now()
        print("Success", now.strftime("%Y-%m-%d %H:%M:%S"))
        for _ in range(2):
            winsound.Beep(2500, 350)
    else:
        error()


def percentage_attending_class(num_std_in_class, num_std_attend):
    """The function calculates the student's attendance  as a percentage"""
    percentage = (num_std_attend/num_std_in_class)*100
    return percentage


def terminate_program():
    """This function is used to theminate the program"""
    sys.exit()


def error():
    """Return Error Function"""
    print("Error")
    winsound.Beep(2500, 750)


start(input("Please fill in the classname:"), int(
    input("Please enter the number of students:")))
