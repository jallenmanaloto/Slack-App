import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import { ContextAPI } from "../Context/ContextAPi";
import {
  FormControl,
  InputLabel,
  makeStyles,
  Modal,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FaceIcon from "@material-ui/icons/Face";
import sendMsg from "../UserMessage/Message";

const useStyles = makeStyles({
  root: {
    background: "#ECF0F1",
    position: "absolute",
    top: "35%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    height: "35vh",
    width: "18vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    background: "none",
    padding: "0.8rem 0.2rem",
    outline: "none",
    border: "1px solid rgba(43, 41, 40, 0.5)",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "32%",
    cursor: "pointer",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    paddingTop: "2rem",
  },
  container: {
    paddingTop: "2em",
  },
  faceIcon: {
    height: "4em",
    width: "4em",
    color: "rgba(43, 41, 40, 0.5)",
    marginTop: "2rem",
  },
  header: {
    fontWeight: "bolder",
    color: "#787878",
    fontSize: "1.1rem",
  },
  info: {
    paddingLeft: "1rem",
  },
  inviteButton: {
    marginTop: "1.4rem",
    padding: "0.5rem 0",
    cursor: "pointer",
  },
  inviteToChannel: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "#ECF0F1",
    height: "22vh",
    width: "15vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "5px",
  },
  selectOptions: {
    height: "2em",
    overflowY: "scroll",
  },
  options: {
    width: "80%",
  },
  userInfo: {
    display: "flex",
    color: "#2B2118",
  },
});

const AllUserSearch = ({ openUserModal, setOpenUserModal }) => {
  const classes = useStyles();

  const {
    allChannels,
    allUsersInfo,
    authKey,
    setMessageDisplay,
    setUserMessages,
    setReceiverUN,
  } = useContext(ContextAPI);

  const userInfoName = allUsersInfo.uid.split("@")[0];
  const [inviteToChannel, setInviteToChannel] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channeluid, setChanneluid] = useState();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState();

  // invite user to the channel
  const inviteUser = () => {
    axios({
      url: "https://slackapi.avionschool.com/api/v1/channel/add_member",
      method: "POST",
      headers: {
        "access-token": authKey.accessToken,
        client: authKey.accessClient,
        expiry: authKey.accessExpiry,
        uid: authKey.accessUID,
      },
      data: {
        id: channeluid,
        member_id: allUsersInfo.id,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          setError(!error);
          setErrorMsg(res.data?.errors[0]);
        } else {
          setSuccess(!success);
        }
      })
      .catch((err) => console.log(err.response));
    handleInviteToChannel();
  };

  //handle close of error message
  const handleErrorClose = (event, reason) => {
    if (reason == "clickaway") {
      return;
    }
    setError(false);
    setErrorMsg([]);
  };

  //handle close of success message
  const handleSuccessClose = (event, reason) => {
    if (reason == "clickaway") {
      return;
    }
    setSuccess(false);
  };

  //close the modal
  const handleUserModal = () => {
    setOpenUserModal(false);
  };

  //close invite to channel modal
  const handleInviteToChannel = () => {
    setInviteToChannel(false);
  };

  const handleChannelChange = (event) => {
    setChannelName(event.target.value);
  };

  //function to route to message
  const sendMessageToUser = () => {
    axios({
      method: "GET",
      url: `https://slackapi.avionschool.com/api/v1/messages?receiver_id=${allUsersInfo.id}&receiver_class=User`,
      headers: {
        "access-token": authKey.accessToken,
        client: authKey.accessClient,
        expiry: authKey.accessExpiry,
        uid: authKey.accessUID,
      },
      params: {
        receiver_id: allUsersInfo.id,
        receiver_class: "User",
      },
    })
      .then((res) => {
        setUserMessages(res.data?.data);
        setMessageDisplay(true);
        setReceiverUN(userInfoName);
      })
      .catch((err) => console.log(err.response));
  };

  console.log(allUsersInfo.id);
  console.log(authKey.accessUID);
  console.log(authKey.accessToken);
  console.log(authKey.accessClient);
  console.log(authKey.accessExpiry);
  console.log(channeluid);

  const userModal = (
    <div className={classes.root}>
      <FaceIcon className={classes.faceIcon} />
      <div className={classes.container}>
        <div className={classes.userInfo}>
          <Typography className={classes.header}>ID</Typography>
          <Typography className={classes.info}>{allUsersInfo.id}</Typography>
        </div>
        <div className={classes.userInfo}>
          <Typography className={classes.header}>Name</Typography>
          <Typography className={classes.info}>{userInfoName}</Typography>
        </div>
        <div className={classes.userInfo}>
          <Typography className={classes.header}>Email</Typography>
          <Typography className={classes.info}>{allUsersInfo.email}</Typography>
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <button
          onClick={() => setInviteToChannel(true)}
          className={classes.button}
        >
          Invite to Channel
        </button>
        <button onClick={sendMessageToUser} className={classes.button}>
          Message
        </button>
      </div>
    </div>
  );

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 180,
        width: 250,
      },
    },
  };

  const inviteToChannelModal = (
    <div className={classes.inviteToChannel}>
      <Typography variant="h5">Choose a channel</Typography>
      <FormControl className={classes.options}>
        <InputLabel shrink>Channel list</InputLabel>
        <Select
          MenuProps={MenuProps}
          value={channelName}
          onChange={handleChannelChange}
        >
          {allChannels.map((val, key) => {
            return (
              <MenuItem
                onClick={() => setChanneluid(val.id)}
                value={val.id}
                key={key}
              >
                {val.name}
              </MenuItem>
            );
          })}
        </Select>
        <button onClick={inviteUser} className={classes.inviteButton}>
          Invite
        </button>
      </FormControl>
    </div>
  );

  return (
    <div>
      <Modal open={openUserModal} onClose={handleUserModal}>
        {userModal}
      </Modal>
      <Modal open={inviteToChannel} onClose={handleInviteToChannel}>
        {inviteToChannelModal}
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={error}
        autoHideDuration={4000}
        onClose={handleErrorClose}
      >
        <Alert severity="error" variant="filled">
          {errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={success}
        autoHideDuration={4000}
        onClose={handleSuccessClose}
      >
        <Alert severity="success" variant="filled">
          User successfully added!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AllUserSearch;
