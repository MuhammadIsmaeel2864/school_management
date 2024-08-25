import requests
import json

base_url = 'http://localhost:3000/schools'

def create_school():
    school_data = {
        "name": "School-A",
        "status": "old",
        "startTime": "8:30am",
        "endTime": "1:30pm",
        "shift": "Morning",
        "address": {
            "town": "Nehar Kot",
            "tehsil": "Barkhan",
            "district": "Barkhan",
            "state": "Balochistan",
            "address": "address-1",
            "latitude": 29.79,
            "longitude": 69.47
        },
        "hasProjector": False,
        "hasLaptop": False,
        "organization": {
            "name": "publicschools"
        }
    }
    response = requests.post(base_url, json=school_data)
    handle_response(response, 'Create')

def update_school():
    school_data = {
        "name": "School-A",
        "status": "updated",
        "startTime": "9:00am",
        "endTime": "2:00pm",
        "shift": "Morning",
        "hasProjector": True,
        "hasLaptop": True
    }
    response = requests.put(base_url, json=school_data)
    handle_response(response, 'Update')

def get_school(school_id):
    response = requests.get(f'{base_url}/{school_id}')
    print('Raw response content:', response.text)  # Debugging line
    handle_response(response, 'Get by ID')


def get_all_schools():
    response = requests.get(base_url)
    handle_response(response, 'Get All')

def delete_school(school_id):
    response = requests.delete(f'{base_url}/{school_id}')    
    # Handle the response
    handle_response(response, 'Delete Record')

def handle_response(response, operation):
    if response.status_code == 200 or response.status_code == 201:
        try:
            data = response.json()  # This should correctly parse the JSON response
            print(f'{operation}:', data)
        except json.JSONDecodeError:
            print(f'{operation}: Response is not in JSON format:', response.text)
    elif response.status_code == 204:
        print(f'{operation}: No content')
    else:
        print(f'{operation}: Error with status code {response.status_code}, response: {response.text}')

# Example usage:
create_school()
update_school()
get_school(2)
get_all_schools()
delete_school(33)