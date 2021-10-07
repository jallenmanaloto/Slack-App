import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import Message from "../UserMessage/Message";
import { ContextAPI } from "../Context/ContextAPi";
import { Button, makeStyles, Modal, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    background: "#ECF0F1",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    height: "22vh",
    width: "25vw",
  },
  button: {
    border: "1px solid blue",
  },
  buttonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "1rem 4em",
  },
  head: {
    textAlign: "center",
    paddingTop: "1rem",
  },
  input: {
    width: "100%",
    marginTop: "1.5rem",
    height: "3em",
    border: "1px solid rgba(43, 41, 40, 0.6)",
    borderRadius: "5px",
    outline: "none",
  },
});

const DirectMessage = ({ sendMessageModalOpen, setSendMessageModalOpen }) => {
  const classes = useStyles();

  const {
    allChannels,
    setAllChannels,
    allUsers,
    setAllUsers,
    apiData,
    setApiData,
    apiHeaders,
    setApiHeaders,
    auth,
    setAuth,
    authKey,
    setAuthKey,
    channelData,
    setChannelData,
    channelID,
    setchannelID,
    channelMembers,
    setChannelMembers,
    channelMessage,
    setchannelMessage,
    fetchFilterMembers,
    setFetchFilterMembers,
    setMessages,
    tokenValue,
    setTokenValue,
    userMessages,
    setUserMessages,
    receiverID,
    setReceiverID,
    receiverUN,
    setReceiverUN,
    messageDisplay,
    setMessageDisplay,
    userName /* Integrate to localstorage to avoid losing userdata on refresh */,
    setUserName,
  } = useContext(ContextAPI);

  const inputVal = useRef();
  const [inputValue, setInputValue] = useState("");
  const history = useHistory();

  //function to handle close for modal
  const handleClose = () => {
    setSendMessageModalOpen(false);
  };

  /* const handleInputValue = () => {
    setInputValue(inputVal.current.value);
  };
 */
  const handleGetReceiverID = () => {
    setInputValue(inputVal.current.value);
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === inputVal.current.value) {
        setReceiverID(allUsers[i].id);
        setReceiverUN(allUsers[i].email);
      } else if (allUsers[i].id === inputVal.current.value) {
        setReceiverID(allUsers[i].id);
        setReceiverUN(allUsers[i].email);
      }
    }
  };

  //function to retrieve message with a user
  const retrieveMessage = () => {
    axios({
      method: "GET",
      url: `http://206.189.91.54/api/v1/messages?receiver_id=${receiverID}&receiver_class=User`,
      headers: {
        "access-token": authKey.accessToken,
        client: authKey.accessClient,
        expiry: authKey.accessExpiry,
        uid: authKey.accessUID,
      },
      params: {
        receiver_id: receiverID,
        receiver_class: "User",
      },
    })
      .then((res) => {
        setUserMessages(res.data?.data);
      })
      .catch((err) => console.log(err.response));
    setMessageDisplay(true);
    handleClose();
  };

  const sendMessageModal = (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography className={classes.head} variant="h5">
          Enter ID or Email
        </Typography>
        <input
          onChange={handleGetReceiverID}
          value={inputValue}
          ref={inputVal}
          className={classes.input}
          type="text"
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button onClick={retrieveMessage} className={classes.button}>
          Message
        </Button>
        <Button onClick={handleClose} className={classes.button}>
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <Modal open={sendMessageModalOpen} onClose={handleClose}>
        {sendMessageModal}
      </Modal>
    </div>
  );
};

export default DirectMessage;
