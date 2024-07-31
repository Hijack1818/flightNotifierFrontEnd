# Getting Started with Create React App

### Back-end Link 
https://github.com/Hijack1818/flightNotifier

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Flight Notifier

## Overview

Flight Notifier is a React-based web application designed to provide users with real-time information about flights. By entering a flight number and departure date, users can get detailed updates on the flight's current status, including live location, scheduled time, and arrival time. The application also features a map for visual tracking and allows users to subscribe for notifications about changes in the flight’s schedule, terminal, or gate.

## Key Features

### Flight Information Input
![image](https://github.com/user-attachments/assets/48b38d23-13e3-430b-8151-d2a024359059)

- **Flight Number:** Users can input the flight number (e.g., AA123) into a text field.
- **Departure Date:** Users select the departure date from a date picker.

### Real-Time Flight Details

![image](https://github.com/user-attachments/assets/c6158267-04ff-4571-a7c1-7cc2cf96c600)

### Loading Screen

![image](https://github.com/user-attachments/assets/c23e3cca-a1f6-4e63-9a37-c990e35be679)



- **Live Location:** Displays the real-time location of the flight on a map, showing its current latitude and longitude.
- **Scheduled Time:** Shows the flight’s scheduled departure and arrival times.
- **Arrival Time:** Provides the estimated arrival time based on current data.
- **Map Integration:** A map component visually represents the flight’s current position, helping users track the flight’s journey.

### Subscription for Updates

![image](https://github.com/user-attachments/assets/9fe40801-ab47-431c-a106-8cfe11b2bf6e)


![image](https://github.com/user-attachments/assets/9d93848c-edaf-4e15-b85d-080ca7162cb7)


- **Email and Phone Number Input:** Users can enter their email address and phone number to subscribe to updates.
- **Notifications:** Subscribed users receive notifications about important changes, such as:
  - **Terminal Changes:** Alerts if the departure or arrival terminal changes.
  - **Gate Changes:** Notifications if there are changes to the departure or arrival gate.
  - **Schedule Changes:** Updates on any modifications to the flight’s schedule.

## User Experience

### User Interface
- **Input Form:** A form for users to enter the flight number and select the departure date.
- **Flight Ticket Display:** Once the flight details are fetched, the application displays:
  - Airline name
  - Flight number
  - Departure and arrival times
  - Source and destination stations
- **Map Component:** Shows the live location of the flight on a map for visual tracking.
- **Subscription Form:** Allows users to subscribe to receive updates via email and phone.

### Data Handling
- **API Integration:** Utilizes an external API to fetch real-time flight data based on user inputs.
- **Error Handling:** Provides user feedback if there are errors with fetching flight data or subscribing to updates.

### Interactive Elements
- **Submit Button:** Triggers the API call to get flight details.
- **Subscribe Button:** Submits the user’s contact information for notifications.

## Technical Stack
- **Frontend Framework:** React
- **State Management:** React hooks for managing form input and flight data
- **API Integration:** Axios or Fetch API to make HTTP requests to the flight data API
- **Map Component:** Integration with mapping services (e.g., Google Maps, Mapbox) for displaying the flight’s location

## Example Usage

1. **Enter Flight Number and Date:**
   - User inputs "AA123" as the flight number and selects "2024-07-29" as the departure date.
   - Clicks the "Get Flight Details" button.

2. **View Flight Details:**
   - The app fetches the flight information and displays:
     - The airline's name
     - Scheduled departure and arrival times
     - Live flight location on the map
     - Source and destination stations

3. **Subscribe for Updates:**
   - User enters their email and phone number.
   - Clicks the "Click here to subscribe" button to receive notifications about any changes related to the flight.

## Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/flight-notifier.git
