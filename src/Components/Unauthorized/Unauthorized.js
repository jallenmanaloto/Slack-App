import React from "react";
import { useHistory } from "react-router";
import Broken from '../../assets/images/Broken.png';
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#272929',
        background: '#DCDCDE'
    },
    body: {
        width: '50%'
    },
    link: {
        position: 'absolute',
        bottom: '5.4em',
        right: '8.7em',
        color: '#608296',
        cursor: 'pointer'
    }
})

const Unauthorized = () => {
    const classes = useStyles();
    const history = useHistory();

  return <div className={classes.root}>
      <img src={Broken} alt="unauthorized" />
      <Typography className={classes.body} variant='h2'>It seems that you cannot access this page. You need to go back to </Typography>
      <Typography onClick={() => history.push("/")} className={classes.link} variant='h2'>Login</Typography>
      </div>;
};

export default Unauthorized;
