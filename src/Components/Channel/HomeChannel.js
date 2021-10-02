import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TMiBot from '../../assets/images/TMiBot.svg'
import AutoScroll from './AutoScroll';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: '83vw',
            marginLeft: '325px',
        },
        background: '#ECF0F1',
        position: 'fixed',
        left: '0',
        top: '64px',
        bottom: '0',
        right: '0'
    },
    input: {
        width: '98%',
        height: '10%',
        border: '1px solid black',
        backgroundColor: '#ECF0F1',
        position: 'absolute',
        bottom: 0,
        marginLeft: '1%',
        marginBottom: '1rem',
        paddingLeft: '2em',
        paddingBottom: '2.5em',
        borderRadius: '4px',
        fontSize: '1rem',
        outline: 'none'
    },
    sendIcon: {
        marginRight: '1rem',
        cursor: 'pointer',
        color: 'rgba(43, 33, 24, 0.65)',
    },
    contentDisplay: {
        height: '77vh',
        width: 'calc(100% + 1px)',
        overflowY: 'scroll'
    },
    channelNameContainer: {
        height: '5vh',
        width: 'calc(100% + 1px)',
        marginTop: '1rem',
        borderBottom: '1px solid rgba(43, 33, 24, 0.25)',
        display: 'flex',
        alignItems: 'center'
    },
    channelName: {
        marginLeft: '1.8rem',
        color: 'rgba(63, 63, 63, 1)'
    },
    mySpace: {
        marginTop: '0.8rem',
    },
    bot:{
        height: '5em',
        width: '5em'
    },
    user: {
        height: '1.7em',
        width: '1.7em',
        backgroundColor: 'lightcoral'
    },
    message: {
        display: 'flex',
        borderTop: '1px solid rgba(50, 74, 95, 0.25)',
        padding: '2rem 2rem'
    },
    button: {
        position: 'absolute',
        right: 0,
        bottom: '4.7em'
    },
    messageAdornment: {
        position: 'absolute',
        bottom: '1.5rem',
        left: '2.2em',
        width: 'max-content'
    },
    messageIcons: {
        color: 'rgba(43, 33, 24, 0.65)',
        cursor: 'pointer',
        height: '1.3rem',
        width: '1.3rem',
        marginLeft: '0.8rem'
    }
}));

const HomeChannel = () => {

    const classes = useStyles();
    const inputValue = useRef();
    const [messageInput, setMessageInput] = useState('');
    const [messages, setMessages] = useState([]);

    //Setting new messages appear on the display
    // useEffect(() => {
    //     if (localStorage.length === 0) {
    //         return
    //     } else {
    //             const message = JSON.parse(localStorage.getItem('message'))
    //             setMessages([...message])
    //             ref.current.scrollIntoView({behavior: 'smooth'})
    //     }
    // })

    //function to handle the value passed in the Input
    const handleInputValue = () => {
        setMessageInput(inputValue.current.value)
    }

    //function on sending message
    const sendMessage = (e) => {
        messages.push(inputValue.current.value)
        // setMessageStatus(!messageStatus)
        localStorage.setItem('message', JSON.stringify(messages))
        setMessages([...messages])
        setMessageInput('');
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }

    return (
        <div className={`${classes.root} scroll-active`}>
            <div className={classes.channelNameContainer}>
            <Typography className={classes.channelName} variant='h5'>
                    # My Space
                </Typography>
            </div>
            <div className={classes.contentDisplay}>
                <div className={classes.mySpace}>
                    <Typography variant='h4' style={{fontWeight: 'bold', marginLeft: '1.8rem'}}>
                        Hi, TMi-bot here!
                    </Typography>
                   
                    <Grid> 
                        <Grid item xs={12}> 
                            <div style={{
                                display: 'flex',
                                marginTop: '1em',
                                marginLeft: '1.8rem',
                                paddingBottom: '4em'}}>
                                <img src={TMiBot} alt="bot" className={classes.bot} />
                                <Typography 
                                style={{
                                    fontSize: '1.06rem',
                                    color: '#3F3F3F',
                                    marginLeft: '1.4em',
                                    marginRight: '5em'}}
                                variant='h6'>
                                    You're here! Hello!
                                    <br />  <br />
                                    This is your personal space. You can write anything in here, like a template, draft, or any of your jibber jabbers.
                                    <br /> <br />
                                    You may explore the app so you can get a full grasp to help you with your work as a team or as an individual.
                                    <br /> <br />
                                    I, however, am not a human. Just a bot (a simple bot) that can give you your daily motivation - just type <strong>/motivate</strong> in the message bar and I will give you something to get you motivated.
                                </Typography>
                            </div>
                            
                                {messages.map((val, key) => 
                                    <div key={key} className={classes.message}>
                                        <Avatar 
                                        alt='Miyu Togo'
                                        src='/broken-image.jpg'
                                        className={classes.user} />
                                        {/* <img src={TMiBot} alt="bot" className={classes.user} /> */}
                                        <div style={{display: 'flex'}}>
                                            <Typography
                                            style={{
                                                marginLeft: '0.8em',
                                                fontWeight: 'bold'}}>UserName</Typography>
                                            <Typography  
                                            style={{marginLeft: '1em', color: 'rgba(50, 74, 95, 0.7)'}}
                                            variant='subtitle2'
                                            >12:36 PM</Typography>
                                        </div>
                                        <Typography 
                                                style={{
                                                    position: 'relative',
                                                    fontSize: '1.06rem',
                                                    color: '#3F3F3F',
                                                    marginLeft: '-9.1em',
                                                    marginTop: '1.5rem',
                                                    marginRight: '5em'}}
                                                variant='h6'>
                                                {val}
                                        </Typography>
                                    </div>
                                )}
                        </Grid>
                    </Grid>
                    <AutoScroll />
                </div>
            </div>
                <input 
                    placeholder='Message #Channel-name'
                    className= {classes.input} 
                    ref={inputValue} 
                    onChange={handleInputValue}
                    onKeyDown={handleKeyDown}
                    value={messageInput}
                    type="text" 
                />
                <div className={classes.messageAdornment}>
                    <AlternateEmailIcon className={classes.messageIcons} />
                    <ImageOutlinedIcon className={classes.messageIcons}  />
                    <AttachFileIcon className={classes.messageIcons}  />
                    <SentimentSatisfiedOutlinedIcon className={classes.messageIcons}  />
                </div>
                <Button
                    type='submit'
                    onClick={sendMessage}
                    className={classes.button}
                >
                <SendIcon className={classes.sendIcon}/>
                </Button>
        </div>
    )
}

export default HomeChannel
