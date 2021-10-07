import React, { useState, useEffect, useContext, useRef } from "react";
import { ContextAPI } from "../Context/ContextAPi";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import TMiBot from "../../assets/images/TMiBot.svg";
import AutoScroll from "./AutoScroll";
import axios from "axios";
import ChannelMember from "../Modal/ChannelMember";
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
  channelNameContainer: {
    height: "5vh",
    width: "calc(100% + 1px)",
    marginTop: "1rem",
    borderBottom: "1px solid rgba(43, 33, 24, 0.25)",
    display: "flex",
    alignItems: "center",
  },
  emojiPicker: {
    paddingBottom: "4em",
    position: "absolute",
    top: "0",
  },
  channelName: {
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

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    marginBottom: "1rem",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: "-1px",
      left: "-1px",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const Channel = () => {
  // declaring values for context
  const {
    apiData,
    setApiData,
    apiHeaders,
    setApiHeaders,
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
    tokenValue,
    setTokenValue,
    userName,
    setUserName,
  } = useContext(ContextAPI);

  const classes = useStyles();
  const inputValue = useRef();
  const messageView = useRef();
  const [messageInput, setMessageInput] = useState("");
  const [newMessage, setNewMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

  //retrieving messages on a channel
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://206.189.91.54/api/v1/messages?receiver_id=${channelData.id}&receiver_class=Channel`,
      headers: {
        "access-token": authKey.accessToken,
        client: authKey.accessClient,
        expiry: authKey.accessExpiry,
        uid: authKey.accessUID,
      },
      params: {
        receiver_id: channelData.data?.data?.id,
        receiver_class: "Channel",
      },
    })
      .then((res) => {
        setchannelMessage(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [channelID, newMessage]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleInputValues = () => {
    setMessageInput(inputValue.current.value);
  };

  const sendMessage = (e) => {
    //push the input value to api
    axios({
      method: "POST",
      url: "http://206.189.91.54/api/v1/messages",
      headers: {
        "access-token": authKey.accessToken,
        client: authKey.accessClient,
        expiry: authKey.accessExpiry,
        uid: authKey.accessUID,
      },
      data: {
        receiver_id: channelData.id,
        receiver_class: "Channel",
        body: messageInput,
      },
    })
      .then((res) => {
        setNewMessage(!newMessage);
        setMessageInput("");
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      messageView.current.scrollIntoView();
    }, 400);
  };

  const onEmojiClick = (event, emojiObject) => {
    setMessageInput((prev) => prev + emojiObject.emoji);
    setShowPicker(false);
  };

  return (
    <div className={`${classes.root} scroll-active`}>
      <div className={classes.channelNameContainer}>
        <Typography className={classes.channelName} variant="h5">
          {`# ${channelData.name}`}
        </Typography>
        <ChannelMember />
      </div>
      <div className={classes.contentDisplay}>
        <div className={classes.mySpace}>
          <Grid>
            <Grid item xs={12}>
              <div className={classes.welcome}>
                <img src={TMiBot} alt="bot" className={classes.bot} />
                <div className={classes.welcomeContainer}>
                  <Typography className={classes.welcomeText} variant="h6">
                    This is the very beginning of the{" "}
                    <strong>channelname</strong> channel
                  </Typography>
                  <Typography className={classes.welcomeText} variant="h6">
                    This channel is for working on a project. Hold meetings,
                    share docs, and make decisions together with your team.
                  </Typography>
                </div>
              </div>
              {channelMessage.map((val, key) => {
                const timestamp = new Date(val.created_at);
                return (
                  <div key={key} className={classes.message}>
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      variant="dot"
                    >
                      <Avatar
                        alt={val.sender.uid}
                        src="/broken-image.jpg"
                        className={classes.user}
                      />
                    </StyledBadge>
                    <div style={{ display: "flex", flexDirection: "column" }}>
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
                          marginLeft: "0.8em",
                        }}
                        variant="h6"
                      >
                        {val.body}
                      </Typography>
                    </div>
                  </div>
                );
              })}
            </Grid>
          </Grid>
          <div ref={messageView}></div>
          <AutoScroll />
        </div>
      </div>

      <input
        placeholder="Message #Channel-name"
        className={classes.input}
        ref={inputValue}
        onChange={handleInputValues}
        onKeyDown={handleKeyDown}
        onClick={() => setShowPicker(false)}
        value={messageInput}
        type="text"
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
      <Button type="submit" onClick={sendMessage} className={classes.button}>
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

export default Channel;
