import React, { useState, useRef, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ContextAPI } from "../Context/ContextAPi";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
import Picker from "emoji-picker-react";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up("sm")]: {
      width: "83vw",
      marginLeft: "325px",
    },
    position: "fixed",
    background: "#ECF0F1",
    left: "0",
    top: "64px",
    bottom: "0",
    right: "0",
  },
  input: {
    width: "98%",
    height: "10%",
    border: "1px solid black",
    backgroundColor: "#ECF0F1",
    position: "absolute",
    bottom: 0,
    marginLeft: "1%",
    marginBottom: "1rem",
    paddingLeft: "2em",
    paddingBottom: "2.5em",
    borderRadius: "4px",
    fontSize: "1rem",
    outline: "none",
  },
  sendIcon: {
    marginRight: "1rem",
    cursor: "pointer",
    color: "rgba(43, 33, 24, 0.65)",
  },
  contentDisplay: {
    height: "77vh",
    width: "calc(100% + 1px)",
    overflowY: "scroll",
  },
  userNameContainer: {
    height: "5vh",
    width: "calc(100% + 1px)",
    marginTop: "1rem",
    borderBottom: "1px solid rgba(43, 33, 24, 0.25)",
    display: "flex",
    alignItems: "center",
  },
  userName: {
    marginLeft: "1.8rem",
    color: "rgba(63, 63, 63, 1)",
  },
  mySpace: {
    marginTop: "0.8rem",
  },
  bot: {
    height: "3em",
    width: "3em",
  },
  user: {
    height: "1.7em",
    width: "1.7em",
    backgroundColor: "lightcoral",
  },
  message: {
    display: "flex",
    borderTop: "1px solid rgba(50, 74, 95, 0.25)",
    padding: "2rem 2rem",
  },
  button: {
    position: "absolute",
    right: 0,
  },
  emojiPicker: {
    paddingBottom: "4em",
    position: "absolute",
    top: "0",
  },
  welcomeContainer: {
    display: "flex",
    flexDirection: "column",
  },
  welcome: {
    display: "flex",
    marginTop: "1em",
    marginLeft: "1.8rem",
    paddingBottom: "3em",
    paddingTop: "50vh",
  },
  welcomeText: {
    fontSize: "1.06rem",
    color: "#3F3F3F",
    marginLeft: "1.4em",
    marginRight: "5em",
  },
  messageAdornment: {
    position: "absolute",
    bottom: "1.5rem",
    left: "2.2em",
    width: "max-content",
  },
  messageIcons: {
    color: "rgba(43, 33, 24, 0.65)",
    cursor: "pointer",
    height: "1.3rem",
    width: "1.3rem",
    marginLeft: "0.8rem",
  },
}));

const Message = () => {
  const classes = useStyles();
  const {
    allChannels,
    setAllChannels,
    allUsers,
    setAllUsers,
    allUsersInfo,
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
    userMessages, //CONTAINS THE MESSAGES FROM A USER
    setUserMessages,
    userName /* Integrate to localstorage to avoid losing userdata on refresh */,
    setUserName,
    receiverID,
    setReceiverID,
    receiverUN,
    setReceiverUN,
  } = useContext(ContextAPI);

  const [usersList, setUsersList] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [userStorage, setUserStorage] = useState();
  const msgRef = useRef();
  const scrollRef = useRef();

  const sendMsg = (e) => {
    axios({
      method: "Post",
      url: "http://206.189.91.54/api/v1/messages",
      headers: {
        "access-token": authKey.accessToken,
        client: authKey.accessClient,
        expiry: authKey.accessExpiry,
        uid: authKey.accessUID,
      },
      params: {
        receiver_id: receiverID,
        receiver_class: "User",
        body: inputMsg,
      },
    })
      .then((res) => {
        console.log(res);
        refresh();
      })
      .catch((err) => console.log(err));
    setInputMsg("");

    setTimeout(() => {
      scrollRef.current.scrollIntoView();
    }, 400);
  };

  const refresh = () => {
    axios({
      method: "GET",
      url: `https://slackapi.avionschool.com/api/v1/messages?receiver_id=${receiverID}&receiver_class=User`,
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
  };

  const onEmojiClick = (event, emojiObject) => {
    setInputMsg((prev) => prev + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className={`${classes.root} scroll-active`}>
      <div className={classes.userNameContainer}>
        <Typography className={classes.userName} variant="h5">
          {receiverUN}
        </Typography>
      </div>
      <div className={classes.contentDisplay}>
        <div className={classes.mySpace}>
          <Grid>
            <Grid item xs={12}>
              <div className={classes.welcome}>
                <div className={classes.welcomeContainer}>
                  <Typography className={classes.welcomeText} variant="h6">
                    This is the very beginning of your chat with{""}
                    <strong>{` ${receiverUN}`}</strong>
                  </Typography>
                </div>
              </div>
              {userMessages.map((val, key) => {
                const timestamp = new Date(val.created_at);
                return (
                  <div className={classes.message}>
                    <Avatar
                      alt="Miyu Togo"
                      src="/broken-image.jpg"
                      className={classes.user}
                    />
                    <div style={{ display: "flex" }}>
                      <Typography
                        style={{
                          marginLeft: "0.8em",
                          fontWeight: "bold",
                        }}
                      >
                        {val.sender.uid}
                      </Typography>
                      <Typography
                        style={{
                          marginLeft: "1em",
                          color: "rgba(50, 74, 95, 0.7)",
                        }}
                        variant="subtitle2"
                      >
                        {timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </Typography>
                    </div>
                    <Typography
                      style={{
                        position: "relative",
                        fontSize: "1.06rem",
                        color: "#3F3F3F",
                        marginLeft: "-14.2em",
                        marginTop: "1.5rem",
                        marginRight: "5em",
                      }}
                      variant="h6"
                    >
                      {val.body}
                    </Typography>
                  </div>
                );
              })}
              <div ref={scrollRef}></div>
            </Grid>
          </Grid>
        </div>
      </div>
      <input
        placeholder="Message here"
        className={classes.input}
        type="text"
        onChange={(e) => setInputMsg(e.target.value)}
        onClick={() => setShowPicker(false)}
        value={inputMsg}
      />
      <div className={classes.messageAdornment}>
        <AlternateEmailIcon className={classes.messageIcons} />
        <ImageOutlinedIcon className={classes.messageIcons} />
        <AttachFileIcon className={classes.messageIcons} />
        <SentimentSatisfiedOutlinedIcon
          onClick={() => setShowPicker(!showPicker)}
          className={classes.messageIcons}
        />
      </div>
      <Button
        type="submit"
        className={classes.button}
        onClick={(e) => sendMsg(e)}
      >
        <SendIcon className={classes.sendIcon} />
      </Button>
      {showPicker && (
        <Picker
          className={classes.emojiPicker}
          pickerStyle={{
            width: "23%",
            position: "absolute",
            bottom: "7em",
            left: "1.2rem",
          }}
          onEmojiClick={onEmojiClick}
        />
      )}
    </div>
  );
};

export default Message;
