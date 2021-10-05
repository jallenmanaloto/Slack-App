import React, { useState, useEffect, useContext, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import AddChannelModal from "../Channel/AddChannelModal";
import HomeChannel from "../Channel/HomeChannel";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Collapse from "@material-ui/core/Collapse";
import InputBase from "@material-ui/core/InputBase";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import InboxIcon from "@material-ui/icons/Inbox";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import Logo from "../../assets/images/Logo.svg";
import Avatar from "@material-ui/core/Avatar";
import Channel from "../Channel/Channel";
import { ContextAPI } from "../Context/ContextAPi";
import UserSearch from "../UserSearch/UserSearch";

const drawerWidth = 325;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
    display: "flex",
    height: "100%",
    borderRight: "1px solid rgba(220, 229, 242, 0.15)",
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100%) - ${drawerWidth}px`,
      paddingLeft: drawerWidth,
    },
    background:
      "linear-gradient(to right bottom, rgba(26, 51, 90, 1), rgba(40, 69, 114, 1))",
    display: "flex",
    justifyContent: "space-around",
  },
  drawerPaper: {
    width: drawerWidth,
    background:
      "linear-gradient(to bottom, rgba(26, 51, 90, 1), rgba(40, 69, 114, 1))",
    overflowX: "hidden",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  menuBarText: {
    color: "white",
    fontSize: "1.8rem",
  },
  menuBarTitle: {
    color: "#F9F3F3",
    fontWeight: "600",
    marginTop: "3em",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "2rem",
  },
  createIcon: {
    color: "#324A5F",
  },
  menuIconColor: {
    color: "white",
    marginLeft: "1em",
    marginRight: "-1.4em",
  },
  input: {
    backgroundColor: "#051D43",
    paddingLeft: "1.1rem",
    borderRadius: "5px",
    width: "100%",
    color: "#3A66AA",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  accountIcon: {
    height: "2rem",
    width: "2rem",
    marginRight: "1rem",
    backgroundColor: "lightcoral",
  },
  subMessages: {
    marginLeft: "2.5em",
    marginTop: 0,
    textDecoration: "none",
    color: "white",
  },
  workspace: {
    borderRight: "1px solid rgba(220, 229, 242, 0.15)",
    paddingTop: "7.5em",
    width: "24%",
    display: "flex",
    justifyContent: "center",
  },
  workspaceItem: {
    height: "3em",
    width: "3em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "7px",
    backgroundColor: "#051D43",
    cursor: "pointer",
    marginTop: "6em",
  },
  mainContent: {
    marginTop: "10.5em",
    height: "70%",
    width: "100%",
    overflowY: "auto",
  },
  searchIcon: {
    marginRight: "0",
    color: "#3A66AA",
  },
  logoContainer: {
    position: "absolute",
    background: "inherit",
    width: "100%",
    height: "15%",
    zIndex: "10",
  },
  logo: {
    height: "8.5em",
    width: "10.5em",
    position: "absolute",
    marginLeft: "5.7em",
    marginTop: "2.2em",
  },
  addChannel: {
    display: "flex",
    alignItems: "center",
    marginLeft: "1.5em",
    fontSize: "0.9rem",
    height: "1em",
  },
  userDM: {
    fontSize: "0.95rem",
    fontWeight: "lighter",
    marginLeft: "0.2rem",
    marginTop: "-1.3rem",
  },
  channelList: {
    fontSize: "0.95rem",
    marginLeft: "-5.85rem",
    fontWeight: "lighter",
  },
  addIcon: {
    height: "1.2em",
    width: "1.2em",
    color: "#3A66AA",
  },
  mySpace: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "2em",
    textDecoration: "none",
    color: "white",
  },
  myAccount: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "3em",
    alignItems: "center",
    cursor: "pointer",
  },
}));

const Main = () => {
  const classes = useStyles();
  const history = useHistory();
  const {
    allUsers,
    setAllUsers,
    apiData,
    setApiData,
    apiHeaders,
    setApiHeaders,
    auth,
    setAuth,
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

  //Container to store all fetched channels
  const [allChannels, setAllChannels] = useState([]);

  //Setting states
  const [mobileOpen, setMobileOpen] = useState(false);
  const [channelExpand, setChannelExpand] = useState(false);
  const [dmExpand, setDmExpand] = useState(false);
  const [searchBar, setSearchBar] = useState("");
  const [searchResult, setSearchResult] = useState(false);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://206.189.91.54/api/v1/channels",
      headers: {
        "access-token": tokenValue,
        client: apiHeaders.client,
        expiry: apiHeaders.expiry,
        uid: apiData.data?.data?.uid,
      },
    })
      .then((res) => {
        setAllChannels([...res.data.data]);
      })
      .catch((err) => {
        return;
      });
  }, [channelExpand]);

  useEffect(() => {
    const sessionKey = JSON.parse(localStorage.getItem("userKey"));
  }, []);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://206.189.91.54/api/v1/users",
      headers: {
        "access-token": tokenValue,
        client: apiHeaders.client,
        expiry: apiHeaders.expiry,
        uid: apiData.data?.data?.uid, //user id
      },
    })
      .then((res) => {
        setAllUsers(res.data.data);
      })
      .catch((err) => {
        return;
      });
  });

  //state for the modal open
  const [modalOpen, setModalOpen] = useState(false);

  //Function to handle expansion of Channel
  const handleChannelExpandToggle = () => {
    setChannelExpand(!channelExpand);
  };
  //Function to handle expansion of Direct Messages
  const handleDmExpandToggle = () => {
    setDmExpand(!dmExpand);
  };

  //Function to handle toggle of side menu bar on mobile screensize
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  //Function to handle values in searchbar
  const handleSearchBarValue = (e) => {
    setSearchBar(e.target.value);
    if (!searchBar) {
      setSearchResult(true);
      console.log("open search result");
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    localStorage.removeItem("userKey");
    history.push("/");
  };

  const userDM = (
    <div className={classes.subMessages}>
      <Typography className={classes.userDM} variant="subtitle1">
        Sample User
      </Typography>
    </div>
  );

  const channelList = (
    <div className={classes.subMessages}>
      <Typography className={classes.channelList} variant="subtitle1">
        # My Space
      </Typography>
    </div>
  );

  // Defining the structure for the drawer menu
  const drawer = (
    <div className={classes.drawer}>
      <div className={classes.workspace}>
        <div className={classes.workspaceItem}>
          <AddIcon className={classes.addIcon} />
        </div>
      </div>
      <div className={classes.logoContainer}>
        <img className={classes.logo} src={Logo} alt="logo" />
      </div>
      <Router>
        <div className={`${classes.mainContent} sideBarScroll`}>
          <List style={{ color: "white", marginTop: "2em" }}>
            <ListItem button style={{}}>
              <ListItemIcon className={classes.menuIconColor}>
                <QuestionAnswerIcon />
              </ListItemIcon>
              <ListItemText primary="Threads" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.menuIconColor}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="All DMs" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.menuIconColor}>
                <AlternateEmailIcon />
              </ListItemIcon>
              <ListItemText primary="Mentions" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.menuIconColor}>
                <MoreHorizIcon />
              </ListItemIcon>
              <ListItemText primary="More" />
            </ListItem>
            <ListItem onClick={handleChannelExpandToggle} button>
              <ListItemIcon className={classes.menuIconColor}>
                {channelExpand ? <ExpandMore /> : <ChevronRightIcon />}
              </ListItemIcon>
              <ListItemText primary="Channels" />
            </ListItem>
            <Collapse in={channelExpand} timeout="auto" unmountOnExit>
              <List style={{ marginTop: "-0.8em" }}>
                <Link
                  style={{ textDecoration: "none" }}
                  to="/dashboard/my-space"
                >
                  <ListItem className={classes.mySpace} button>
                    {channelList}
                  </ListItem>
                </Link>
                {allChannels.map((val, key) => {
                  const getChannelData = (e) => {
                    setChannelData(val);

                    //Retrieving information of a Channel
                    axios({
                      method: "GET",
                      url: `http://206.189.91.54/api/v1/channels/${val.id}`,
                      headers: {
                        "access-token": tokenValue,
                        client: apiHeaders.client,
                        expiry: apiHeaders.expiry,
                        uid: apiData.data?.data?.uid,
                      },
                    })
                      .then((res) => {
                        setChannelMembers(res.data.data.channel_members);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  };

                  return (
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/dashboard/channel/${val.id}`}
                    >
                      <ListItem
                        key={key}
                        onClick={getChannelData}
                        className={classes.subMessages}
                        button
                      >
                        {`# ${val.name}`}
                      </ListItem>
                    </Link>
                  );
                })}
                <ListItem button onClick={() => setModalOpen(!modalOpen)}>
                  <Typography className={classes.addChannel}>
                    <AddIcon />
                    Add Channel
                  </Typography>
                </ListItem>
              </List>
            </Collapse>
            <ListItem onClick={handleDmExpandToggle} button>
              <ListItemIcon className={classes.menuIconColor}>
                {dmExpand ? <ExpandMore /> : <ChevronRightIcon />}
              </ListItemIcon>
              <ListItemText primary="Direct Messages" />
            </ListItem>
            <Collapse in={dmExpand} timeout="auto" unmountOnExit>
              <List>
                <ListItem button>{userDM}</ListItem>
              </List>
            </Collapse>
          </List>
        </div>
        <Switch>
          <Route path="/dashboard/channel" component={Channel} />
        </Switch>
      </Router>
    </div>
  );

  return (
    <div>
      {!auth ? (
        console.log("not authorized")
      ) : (
        <Grid container spacing={3}>
          <AppBar className={classes.appBar} elevation={0}>
            <Toolbar className={classes.toolbar}>
              <Grid item xs={2}>
                <IconButton
                  className={classes.menuButton}
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon style={{ color: "#ECF0F1" }} />
                </IconButton>
              </Grid>
              <Grid item xs={7}>
                <div>
                  <InputBase
                    className={classes.input}
                    placeholder="Search"
                    value={searchBar}
                    onChange={handleSearchBarValue}
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchIcon className={classes.searchIcon} />
                      </InputAdornment>
                    }
                  />
                  {searchBar ? (
                    <UserSearch
                      searchResult={searchResult}
                      searchBar={searchBar}
                    />
                  ) : null}
                </div>
              </Grid>
              <Grid
                className={classes.myAccount}
                onClick={handleMenuClick}
                item
                xs={2}
              >
                <Avatar
                  className={classes.accountIcon}
                  alt={userName}
                  src="/broken-image.jpg"
                />
                <Typography variant="body1">{userName}</Typography>
              </Grid>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                style={{ marginTop: "2em", marginLeft: "6em" }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem>My Profile</MenuItem>
                <MenuItem onClick={logOut}>Log out</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
        </Grid>
      )}
      <div>
        <Hidden smUp implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="temporary"
            anchor="left"
            ModalProps={{
              keepMounted: true,
            }}
            open={mobileOpen}
            onClose={handleDrawerToggle}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </div>
      {modalOpen ? (
        <AddChannelModal setModalOpen={modalOpen} closeModal={setModalOpen} />
      ) : null}
      <HomeChannel />
    </div>
  );
};

export default Main;
