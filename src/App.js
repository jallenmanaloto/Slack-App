import { useContext, useState } from 'react';
import './App.css';
import Registration from './Components/Registration/Registration'; 
import Login from './Components/Login/Login';
import Main from './Components/Main/Main'
import Channel from './Components/Channel/Channel';
import HomeChannel from './Components/Channel/HomeChannel'
import { ContextAPI } from './Components/Context/ContextAPi';

function App() {
  const [data, setData] = useState();

  return (
    <div className="App">
<<<<<<< HEAD
      <Registration/>  
       {/* <Login/>    */}
=======
      <ContextAPI.Provider value={{data, setData}} >
          {/* <Registration/>
        <Login/> */}
        <Main />
        <HomeChannel />
        {/* <Channel /> */}
      </ContextAPI.Provider>
>>>>>>> 5f35a3152d19555714bedb2002fbd9e0776c573c
    </div>
  );
}

export default App;