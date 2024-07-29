import { useState } from 'react';
import './App.css'
import Map from './Map/map';
import axios from 'axios'

function App() {

  // http://api.aviationstack.com/v1/flights?access_key=dafc4978c2868980d877f629edf37197&flight_iata=GF135
  // 3f73b3a87c3e6b9b0f64a9e98cfdd01b
  const API_KEY = 'dafc4978c2868980d877f629edf37197'; // Replace with your actual API key
  const [entityData, setEntityData] = useState(null);
  const [flightNumber, setFlightNumber] = useState('');
  const [data, setData] = useState(null);
  const [depDate, setDepDate] = useState('');
  // const [data,setData] = useState({
  //   "pagination": {
  //       "limit": 100,
  //       "offset": 0,
  //       "count": 2,
  //       "total": 2
  //   },
  //   "data": 
  //       {
  //           "flight_date": "2024-07-29",
  //           "flight_status": "active",
  //           "departure": {
  //               "airport": "Indira Gandhi International",
  //               "timezone": "Asia/Kolkata",
  //               "iata": "DEL",
  //               "icao": "VIDP",
  //               "terminal": "3",
  //               "gate": "17B",
  //               "delay": 44,
  //               "scheduled": "2024-07-29T21:50:00+00:00",
  //               "estimated": "2024-07-29T22:50:00+00:00",
  //               "actual": "2024-07-27T22:34:00+00:00",
  //               "estimated_runway": "2024-07-27T22:34:00+00:00",
  //               "actual_runway": "2024-07-27T22:34:00+00:00"
  //           },
  //           "arrival": {
  //               "airport": "Bahrain International",
  //               "timezone": "Asia/Bahrain",
  //               "iata": "BAH",
  //               "icao": "OBBI",
  //               "terminal": "4",
  //               "gate": "15B",
  //               "baggage": "A05",
  //               "delay": null,
  //               "scheduled": "2024-07-27T23:35:00+00:00",
  //               "estimated": "2024-07-27T23:35:00+00:00",
  //               "actual": null,
  //               "estimated_runway": null,
  //               "actual_runway": null
  //           },
  //           "airline": {
  //               "name": "Gulf Air",
  //               "iata": "GF",
  //               "icao": "GFA"
  //           },
  //           "flight": {
  //               "number": "135",
  //               "iata": "GF135",
  //               "icao": "GFA135",
  //               "codeshared": null
  //           },
  //           "aircraft": {
  //               "registration": "A9C-XC",
  //               "iata": "A21N",
  //               "icao": "A21N",
  //               "icao24": "8940CD"
  //           },
  //           "live": {
  //               "updated": "2024-07-27T17:37:51+00:00",
  //               "latitude": 28.5104,
  //               "longitude": 72.8387,
  //               "altitude": 9753.6,
  //               "direction": 266,
  //               "speed_horizontal": 909.332,
  //               "speed_vertical": 0,
  //               "is_ground": false
  //           }
  //       },
  //   });
  console.log(data)

  const handleInputChange = (e) => {
    setFlightNumber(e.target.value);
  };

  const fetchFlightDetails = async () => {
    const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`;
    console.log(url)
      try {
          const response = await axios.get(url);
          console.log(response.data);
          response.data["data"] = Array.isArray(response.data["data"]) ? response.data["data"] : (response.data["data"] ? [response.data["data"]] : [])
          response.data["data"] =  response.data["data"].filter(flight => flight["flight_date"] === depDate);
          if(response.data["data"].length>1){
            let filteredArray =  response.data["data"].filter(flight => flight["live"]!==null)
            if(filteredArray.length!==0){
              response.data["data"] = filteredArray
            }
          }
          setData(response.data); // Set flight data state
          console.log(data)
      } catch (err) {
          
      } finally {
          
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFlightDetails();
  };

  const handleDateChange = (event) => {
    setDepDate(event.target.value);
};

  const subscribeHandler = (e) =>{
    e.preventDefault();
    setEntityData({
          "flightNumber":data['data'][0]['flight']['iata'],
          "estimatedTime":data['data'][0]["departure"]["estimated"].split('+')[0],
          "scheduledTime":data['data'][0]["departure"]["scheduled"].split('+')[0],
          "terminal":data['data'][0]["departure"]["terminal"],
          "gate":data['data'][0]["departure"]["gate"],
          "delay":data['data'][0]["departure"]["delay"],
          "timeZone":data['data'][0]["departure"]["timezone"],
          "userList":[{
            "email":e.target.email.value,
            "phoneNumber":e.target.number.value,
            "travelDate":data['data'][0]["departure"]["scheduled"].split('+')[0],
            "userid":null,
            "flight":null
          }]
        });

    console.log(entityData)

    axios.post('http://localhost:8080/subscribe', entityData)
      .then(response => {
          console.log(response)
      })
      .catch(error => {
          console.error('There was an error sending the data!', error);
      });

  }

  return (
  
 <div className="App">
       <h1>Flight Ticket Dashboard</h1>
       <form onSubmit={handleSubmit} className="form">
         <label>
           Enter Flight Number:
           <input
            type="text"
            value={flightNumber}
            onChange={handleInputChange}
            placeholder="e.g., AA123"
          />
        </label>
            Departure Date
            <label htmlFor="dateInput">Choose a date:</label>
            <input
                type="date"
                id="dateInput"
                value={depDate}
                onChange={handleDateChange}
            />
        <button type="submit">Get Flight Details</button>
      </form>
      {data && (
        <div className="ticket">
          <div className="ticket-header">
            <div className="ticket-airline">
              <h3>{data['data'][0]["airline"]["name"]}</h3>
            </div>
            <div className="ticket-flight-number">
              <h1>{data['data'][0]['flight']['iata']}</h1>
            </div>
          </div>
          <div className="ticket-body">
            <div className="ticket-info">
              <p><strong>Departure:</strong> {new Date(data['data'][0]["departure"]["estimated"].split('+')[0]).toLocaleString()}</p>
              <p><strong>Arrival:</strong> {new Date(data['data'][0]["arrival"]["estimated"].split('+')[0]).toLocaleString()}</p>
              <p><strong>Source Station:</strong> {data['data'][0]["departure"]["airport"]}</p>
              <p><strong>Destination Station:</strong> {data['data'][0]["arrival"]["airport"]}</p>
            </div>
          </div>
          {data['data'][0]['live']!==null && <Map latitude = {data['data'][0]['live']['latitude']} longitude = {data['data'][0]['live']['longitude']}></Map>}
          <div className="ticket-footer">
            <p>Thank you for flying with us!</p>
          </div>
          
          <form onSubmit={subscribeHandler} className="form">
          <label>
            Enter email or phone number to subscribe
            <input
              type="text"
              name = "email"
              placeholder="Email"
            />
            <input
              type="text"
              name = "number"
              placeholder="Phone Number"
            />
          </label>
          <button type="submit">Click here to subscribe</button>
        </form>

        </div>
      )}
    </div>

  );
}

export default App;
