import React, { useState, useRef, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ContextAPI } from "../Context/ContextAPi";
import { RetrieveUsersAPI, SendDmAPI, DisplayMsgsAPI } from "../API/DmAPI";
import axios from "axios";
import { SentimentVerySatisfiedTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({}));

const Chat = () => {
  /* const classes = useStyles(); */
  /* const [to, setTo] = useState(""); */

  const [usersList, setUsersList] = useState([]);
  const [sendTo, setSendTo] = useState("");
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  
  const [userStorage, setUserStorage] =  useState();

  const sendRef = useRef();
  const msgRef = useRef();

  const {
    apiData,
    setApiData,
    apiHeaders,
    setApiHeaders,
    authKey,
    setAuthKey,
    tokenValue,
    setTokenValue,
  } = useContext(ContextAPI);


  //Get all users
  useEffect(() => {
    axios({
      method: "Get",
      url: "http://206.189.91.54/api/v1/users",
      headers: {
        'access-token': tokenValue,
        client: apiHeaders.client,
        expiry: apiHeaders.expiry,
        uid: apiData.data?.data?.uid,
       },
    })
        .then((res) => {
            setUsersList(res.data.data)
            getReceiverID();
        })
        .catch(err => 
            console.log(err)) 

    },[])  

  const getReceiverID = () => {
    for (let i = 0; i < usersList.length; i++){
        if (usersList[i].email === sendRef.current.value) {
            setReceiverId(usersList[i].id)
        }
    }
 }
 


  // Get msgs
  const getMsgs = async () => {
    await getReceiverID();
    axios({
      method: "Get",
      url: `http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}&receiver_class=User`,
      headers: {
        'access-token': tokenValue,
        client: apiHeaders.client,
        expiry: apiHeaders.expiry,
        uid: apiData.data?.data?.uid,
       },

      params: {
          receiver_id: receiverId,
          receiver_class: 'User',
      }
      })
      .then((res) => {
        setMessages(res.data.data); 
        setUserStorage(res.data)
        localStorage.setItem('logs',JSON.stringify(userStorage)); 
      })
      .catch((err) => {
        console.log(err);
      })
  }



/*   const logDetails = localStorage.getItem('logs',JSON.parse(userStorage)); */

    /* console.log(usersList) */
    /* console.log(messages);   */
    /* console.log('here')*/

    console.log(userStorage) 

    

  const sendMsg = (e) => {
        getReceiverID();
        e.preventDefault();
        axios({
            method: 'Post',
            url: 'http://206.189.91.54/api/v1/messages',
            headers: {
                'access-token': tokenValue,
                client: apiHeaders.client,
                expiry: apiHeaders.expiry,
                uid: apiData.data?.data?.uid,
            },
            params: {
                receiver_id: receiverId,
                receiver_class: 'User',
                body: inputMsg,
            }
        })
            .then((res) => {
               /*  console.log(res.data); */
            })
            .catch(err => 
                console.log(err))    
    };  

  return (
    <div>
      
        <label>Send to:</label>
          <input ref={sendRef}/> 
          <button onClick={(e) => getMsgs(e)}>Get</button>
           
      <label>Msg box</label>
      <input
        onChange={(e) => setInputMsg(e.target.value)}
        value={inputMsg}
      ></input>
      <button onClick={(e) => sendMsg(e)}>Send</button>

     {/*  <ul>
          {userStorage.map((val, key) => {
            return (
              <li key={key}>
                {val.email} - {val.body}
              </li>
            )
            })}
      </ul>  */}  
    </div>
  );
};

export default Chat;
