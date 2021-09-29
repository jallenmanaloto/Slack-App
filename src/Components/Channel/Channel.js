import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
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
        height: '95vh',
        background: '#ECF0F1',
        marginTop: '5em',
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
        paddingBottom: '2.5em',
        borderRadius: '4px',
        fontSize: '1rem',
        outline: 'none'
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
        height: '3em',
        width: '3em'
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
        right: 0
    },
    welcomeContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    welcome: {
        display: 'flex',
        marginTop: '1em',
        marginLeft: '1.8rem',
        paddingBottom: '3em',
        paddingTop: '50vh'
    },
    welcomeText: {
        fontSize: '1.06rem',
        color: '#3F3F3F',
        marginLeft: '1.4em',
        marginRight: '5em'
    }
}));

const Channel = () => {

    const classes = useStyles();
    
    return (
        <div className={classes.root}>
            <div className={classes.channelNameContainer}>
            <Typography className={classes.channelName} variant='h5'>
                    # Channel-name
                </Typography>
            </div>
            <div className={classes.contentDisplay}>
                <div className={classes.mySpace}>
                    <Grid> 
                        <Grid item xs={12}> 
                            <div className={classes.welcome}>
                                <img src={TMiBot} alt="bot" className={classes.bot} />
                                <div className={classes.welcomeContainer}>
                                    <Typography 
                                    className={classes.welcomeText}
                                    variant='h6'>
                                        This is the very beginning of the <strong># Channel-name</strong> channel
                                    </Typography>
                                    <Typography 
                                    className={classes.welcomeText}
                                    variant='h6'>
                                        This channel is for working on a project. Hold meetings, share docs, and make decisions together with your team.
                                    </Typography>
                                </div>
                                
                            </div>
                            
                                {/* {messages.map((val, key) =>  */}
                                    <div className={classes.message}>
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
                                                {/* {val} */}
                                        </Typography>
                                    </div>
                                {/* )} */}
                        </Grid>
                    </Grid>
                    <AutoScroll />
                </div>
            </div>
                <input 
                placeholder='Message #Channel-name'
                className= {classes.input} 
                defaultValue=''
                type="text" />
                <Button
                type='submit'
                className={classes.button}><SendIcon className={classes.sendIcon}/></Button>
        </div>
    )
}

export default Channel
