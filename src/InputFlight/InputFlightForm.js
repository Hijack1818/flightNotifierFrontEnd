import { useState } from 'react';
import axios from 'axios';
import '../App.css'

export const InputFlightForm = (prop) =>{

    const [flightNumber, setFlightNumber] = useState('');
    const [errorMessageFlight, setErrorMessageFlight] = useState("");
    const [depDate, setDepDate] = useState('');

    const fetchFlightDetails = async () => {
        const url = `http://localhost:8080/getFlightInfo?flightNumber=${flightNumber}`;
        console.log(url)
          try {
              const response = await axios.post(url);
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
