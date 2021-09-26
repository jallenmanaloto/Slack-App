import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import TMiBot from '../../assets/images/TMiBot.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: '83vw',
            marginLeft: '325px',
        },
        height: '95vh',
        background: '#ECF0F1',
        marginTop: '3em',
        position: 'fixed'
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
        paddingBottom: '2em',
        borderRadius: '4px'
    },
    sendIcon: {
        // marginRight: '2.5rem',
        // marginTop: '4.5rem',
        cursor: 'pointer'
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
        height: '2.4em',
        width: '2.4em'
    },
    message: {
        display: 'flex',
        borderTop: '1px solid rgba(50, 74, 95, 0.25)',
        padding: '2rem 2rem'
    },
    button: {
        position: 'absolute',
        right: 0
    }
}));

const Channel = () => {

    const classes = useStyles();
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([])
    
    
    useEffect(() => {
        if (localStorage.length == 0) {
            console.log('no message')
        } else {
            const message = JSON.parse(localStorage.getItem('message'))
            setMessages([...message])
        }
    }, [messages])
    
    const getInputValue = (e) => {
        setInputValue(e.target.value)
    }
    const sendMessage = (e) => {
        e.preventDefault();
        messages.push(inputValue)
        localStorage.setItem('message', JSON.stringify(messages))
    }

    return (
        <div className={classes.root}>
            <div className={classes.channelNameContainer}>
            <Typography className={classes.channelName} variant='h5'>
                    My Space
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
                            
                            {messages.map((val) => 
                                <div className={classes.message}>
                                <img src={TMiBot} alt="bot" className={classes.user} />
                                <div style={{display: 'flex'}}>
                                    <Typography
                                    style={{
                                        marginLeft: '1.4em',
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
                </div>
            </div>
                <InputBase
                onSubmit={sendMessage}
                onChange={getInputValue}
                className={classes.input}
                placeholder='Message #Channel-name'>
                </InputBase>
                <Button
                type='submit'
                onClick={sendMessage}
                className={classes.button}><SendIcon className={classes.sendIcon}/></Button>
        </div>
    )
}

export default Channel
