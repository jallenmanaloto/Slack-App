import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ContextAPI } from "../Context/ContextAPi";

const useStyles = makeStyles({
  root: {
    height: "50vh",
    width: "43vw",
    background: "red",
    position: "absolute",
    top: "6%",
    left: "37.2%",
    zIndex: "10",
  },
});

const UserSearch = () => {
  const classes = useStyles();

  const {
    apiData,
    setApiData,
    apiHeaders,
    setApiHeaders,
    channelData,
    setChannelData,
    channelMembers,
    setChannelMembers,
    channelMessage,
    setchannelMessage,
    tokenValue,
    setTokenValue,
    userName,
    setUserName,
  } = useContext(ContextAPI);

  return <div className={classes.root}>HELLOOOOOOOOOOOOOOOO</div>;
};

export default UserSearch;
