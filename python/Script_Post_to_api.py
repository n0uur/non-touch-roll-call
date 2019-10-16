"""Script_Post_to_api"""
import winsound
import requests
def script():
    while True:
        data = input()
        allnumber = "1234567890"
        count = 0
        for number in data:
            if number not in allnumber or len(data) != 10:
                count += 1
        if count > 0:
            print("Error")
            winsound.Beep(2500, 1500)
            count = 0
        else:
            param = {"ID": data}
            res = requests.post("https://api-t2o.ktnis.me", params = param)
            if res.text == "200":
                print("Success")
                for _ in range(2):
                 winsound.Beep(2500, 250)
            else:
                print("Error")
                winsound.Beep(2500, 1500)
            count = 0
    
script()
