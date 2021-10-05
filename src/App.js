import { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Registration from "./Components/Registration/Registration";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import Channel from "./Components/Channel/Channel";
import HomeChannel from "./Components/Channel/HomeChannel";
import Message from "./Components/Template/Message";
import { ContextAPI } from "./Components/Context/ContextAPi";
import Chat from ".Components/Chat/Chat"

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [apiData, setApiData] = useState({});
  const [apiHeaders, setApiHeaders] = useState();
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
          allUsers,
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
          setUserName,
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Login}>
              <Login setUser={setUser} />
            </Route>
            <Route exact path="/dashboard" component={Main}>
              <Chat />
            </Route>
         {/*    <Route exact path="/dashboard/channel" component={Channel}>
              <Channel />
            </Route> */}
          </Switch>
        </Router>
      </ContextAPI.Provider>
    </div>
  );
}

export default App;
