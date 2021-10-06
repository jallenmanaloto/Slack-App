import React, { useState, useRef, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ContextAPI } from "../Context/ContextAPi";
import { RetrieveUsersAPI, SendDmAPI, DisplayMsgsAPI } from "../API/DmAPI";
import axios from 'axios';
import { SentimentVerySatisfiedTwoTone } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({


}));

const Chat = () => {
  /* const classes = useStyles(); */
  /* const [to, setTo] = useState(""); */

  const [usersList, setUsersList] = useState([]);
  const [sendTo, setSendTo] = useState('');
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  
  const [userStorage, setUserStorage] =  useState();

  const sendRef = useRef();

  const {
    apiData,
    setApiData,
    apiHeaders,
    setApiHeaders,
    tokenValue,
    setTokenValue,
  } = useContext(ContextAPI);

   //Get all users
   useEffect (() => {
    axios({
        method: 'Get',
        url: 'http://206.189.91.54/api/v1/users',
        headers: {
            'access-token': tokenValue,
            client: apiHeaders.client,
            expiry: apiHeaders.expiry,
            uid: apiData.data?.data?.uid,
        },
    })
        .then((res) => {
            setUsersList(res.data.data)
            
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
      url: `http://206.189.91.54/api/v1/messages?receiver_id=${receiverId}}&receiver_class=User`,
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
        console.log(res.data.data);
        setMessages(res.data.data); 
        setUserStorage(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }



 
    
    console.log(usersList)

    /* console.log(receiverId); */
    /* console.log(messages);   */
    /* console.log('here')
    console.log(userStorage) */

    

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
                console.log(res.data);
            })
            .catch(err => 
                console.log(err))    
    };  


  return (
    <div>
      <div>
        <label>Send to:</label>
          <input ref={sendRef}/> 
          <button onClick={(e) => getMsgs(e)}>Get</button>
              {/* {usersList
                  .filter((val) => {
                      if (sendTo === '') {
                          return val
                      } else if (JSON.stringify(val.uid).includes(sendTo)) {
                          return val
                      } return false;
                  }).map((val,key) => {
                      return(
                          <div className="users" key={key}>
                              <p>{val.email}</p>
                          </div>
                      );
                  })}   */}

        <label>Msg box</label>
        <input onChange={(e) => setInputMsg(e.target.value)}  ></input>
        <button onClick={(e) => sendMsg(e)}>Send</button>
      </div>
      <div>
          {/*  {messages.map((val) => {
              return (
                  <p>{val.body}</p>

              )
     
              })} */}
      </div>
    </div>
  );
};

export default Chat;
