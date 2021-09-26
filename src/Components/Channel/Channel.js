import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import Paper from '@material-ui/core/Paper';



const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            width: '83vw',
            marginLeft: '326px',
        },
        
        height: '95vh',
        width: '100vw',
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
        marginRight: '2.5rem',
        marginTop: '4.5rem'
    },
    contentDisplay: {
        height: '82vh',
        marginTop: '1rem',
    }
}));

const Channel = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.contentDisplay}>
                hello
            </div>
            <InputBase
            className={classes.input}
            placeholder='Message #Channel-name'
            endAdornment={
                <InputAdornment position='end'>
                    <SendIcon className={classes.sendIcon}/>
                </InputAdornment>
            }>
            </InputBase>
        </div>
    )
}

export default Channel
