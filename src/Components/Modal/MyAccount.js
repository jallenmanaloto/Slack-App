import React, { useContext, useState } from "react";
import { ContextAPI } from "../Context/ContextAPi";
import { Chip, makeStyles, Modal, Typography } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "max-content",
    width: "23vw",
    background: "#ECF0F1",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    padding: "2rem",
    outline: "none",
  },
  accountIcon: {
    height: "5.5em",
    width: "5.5em",
    color: "#1A335A",
    position: "absolute",
    right: "1.2em",
    top: "3rem",
  },
  body: {
    paddingTop: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  chip: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    padding: "1rem 0",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  header: {
    fontWeight: "bolder",
    color: "#787878",
  },
}));

const MyAccount = ({ profileModalOpen, setProfileModalOpen }) => {
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
    tokenValue,
    setTokenValue,
    userName,
    setUserName,
  } = useContext(ContextAPI);

  const classes = useStyles();

  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleMyAccount = () => {
    setProfileModalOpen(channelData);
  };

  const body = (
    <div className={classes.root}>
      <AccountCircleIcon className={classes.accountIcon} />
      <div className={classes.body}>
        <Typography className={classes.header} variant="body1">
          Display Name
        </Typography>
        <Typography variant="body1">{userName}</Typography>
      </div>
      <div className={classes.body}>
        <Typography className={classes.header} variant="body1">
          Local Time
        </Typography>
        <Typography variant="body1">{time}</Typography>
      </div>
      <div className={classes.body}>
        <Typography className={classes.header} variant="body1">
          Email Address
        </Typography>
        <Typography variant="body1">{authKey.accessUID}</Typography>
      </div>
      <div className={classes.body}>
        <Typography className={classes.header} variant="body1">
          Channels
        </Typography>
      </div>
      <div className={classes.chip}>
        {allChannels.map((val, key) => {
          return <Chip size="small" label={val.name} />;
        })}
      </div>
    </div>
  );

  return (
    <div>
      <Modal open={profileModalOpen} onClose={handleMyAccount}>
        {body}
      </Modal>
    </div>
  );
};

export default MyAccount;
