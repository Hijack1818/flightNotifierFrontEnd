import Map from '../Map/map';
import axios from 'axios'
import { useState } from 'react';
import './outputFlight.css'

export const OutputFlight = ({data}) =>{

    const [entityData, setEntityData] = useState(null);

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
            axios.post('http://localhost:8080/subscribe', entityData)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error('There was an error sending the data!', error);
            });
        }
        
    

    return (
    <>
        {data && data['data'][0] && (
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
                  <div className="flight-details">
                    <div className="departure-info">
                      <h2>Departure</h2>
                      <p><strong>Airport:</strong> {data['data'][0]["departure"]["airport"] + " (" + data['data'][0]["departure"]["iata"] +")"}</p>
                      <p><strong>Time:</strong> {data['data'][0]["departure"]["scheduled"].split('+')[0].replace('T'," ")}</p>
                      <p><strong>Expected Time:</strong> {data['data'][0]["departure"]["estimated"].split('+')[0].replace('T'," ")}</p>
                      <p><strong>Terminal:</strong> {data['data'][0]["departure"]["terminal"]}</p>
                      <p><strong>Gate:</strong> {data['data'][0]["departure"]["gate"]}</p>
                    </div>
  
                    <div className="arrival-info">
                      <h2>Arrival</h2>
                      <p><strong>Airport:</strong> {data['data'][0]["arrival"]["airport"] + " (" + data['data'][0]["arrival"]["iata"] +")"}</p>
                      <p><strong>Time:</strong> {data['data'][0]["arrival"]["scheduled"].split('+')[0].replace('T'," ")}</p>
                      <p><strong>Expected Time:</strong> {data['data'][0]["arrival"]["estimated"].split('+')[0].replace('T'," ")}</p>
                      <p><strong>Terminal:</strong> {data['data'][0]["arrival"]["terminal"]}</p>
                      <p><strong>Gate:</strong> {data['data'][0]["arrival"]["gate"]}</p>
                    </div>
                  </div>
                </div>
                <br></br>
  
                <Map latitude={data['data'][0]['live']['latitude']} longitude={data['data'][0]['live']['longitude']} data={data}/>
                
  
                <div className="ticket-footer">
                  <p>Thank you for flying with us!</p>
                </div>
  
                <form onSubmit={subscribeHandler} className="form">
                  <label>
                    Enter email or phone number to subscribe
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      name="number"
                      placeholder="Phone Number"
                    />
                  </label>
                  <button type="submit">Click here to subscribe</button>
                </form>
              </div>
            </div>
          )}
    </>
    )

} 