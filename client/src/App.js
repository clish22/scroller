import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [state, setState] = useState(0);

  const handleClick = async () => {
    try {
      const response = await axios.get('http://localhost:3001/');
      setState(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="App">
      <h1>Scroller</h1>
      <p>This is a simple scroller app.</p>
      <button onClick={handleClick}>Click me!</button>
      {state && <p>{state}</p>}
    </div>
  );
}

export default App;
