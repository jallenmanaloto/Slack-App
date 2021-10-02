import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({

}));

const PersonalMsg = () => {

    const classes = useStyles();
    const [to, setTo] = useState('');
    const [messages, setMessages] = useState('');
    const [thread, setThread] = useState([]);

   /*  const addMessage = (add) => {
        setThread(prevMsgs => [...prevMsgs,add ]);
    }
 */

    /* const Send = () => {
        thread.push(input.current.value)
        localStorage.setItem('DMs', json.stringify(thread))
         
    } */

    const handleSend = (e) => {
        
    }




}