import { useState } from 'react';
import '../App.css'

export const InputFlightForm = (prop) =>{

    const [flightNumber, setFlightNumber] = useState('');
    const [errorMessageFlight, setErrorMessageFlight] = useState("");
    const [depDate, setDepDate] = useState('');

    const fetchFlightDetails = async () => {
        // setData({
        //     "pagination": {
        //         "limit": 100,
        //         "offset": 0,
        //         "count": 2,
        //         "total": 2
        //     },
        //     "data": [
        //         {
        //             "flight_date": "2024-07-29",
        //             "flight_status": "active",
        //             "departure": {
        //                 "airport": "Indira Gandhi International",
        //                 "timezone": "Asia/Kolkata",
        //                 "iata": "DEL",
        //                 "icao": "VIDP",
        //                 "terminal": "3",
        //                 "gate": "17B",
        //                 "delay": 44,
        //                 "scheduled": "2024-07-29T21:50:00+00:00",
        //                 "estimated": "2024-07-29T22:50:00+00:00",
        //                 "actual": "2024-07-27T22:34:00+00:00",
        //                 "estimated_runway": "2024-07-27T22:34:00+00:00",
        //                 "actual_runway": "2024-07-27T22:34:00+00:00"
        //             },
        //             "arrival": {
        //                 "airport": "Bahrain International",
        //                 "timezone": "Asia/Bahrain",
        //                 "iata": "BAH",
        //                 "icao": "OBBI",
        //                 "terminal": "4",
        //                 "gate": "15B",
        //                 "baggage": "A05",
        //                 "delay": null,
        //                 "scheduled": "2024-07-27T23:35:00+00:00",
        //                 "estimated": "2024-07-27T23:35:00+00:00",
        //                 "actual": null,
        //                 "estimated_runway": null,
        //                 "actual_runway": null
        //             },
        //             "airline": {
        //                 "name": "Gulf Air",
        //                 "iata": "GF",
        //                 "icao": "GFA"
        //             },
        //             "flight": {
        //                 "number": "135",
        //                 "iata": "GF135",
        //                 "icao": "GFA135",
        //                 "codeshared": null
        //             },
        //             "aircraft": {
        //                 "registration": "A9C-XC",
        //                 "iata": "A21N",
        //                 "icao": "A21N",
        //                 "icao24": "8940CD"
        //             },
        //             "live": {
        //                 "updated": "2024-07-27T17:37:51+00:00",
        //                 "latitude": 28.5104,
        //                 "longitude": 72.8387,
        //                 "altitude": 9753.6,
        //                 "direction": 266,
        //                 "speed_horizontal": 909.332,
        //                 "speed_vertical": 0,
        //                 "is_ground": false
        //             }
        //         }]
        //     });
        const url = `http://localhost:8080/getFlightInfo?flightNumber=${flightNumber}`;
        console.log(url)
          try {
              // const response = await axios.post(url);
              let response = {data:{
                "pagination": {
                    "limit": 100,
                    "offset": 0,
                    "count": 2,
                    "total": 2
                },
                "data": [
                    {
                        "flight_date": "2024-07-30",
                        "flight_status": "scheduled",
                        "departure": {
                            "airport": "Heathrow",
                            "timezone": "Europe/London",
                            "iata": "LHR",
                            "icao": "EGLL",
                            "terminal": "2",
                            "gate": null,
                            "delay": null,
                            "scheduled": "2024-07-30T11:25:00+00:00",
                            "estimated": "2024-07-30T11:25:00+00:00",
                            "actual": null,
                            "estimated_runway": null,
                            "actual_runway": null
                        },
                        "arrival": {
                            "airport": "Singapore Changi",
                            "timezone": "Asia/Singapore",
                            "iata": "SIN",
                            "icao": "WSSS",
                            "terminal": null,
                            "gate": null,
                            "baggage": null,
                            "delay": null,
                            "scheduled": "2024-07-31T07:30:00+00:00",
                            "estimated": "2024-07-31T07:30:00+00:00",
                            "actual": null,
                            "estimated_runway": null,
                            "actual_runway": null
                        },
                        "airline": {
                            "name": "Singapore Airlines",
                            "iata": "SQ",
                            "icao": "SIA"
                        },
                        "flight": {
                            "number": "317",
                            "iata": "SQ317",
                            "icao": "SIA317",
                            "codeshared": null
                        },
                        "aircraft": null,
                        "live": {
                                        "updated": "2024-07-27T17:37:51+00:00",
                                        "latitude": 28.5104,
                                        "longitude": 72.8387,
                                        "altitude": 9753.6,
                                        "direction": 266,
                                        "speed_horizontal": 909.332,
                                        "speed_vertical": 0,
                                        "is_ground": false
                                    }
                    }
                ]
            }}
              console.log(response.data);
              filterData(response.data);
              console.log(response.data);
          } catch (err) {
              setErrorMessageFlight("Somthing Went wrong");
              prop.setData(null)
              console.log(err)
          }
      };

      const filterData = (data) =>{
        data["data"] = Array.isArray(data["data"]) ? data["data"] : (data["data"] ? [data["data"]] : [])
        data["data"] = data["data"].filter(flight => flight["flight_date"] === depDate)
        console.log(data)
        if(data["data"].length===0){
          setErrorMessageFlight("Enter correct flight no or date");
          prop.setData(null)
        }else{
          setErrorMessageFlight("")
          prop.setData(data)
        }
      }

    const handleInputChange = (e) => {
        setFlightNumber(e.target.value);
    };

    const handleDateChange = (event) => {
        setDepDate(event.target.value);
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchFlightDetails();
    };

    return (
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
        <label>
          Departure Date
          <input
            type="date"
            id="dateInput"
            value={depDate}
            onChange={handleDateChange}
          />
        </label>
        <button type="submit">Get Flight Details</button>
        {errorMessageFlight!=="" && <div>{errorMessageFlight}</div>}
      </form>
    )
}