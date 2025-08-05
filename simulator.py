import json, time, random, datetime, subprocess
#Try to add vibration, electric current too
def get_status(temp):
    return "FAULT" if temp >= 85 else "OK"

def run_simulation(entry_limit =10):
    global running
    running = True
    print("Running simulation......")
    count = 0

    previous_status = "OK"

    while count < entry_limit and running:
        temp = random.randint(60, 100) #Simulated temperature
        status = get_status(temp)
        data = {
            "temperature":temp, 
            "status":status, 
            "timestamp":datetime.datetime.now().isoformat()
        }

        try:
            with open("data.json","a") as f:
                json.dump(data, f) 
                f.write("\n")
            print(f"Simulated: {data}")
        except Exception as e:
            print(f"Error writing to file: {e}")

        count += 1

        if previous_status == "OK" and status == "FAULT":
            print("FAULT detected. Running mail.js...")
            subprocess.run(["node", "mail.js"])  

        previous_status = status
        time.sleep(5)

def stop_simulation():
    global running
    running = False