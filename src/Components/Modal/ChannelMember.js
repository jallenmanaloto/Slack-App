import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Modal,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { AvatarGroup, Alert } from "@material-ui/lab";
import { ContextAPI } from "../Context/ContextAPi";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    right: "5rem",
    top: "0.6rem",
    cursor: "pointer",
    minWidth: "7em",
    minHeight: "2.9em",
    background: "lightgray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "32.5px",
  },
  addPeople: {
    height: "30vh",
    width: "50vh",
    background: "#ECF0F1",
    borderRadius: "9px",
  },
  aboutChannel: {
    margin: "2rem 2rem",
    padding: "1rem 0",
    borderRadius: "12px",
    border: "1px solid #C2C1C1",
    lineHeight: "1.5rem",
  },
  aboutChannelID: {
    marginLeft: "2.4rem",
    fontWeight: "400",
    fontSize: "0.95rem",
    color: "#727070",
  },
  aboutDescriptions: {
    padding: "1rem 0",
    borderTop: "1px solid #C2C1C1",
  },
  aboutHeader: {
    marginLeft: "2rem",
    color: "#3F3F3F",
    fontSize: "1.1rem",
    fontWeight: "600",
  },
  addMembers: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    height: "3.7rem",
  },
  aboutSubHeader: {
    marginLeft: "2rem",
    fontWeight: "lighter",
    fontSize: "0.9rem",
  },
  addUserIcon: {
    height: "2.2rem",
    width: "2.2rem",
    marginLeft: "2.4rem",
    color: "#727070",
  },
  channelName: {
    color: "#3F3F3F",
    paddingLeft: "1.8em",
  },
  container: {
    paddingTop: "2em",
  },
  dialog: {
    marginBottom: "3em",
  },
  dialogChannelName: {
    position: "absolute",
    paddingLeft: "1.8em",
    paddingTop: "3.3em",
    fontWeight: "400",
    fontSize: "0.95rem",
    color: "#9B9A9A",
  },
  dialogInput: {
    width: "100%",
    height: "2.8em",
    marginTop: "1.4rem",
    paddingLeft: "1rem",
    outline: "none",
    border: "1px solid #C6C2C2",
    borderRadius: "5px",
    fontSize: "1.1rem",
  },
  dialogTitle: {
    color: "#3F3F3F",
  },
  members: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    height: "3.7rem",
  },
  memberContainer: {
    overflowY: "scroll",
    height: "47vh",
  },
  memberImg: {
    height: "1.7em",
    width: "1.7em",
    backgroundColor: "lightcoral",
    marginLeft: "2.4rem",
  },
  memberListContainer: {
    paddingTop: "5em",
  },
  memberName: {
    marginLeft: "1rem",
  },
  memberSearch: {
    position: "absolute",
    top: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: "85%",
    marginTop: "1.2rem",
    height: "2.4rem",
    border: "1px solid #C6C2C2",
    borderRadius: "4px",
    background: "#ECF0F1",
    paddingLeft: "3em",
    outline: "none",
    fontSize: "0.95rem",
    color: "#3F3F3F",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    height: "80vh",
    width: "60vh",
    background: "#ECF0F1",
    borderRadius: "9px",
  },
  searchIcon: {
    position: "absolute",
    marginTop: "1.7rem",
    marginLeft: "3.5rem",
    height: "1.3rem",
    width: "1.3rem",
    color: "#9B9A9A",
    zIndex: "2",
  },
  tabBar: {
    marginTop: "2rem",
    borderBottom: "1px solid #CECDCD",
    height: "3em",
  },
  user: {
    height: "1.7em",
    width: "1.7em",
    backgroundColor: "lightcoral",
  },
});

const ChannelMember = () => {
  const classes = useStyles();

  //declaring states
  const [modalDisplay, setModalDisplay] = useState(false);
  const [dialogDisplay, setDialogDisplay] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogInput, setDialogInput] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [filterMember, setFilterMember] = useState([]);

  //declaring reference for the input to search member
  const searchMember = useRef();
  const dialogInputVal = useRef();

  const handleClose = () => {
    setModalDisplay(!modalDisplay);
  };

  const handleDialogDisplay = () => {
    setDialogDisplay(!dialogDisplay);
  };

  const handleDialogInputValue = () => {
    setDialogInput(dialogInputVal.current.value);
  };

  const handleErrorDisplay = () => {
    setErrorDisplay(true);
    setTimeout(() => {
      setErrorDisplay(false);
    }, 3500);
  };

  //declaring functions to handle events
  const handleSearchMemberInput = (e) => {
    setSearchTerm(searchMember.current.value);
    console.log(searchTerm);
  };

  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  //declaring Contexts for API data
  const {
    allUsers,
    setAllUsers,
    apiData,
    setApiData,
    apiHeaders,
    setApiHeaders,
    authKey,
    setAuthKey,
    tokenValue,
    setTokenValue,
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
  } = useContext(ContextAPI);

  useEffect(() => {
    const channelMemberList = channelMembers.map((member) => member.user_id);
    const filteredMembers = allUsers.filter((users) =>
      channelMemberList.includes(users.id)
    );
    setTimeout(() => {
      setFilterMember([...filteredMembers]);
    }, 300);
  }, [channelMembers]);

  //function to handle invite of user to the channel
  const inviteUser = () => {
    axios({
      url: "https://slackapi.avionschoo/api/v1/channel/add_member",
      method: "POST",
      headers: {
        "access-token": authKey.accessToken,
        client: authKey.accessClient,
        expiry: authKey.accessExpiry,
        uid: authKey.accessUID,
      },
      data: {
        id: channelData.id,
        member_id: 123, //value from the input
      },
    })
      .then((res) => {
        //handling errors received
        if (res.data.errors) {
          setErrorMessage(res.data.errors);
          handleErrorDisplay();
        }
        setChannelMembers(res.data.data.channel_members);
      })
      .catch((err) => console.log(err));
  };

  //declaring variable for the date the channel was created
  const channelCreateDate = new Date(channelData.created_at).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );

  const members = (
    <div onClick={handleClose} className={classes.root}>
      <AvatarGroup max={3}>
        {channelMembers.map((val) => {
          return (
            <Avatar
              className={classes.user}
              alt={val.uid}
              src="/static/images/avatar/1.jpg"
            />
          );
        })}
      </AvatarGroup>
    </div>
  );

  const memberTab = (
    <div style={{ position: "relative" }}>
      <SearchIcon className={classes.searchIcon} />
      <input
        onChange={handleSearchMemberInput}
        value={searchTerm}
        ref={searchMember}
        className={classes.memberSearch}
        type="text"
        placeholder="Find members"
      />
      <div
        onClick={handleDialogDisplay}
        className={classes.memberListContainer}
      >
        <div className={`${classes.addMembers} addPeople`}>
          <PersonAddIcon className={classes.addUserIcon} />
          <h4 className={classes.memberName}>Add people</h4>
        </div>
        <div className={classes.memberContainer}>
          {filterMember
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (JSON.stringify(val).includes(searchTerm)) {
                return val;
              }
              return false;
            })
            .map((val, key) => {
              const user = val.uid; /* .split("@")[0]; */
              return (
                <div key={key} className={`${classes.members} addPeople`}>
                  <Avatar
                    className={classes.memberImg}
                    alt={user}
                    src={val.user_id}
                  />
                  <h4 className={classes.memberName}>{user}</h4>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );

  const aboutTab = (
    <div className={classes.aboutTab}>
      <div className={classes.aboutChannel}>
        <h4 className={classes.aboutHeader}>Channel Name</h4>
        <h5 className={classes.aboutSubHeader}>{`# ${channelData.name}`}</h5>
      </div>
      <div className={classes.aboutChannel}>
        <div style={{ paddingBottom: "1rem" }}>
          <h4 className={classes.aboutHeader}>Topic</h4>
          <h5 className={classes.aboutSubHeader} style={{ color: "#959595" }}>
            Add a topic
          </h5>
        </div>
        <div className={classes.aboutDescriptions}>
          <h4 className={classes.aboutHeader}>Description</h4>
          <h5 className={classes.aboutSubHeader}>
            This <strong>channel</strong> is for working on a project. Hold
            meetings, share docs, and make decisions together with your team.
          </h5>
        </div>
        <div className={classes.aboutDescriptions}>
          <h4 className={classes.aboutHeader}>Created by</h4>
          <h5
            className={classes.aboutSubHeader}
          >{`Owner id: ${channelData.owner_id} on ${channelCreateDate}`}</h5>
        </div>
      </div>
      <h5 className={classes.aboutChannelID}>Channel ID: {channelData.id}</h5>
    </div>
  );

  const memberListModal = (
    <div className={classes.modalBody}>
      <div className={classes.container}>
        <Typography className={classes.channelName} variant="h5">
          {`# ${channelData.name}`}
        </Typography>
        <div className={classes.tabBar}>
          <Tabs
            style={{ marginLeft: "2.85em" }}
            indicatorColor="primary"
            textColor="primary"
            value={tabIndex}
            onChange={handleTabChange}
          >
            <Tab label="Members" />
            <Tab label="About" />
          </Tabs>
        </div>
        <TabPanel value={tabIndex} index={0}>
          {memberTab}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          {aboutTab}
        </TabPanel>
      </div>
    </div>
  );

  return (
    <div>
      {members}
      <Modal
        className={classes.modal}
        open={modalDisplay}
        onClose={handleClose}
      >
        {memberListModal}
      </Modal>
      <Dialog
        maxWidth="sm"
        className={classes.dialog}
        open={dialogDisplay}
        onClose={handleDialogDisplay}
      >
        <DialogTitle className={classes.dialogTitle}>Add People</DialogTitle>
        <h5 className={classes.dialogChannelName}>{`# ${channelData.name}`}</h5>
        <DialogContent>
          <input
            onChange={handleDialogInputValue}
            value={dialogInput}
            ref={dialogInputVal}
            className={classes.dialogInput}
            type="text"
            placeholder="Enter a user id"
          ></input>
          {errorDisplay ? (
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open="true"
            >
              <Alert
                className={classes.errors}
                severity="error"
                variant="filled"
              >
                {errorMessage}
              </Alert>
            </Snackbar>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={inviteUser} color="primary">
            Invite
          </Button>
          <Button onClick={handleDialogDisplay} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChannelMember;

function TabPanel(props) {
  const { children, value, index } = props;

  return <div>{value === index && <div>{children}</div>}</div>;
}
