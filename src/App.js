import { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Registration from "./Components/Registration/Registration";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import Channel from "./Components/Channel/Channel";
import HomeChannel from "./Components/Channel/HomeChannel";
import { ContextAPI } from "./Components/Context/ContextAPi";
import Chat from "./Components/Chat/Chat";

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
  const [userName, setUserName] = useState([]);

  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <div className="App">
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
          userName,
          setUserName,
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Login}>
              <Login setUser={setUser} />
            </Route>
            <Route exact path="/dashboard" component={HomeChannel}>
              <Chat />
              <Main />
            </Route>
            <Route exact path="/dashboard/channel" component={Channel}>
              <Channel />
            </Route>
            <Route exact path="/register" component={Registration} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </Router>
      </ContextAPI.Provider>
    </div>
  );
}

export default App;
