import { useState } from 'react';
import './App.css'
import { InputFlightForm } from './InputFlight/InputFlightForm';
import { OutputFlight } from './OutputFlight/outputFlight';


function App() {
  const [data, setData] = useState(null);

  return (
  <>
    <div className="App">
        <h1>Flight Ticket Dashboard</h1>

        <InputFlightForm setData={setData}></InputFlightForm>
        <OutputFlight data = {data}></OutputFlight>
        
      </div>
    </>
  );
}

export default App;
