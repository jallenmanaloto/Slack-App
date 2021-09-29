import './App.css';
import Registration from './Components/Registration/Registration'; 
import Login from './Components/Login/Login';
import Main from './Components/Main/Main'
import Channel from './Components/Channel/Channel';
import HomeChannel from './Components/Channel/HomeChannel'
import { useState } from 'react';


function App() {

  const [headers, setHeaders] = useState('');
  const [data, setData] = useState('');
  return (
    <div className="App">
    <Registration/> 
    {/* <Login/>  */}
    </div>
  );
}

export default App;