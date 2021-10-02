import { useContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Registration from './Components/Registration/Registration'; 
import Login from './Components/Login/Login';
import Main from './Components/Main/Main'
import Channel from './Components/Channel/Channel';
import HomeChannel from './Components/Channel/HomeChannel'
import Message from './Components/Template/Message'
import { ContextAPI } from './Components/Context/ContextAPi';

function App() {
  const [apiData, setApiData] = useState({});
  const [apiHeaders, setApiHeaders] = useState();
  const [tokenValue, setTokenValue] = useState();
  const [channelData, setChannelData] = useState();

  const [user, setUser] = useState(localStorage.getItem('user'));

  return (
    <div className="App">
      {/* <ContextAPI.Provider value={{apiData, setApiData, apiHeaders, setApiHeaders, tokenValue, setTokenValue, channelData, setChannelData}} >
          <Router>
            <Switch>
                <Route exact path='/' component={Login}>
                    <Login setUser={setUser} />
                </Route>
                <Route exact path='/dashboard' component={Main}>
                    <Main />
                </Route>
                <Route exact path='/dashboard/channel' component={Channel}>
                    <Channel />
                </Route>
              </Switch>
          </Router>
      </ContextAPI.Provider> */}

      <Message />
    </div>
  );
}

export default App;