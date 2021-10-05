import React, { useState, useRef, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ContextAPI } from '../Context/ContextAPi';
import { RetrieveUsersAPI, SendDmAPI, DisplayMsgsAPI } from '../API/DmAPI';

const useStyles = makeStyles((theme) => ({

}));

const Chat = () => {

    const classes = useStyles();
    const [to, setTo] = useState('');
    
    

    const [usersList, setUsersList] = useState([]);
    const [sendTo, setSendTo] = useState('');
    const [inputMsg, setInputMsg] = useState('');
    const [messages, setMessages] = useState([]);

    const {
        apiData, 
        setApiData, 
        apiHeaders, 
        setApiHeaders, 
        tokenValue, 
        setTokenValue, 
    } = useContext(ContextAPI);


    const displayMsgs = () => {
        const data = {
            method: 'Get',
            url: 'users',
            'access-tokens': tokenValue,
            client: apiHeaders.client,
            expiry: apiHeaders.expiry,
            uid: apiHeaders.data?.data?.uid,

            /*  receiver_id: .data?.data?.id, */
            receiver_class: 'user',
        }

        DisplayMsgsAPI(data)
            .then((res) => {
                setMessages(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }


    const getAllUsers = (e) => {

     /*    const data =  {
            method: 'Get',
            url: 'users',
            'access-tokens': tokenValue,
            client: apiHeaders.client,
            expiry: apiHeaders.expiry,
            uid: apiHeaders.data?.data?.uid,
        }
    
        RetrieveUsersAPI(data)
            .then((res) => {
                console.log(res)
                console.log()
                setUsersList(res.data)
            })
            .catch(err => console.log(err)) */
        
            console.log(apiHeaders)
    }
    
    const getReceiver = () => {


    }


    const sendMsg = (e) => {
        e.preventDefault();

        const data = {
            method: 'post',
            url: 'messages',
            'access-tokens': tokenValue,
            client: apiHeaders.client,
            expiry: apiHeaders.expiry,
            uid:  apiHeaders.data?.data?.uid,

           /*  receiver_id: .data?.data?.id, */
            receiver_class: 'user',
            body: inputMsg,
        }

        SendDmAPI(data)
            .then((res) => {
                console.log(res.body)
            })
    }

    
return(
    <div>
        <label>Send to:</label>
        <input></input>

        <label>Msg box</label>
        <input></input>
        <button onClick={(e) => getAllUsers()}>Send</button>


        <span>{messages}</span>
    </div>
)


}

export default Chat;
