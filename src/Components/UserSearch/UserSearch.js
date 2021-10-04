import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ContextAPI } from "../Context/ContextAPi";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("md")]: {
      width: "53vw",
    },
    maxHeight: "20vh",
    width: "43vw",
    background: '#ECF0F1',
    position: "absolute",
    zIndex: "10",
    width: "56.6%",
    borderBottomLeftRadius: "12px",
    borderBottomRightRadius: "12px",
    border: '1px solid rgba(120, 120, 120, 0.7)',
    overflowY: 'scroll'
  },
  searchResults: {
    marginLeft: '3em',
    marginTop: '1em',
    color: '#2B2118'
  },
}));

const UserSearch = ({ searchBar, searchResult }) => {
  const classes = useStyles();

  const {
    allUsers,
    setAllUsers,
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

  const userSearch = [...JSON.stringify(allUsers)]

  return <div className={classes.root}>
    {allUsers
    .filter((val) => {
      if (searchBar === '') {
        return val;
      } else if (JSON.stringify(val.uid).includes(searchBar)) {
        return val;
      }
      return false;
    })
    .map((val) => [
      <div className={classes.searchResults}>
        {val.uid}
      </div>
    ])}
    </div>;
};

export default UserSearch;
