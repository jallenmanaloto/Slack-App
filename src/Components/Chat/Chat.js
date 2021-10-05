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
  const [receiverId, setReceiverId] = useState('')
  const msgRef = useRef();


  const {
    apiData,
    setApiData,
    apiHeaders,
    setApiHeaders,
    tokenValue,
    setTokenValue,
  } = useContext(ContextAPI);

  
/*   const displayMsgs = () => {
    const data = {
      method: "Get",
      url: "users",
      "access-tokens": tokenValue,
      client: apiHeaders.client,
      expiry: apiHeaders.expiry,
      uid: apiHeaders.data?.data?.uid,

      receiver_id: .data?.data?.id,
      receiver_class: "user",
    }; 

    DisplayMsgsAPI(data)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }; */


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
            if (usersList[i].email === sendTo) {
                setReceiverId(usersList[i].id)
            }
        }
     }  

    console.log(receiverId);

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
      <label>Send to:</label>
        <input onChange={(e) => {setSendTo(e.target.value)}}/>
             {usersList
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
                })}  

      <label>Msg box</label>
      <input onChange={(e) => setInputMsg(e.target.value)} value={inputMsg}></input>
      <button onClick={(e) => sendMsg(e)}>Send</button>

      <span>{messages}</span>
    </div>
  );
};

export default Chat;
