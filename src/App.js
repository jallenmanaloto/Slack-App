import { useContext, useState } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { ContextAPI } from "./Components/Context/ContextAPi";
import Channel from "./Components/Channel/Channel";
import HomeChannel from "./Components/Channel/HomeChannel";
import Login from "./Components/Login/Login";
import Main from "./Components/Main/Main";
import Message from "./Components/UserMessage/Message";
import Registration from "./Components/Registration/Registration";
import Unauthorized from "./Components/Unauthorized/Unauthorized";
import "./App.css";

function App() {
  const [allChannels, setAllChannels] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allUsersInfo, setAllUsersInfo] = useState();
  const [auth, setAuth] = useState(false);
  const [authKey, setAuthKey] = useState([]);
  const [fetchFilterMembers, setFetchFilterMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tokenValue, setTokenValue] = useState();
  const [channelData, setChannelData] = useState();
  const [channelID, setchannelID] = useState("");
  const [channelMessage, setchannelMessage] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [messageDisplay, setMessageDisplay] = useState(false);
  const [userMessages, setUserMessages] = useState([]);
  const [userName, setUserName] = useState([]);
  const [receiverID, setReceiverID] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverUN, setReceiverUN] = useState("");

  const [user, setUser] = useState(localStorage.getItem("user"));
  const history = useHistory();

  return (
    <div className="App">
      <ContextAPI.Provider
        value={{
          allChannels,
          setAllChannels,
          allUsers,
          setAllUsers,
          allUsersInfo,
          setAllUsersInfo,
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
          messageDisplay,
          setMessageDisplay,
          tokenValue,
          setTokenValue,
          userMessages,
          setUserMessages,
          userName,
          setUserName,
          receiverID,
          setReceiverID,
          receiverName,
          setReceiverName,
          receiverUN,
          setReceiverUN,
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Login}>
              <Login setUser={setUser} />
            </Route>
            <Route path="/dashboard/channel" component={Channel} />
            <Route path="/dashboard/message" component={Message} />
            <Route path="/register" component={Registration} />
            <Route path="/dashboard" component={Main} />
            <Route exact path="/404" component={Unauthorized} />
            <Route exact path="*" component={Unauthorized} />
          </Switch>
        </Router>
      </ContextAPI.Provider>
    </div>
  );
}

export default App;
