import axios from 'axios';
import { useState } from 'react';
import './Subscribe.css';

export const Subscribe = ({ data }) => {
    const [entityData, setEntityData] = useState(null);
    const [conformation, setConformation] = useState("");
    const [subField, setSubField] = useState(false);
    const [loading, setLoading] = useState(false);

    const subscribeHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setConformation("");

        setEntityData({
            "flightNumber": data['data'][0]['flight']['iata'],
            "estimatedTime": data['data'][0]["departure"]["estimated"].split('+')[0],
            "scheduledTime": data['data'][0]["departure"]["scheduled"].split('+')[0],
            "terminal": data['data'][0]["departure"]["terminal"],
            "gate": data['data'][0]["departure"]["gate"],
            "delay": data['data'][0]["departure"]["delay"],
            "timeZone": data['data'][0]["departure"]["timezone"],
            "userList": [{
                "email": e.target.email.value,
                "phoneNumber": e.target.number.value,
                "travelDate": data['data'][0]["departure"]["scheduled"].split('+')[0],
                "userid": null,
                "flight": null
            }]
        });

        axios.post('http://localhost:8080/subscribe', entityData)
            .then(response => {
                console.log(response);
                setConformation("Thanks for Subscribing!!!");
                setSubField(true);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error sending the data!', error);
                setConformation("There is some error !!!");
                setSubField(false);
                setLoading(false); 
            });
    };

    return (
        <>
            {
            loading && <div className="loading-overlay">
                            <div className="spinner"></div>
                        </div>
            }
            { !subField && !loading && (
                <form onSubmit={subscribeHandler} className="form">
                    <label>
                        Enter email or phone number to subscribe
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            name="number"
                            placeholder="Phone Number"
                            required
                        />
                    </label>
                    <button type="submit">Click here to subscribe</button>
                </form>
            )}
            <div>{conformation}</div>
        </>
    );
}
