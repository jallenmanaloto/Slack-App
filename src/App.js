import { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ContextAPI } from "./Components/Context/ContextAPi";
import Channel from "./Components/Channel/Channel";
import HomeChannel from "./Components/Channel/HomeChannel";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import Message from "./Components/UserMessage/Message";
import Registration from "./Components/Registration/Registration";
import "./App.css";

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [allChannels, setAllChannels] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [apiHeaders, setApiHeaders] = useState();
  const [auth, setAuth] = useState(false);
  const [authKey, setAuthKey] = useState([]);
  const [fetchFilterMembers, setFetchFilterMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tokenValue, setTokenValue] = useState();
  const [channelData, setChannelData] = useState();
  const [channelID, setchannelID] = useState("");
  const [channelMessage, setchannelMessage] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const [userName, setUserName] = useState([]);
  const [receiverID, setReceiverID] = useState('');
  const [receiverUN, setReceiverUN] = useState('');

  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <div className="App">
      {/* <Registration/>   */}
      {/* <ContextAPI.Provider value={{allUsers,
          setAllUsers,
          apiData,
          setApiData,
          apiHeaders,
          setApiHeaders,
          channelData,
          setChannelData,
          channelMembers,
          setChannelMembers,
          channelMessage,
          setchannelMessage,
          tokenValue,
          setTokenValue,
          userName,
          setUserName,}} > */}
      {/* <Router>
            <Switch>
                <Route exact path='/' component={Login}>
                    <Login setUser={setUser} />
                </Route>
                <Route exact path='/dashboard' component={Main}>
                    <Chat />
                </Route>
              </Switch>
          </Router> */}

      <ContextAPI.Provider
        value={{
          allChannels,
          setAllChannels,
          allUsers,
          setAllUsers,
          apiData,
          setApiData,
          apiHeaders,
          setApiHeaders,
          auth,
          setAuth,
          authKey,
          setAuthKey,
          channelData,
          setChannelData,
          channelID,
          setchannelID,
          channelMembers,
          setChannelMembers,
          channelMessage,
          setchannelMessage,
          fetchFilterMembers,
          setFetchFilterMembers,
          messages,
          setMessages,
          tokenValue,
          setTokenValue,
          userMessages,
          setUserMessages,
          userName,
          setUserName,
          receiverID, 
          setReceiverID,
          receiverUN, 
          setReceiverUN,
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Login}>
              <Login setUser={setUser} />
            </Route>
            <Route exact path="/dashboard" component={HomeChannel}>
              <Message />
              <Main />
            </Route>
            <Route exact path="/dashboard/channel" component={Channel} />
            <Route exact path="/dashboard/message" component={Message} />
            <Route exact path="/register" component={Registration} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </Router>
      </ContextAPI.Provider>
    </div>
  );
}

export default App;
