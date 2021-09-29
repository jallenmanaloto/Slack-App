import './App.css';
import Registration from './Components/Registration/Registration'; 
import Login from './Components/Login/Login';
import Main from './Components/Main/Main'
import Channel from './Components/Channel/Channel';
import HomeChannel from './Components/Channel/HomeChannel'
import { ContextAPI } from './Components/Context/ContextAPi';

function App() {
  const data = {}

  return (
    <div className="App">
      <ContextAPI.Provider value={data} >
          {/* <Registration/>
        <Login/> */}
        <Main />
        <HomeChannel />
        {/* <Channel /> */}
      </ContextAPI.Provider>
    </div>
  );
}

export default App;