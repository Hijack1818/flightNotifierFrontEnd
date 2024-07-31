import Map from '../Map/Map';
import { Subscribe } from '../Subscribe/subscribe';
import './OutputFlight.css'

export const OutputFlight = ({data}) =>{
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
              </div>
              <Subscribe data={data}></Subscribe>
            </div>
          )}
    </>
    )

} 