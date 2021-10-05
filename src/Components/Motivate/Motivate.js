import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const Motivate = ({ openMotivate, setOpenMotivate }) => {
  const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    author: {
        color: 'gray',
        paddingTop: '2rem'
    },
    bodyRoot: {
        height: '27vh',
        width: '35vw',
        background: 'whitesmoke',
        borderRadius: '7px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 1rem'
    },
    copy: {
        paddingTop: '3rem'
    }
  });

  const classes = useStyles();
  const [quote, setQuote] = useState({});

  const quotes =[
        {
            body: "Don't watch the clock; do what it does. Keep going.",
            author: "Sam Levenson"
        },
        {
            body: "The first step toward success is taken when you refuse to be a captive of the environment in which you first find yourself.",
            author: "Mark Caine"
        }
    ]   

    useEffect(() => {
        const random = quotes[Math.floor(Math.random()*quotes.length)]
        setQuote(random)
    }, [openMotivate])
    

  const handleMotivationClose = () => {
    setOpenMotivate(false)
  }

  const body = (
    <div className={classes.bodyRoot}>
        <h3 className={classes.copy}>{quote.body}</h3>
        <h5 className={classes.author}>{quote.author}</h5>
    </div>
  )

  return (
    <div>
      <Modal
        className={classes.root}
        open={openMotivate}
        onClose={handleMotivationClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 400 }}
      >
          <Fade in={openMotivate}>
            <div>
                {body}
            </div>
          </Fade>
      </Modal>
    </div>
  );
};

export default Motivate;
