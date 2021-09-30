import React, { useState, useRef, useContext } from 'react'
import { ContextAPI } from '../Context/ContextAPi';
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import LockIcon from '@material-ui/icons/Lock';
import Modal from '@material-ui/core/Modal';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';


const useStyles = makeStyles({
    root: {
        height: '55vh',
        width: '60vh',
        background: '#ECF0F1',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '9px'
    },
    header: {
        color: '#3F3F3F'
    },
    bodyCopy: {
        paddingTop: '1.9rem',
        color: '#6A6565'
    },
    label: {
        paddingTop: '1.2rem',
        color: '#3F3F3F',
        fontWeight: '700'
    },
    input: {
        width: '100%',
        border: '1px solid #3D3F41',
        borderRadius: '3px',
        paddingLeft: '2rem',
        marginTop: '0.5rem',
        height: '2.8em'
    },
    lockIcon: {
        position: 'absolute',
        marginTop: '0.95em',
        marginLeft: '0.5rem',
        width: '0.7em',
        height: '0.7em'
    },
    switch: {
        position: 'absolute',
        right: '2em',
        marginBottom: '6em',
    },
    button: {
        position: 'absolute',
        bottom: '2rem',
        right: '3em',
        height: '2.5em',
        width: '6.2em',
        border: 'none',
        borderRadius: '4px',
        background: '#3E4F68',
        fontSize: '1rem',
        fontWeight: '600',
        color: '#ECF0F1',
        letterSpacing: '0.08rem',
        cursor: 'pointer'
    },
    infoIcon: {
        position: 'absolute',
        bottom: '2.4rem',
        color: '#787878'
    },
    closeButton: {
        position: 'absolute',
        right: '1.6em',
        top: '2.2rem',
        color: '#787878',
        cursor: 'pointer'
    }
});

const AddChannelModal = ({setModalOpen, closeModal, setToken, setClient, setExpiry}) => {

    const {data, setData} = useContext(ContextAPI); //fetch api responses => data.token, etc.
    const classes = useStyles();

    const channelName = useRef();
    const channelDescription = useRef();

    const [modalClose, setModalClose] = useState(true);
    const [nameInputValue, setNameInputValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [switchState, setSwitchState] = useState('');
    const [headerPrivate, setheaderPrivate] = useState(false);
    const [privateDetails, setPrivateDetails] = useState(false);
    const [lockIcon, setLockIcon] = useState(false);

    const [tokenValue, setTokenValue] = useState();
    const [clientVal, setClientVal] = useState();
    const [expiryVal, setExpiryVal] = useState();

    const fetchCredentials = () => {
        setToken(tokenValue)
        setClient(clientVal)
        setExpiry(expiryVal)
    }

    //function to handle closing of Add Channel modal
    const handleClose = () => {
        setModalClose (!modalClose);
        closeModal(false)
        setNameInputValue('')
        setDescriptionValue('')
        setSwitchState(false)
    }

    const handleSwitchChange = (event) => {
        setSwitchState(event.target.checked);
        setheaderPrivate(!headerPrivate)
        setPrivateDetails(!privateDetails)
        setLockIcon(!lockIcon)
    }

    //functions to access value of input on change and set to empty once modal closes
    const handleNameInputValue = () => {
        setNameInputValue(channelName.current.value)
    }

    const handleDescriptionValue = () => {
        setNameInputValue(channelDescription.current.value)
    }

    //Function to post request in creating new Channel
    const createChannel = (e) => {
        e.preventDefault();
        handleClose();
        axios({
            method: 'POST',
            url:'http://206.189.91.54/api/v1/channels',
            headers: {
                'access-token': tokenValue,
                client: clientVal,
                expiry: expiryVal,
                uid: 'allen2.test@email.com',
            },
            data: {
                name: nameInputValue,
                user_ids: ['allen2.test@email.com']
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const allChannels = (e) => {
        e.preventDefault();
        handleClose();
        axios({
            method: 'GET',
            url:'http://206.189.91.54/api/v1/channels',
            headers: {
                'access-token': tokenValue,
                client: clientVal,
                expiry: expiryVal,
                uid: 'allen2.test@email.com',
            },
            data: {
                name: nameInputValue,
                user_ids: ['allen2.test@email.com']
            }
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    const login = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url:'http://206.189.91.54/api/v1/auth/sign_in',
            data: {
                email: 'allen2.test@email.com',
                password: 'password2'
            }
        })
        .then(res => {
            const {'access-token': token, client, expiry} = res.headers;
            setTokenValue(token)
            setClientVal(client)
            setExpiryVal(expiry)
            console.log(res.headers)
        })
        .catch(err => console.log(err))
    }
    
    //creating component for the modal
    const body = (
        <div className={classes.root}>
            <button onClick={login}>log In</button>
            <CloseIcon className={classes.closeButton} onClick={handleClose} />
            <div style={{margin: '1.6em 2.9em'}}>
                <h1 className={classes.header}>Create a {headerPrivate ? 'private ' : null}channel</h1>
                <Typography  className={classes.bodyCopy} variant='body1'>
                    Channels are where your team communicates. They’re best when organized around a topic — #coding, for example.
                </Typography>
                <form>
                <Typography 
                className={classes.label}>
                    Name
                </Typography>
                {lockIcon ? <LockIcon className={classes.lockIcon} /> : null }
                <input
                className={classes.input}
                ref={channelName}
                value={nameInputValue}
                onChange={handleNameInputValue}
                type='text' 
                variant='outlined' 
                placeholder='e.g coding-session' 
                required/>
                <Typography 
                className={classes.label}>
                    Description
                </Typography>
                <Typography
                style={{
                    position: 'absolute',
                    marginLeft: '6.7em',
                    marginTop: '-1.4rem',
                    color: '#8F9093'
                }}
                variant='subtitle2'>(optional)</Typography>
                <InputBase 
                className={classes.input}
                ref={channelDescription}
                onChange={handleDescriptionValue}
                value={descriptionValue}
                type='text' 
                variant='outlined' 
                required/>
                <Typography 
                style={{color: '#8F9093'}}
                variant='subtitle2'>
                    What's this channel about?
                </Typography>
                <Typography 
                className={classes.label}>
                    Make private
                </Typography>
                <Typography
                style={{
                    color: '#6A6565',
                    width: '75%'
                }}
                variant='body1'>
                    {privateDetails 
                    ? 'When a channel is set to private, it can only be viewed or joined by invitation.'
                    : 'This can’t be undone. A private channel cannot be made public later on.'}
                </Typography>
                <FormControlLabel
                control={
                    <Switch
                        checked={switchState}
                        onChange={handleSwitchChange}
                        name='checkPrivate'
                        color='primary'
                        className={classes.switch}
                    />}
                 />
                </form>
                <button 
                    className={classes.button}
                    onClick={fetchCredentials}
                >Create</button>
                <InfoOutlinedIcon className={classes.infoIcon} />
            </div>
        </div>
    )

    return (
        <div>
            <Modal
            open='true'
            open={setModalOpen}
            onClose={handleClose}
            >
                {body}
            </Modal>
        </div>
    )
}

export default AddChannelModal
