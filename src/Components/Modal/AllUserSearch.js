import React, { useContext, useState } from "react"
import { ContextAPI } from "../Context/ContextAPi";
import { makeStyles, Modal, Typography } from "@material-ui/core"
import FaceIcon from '@material-ui/icons/Face';

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    button: {
        background: 'none',
        padding: '0.8rem 0.2rem',
        outline: 'none',
        border: '1px solid rgba(43, 41, 40, 0.5)',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '32%',
        cursor: 'pointer'
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        paddingTop: '2rem'
    },
    container: {
        paddingTop: '2em'
    },
    faceIcon: {
        height: '4em',
        width: '4em',
        color: 'rgba(43, 41, 40, 0.5)',
        marginTop: '2rem'
    },
    header: {
        fontWeight: "bolder",
        color: "#787878",
        fontSize: '1.1rem'
    },
    info: {
        paddingLeft: '1rem'
    },
    userInfo: {
        display: "flex",
        color: '#2B2118'
    },
})

const AllUserSearch = ({ openUserModal, setOpenUserModal }) => {
    const classes = useStyles();

    const {
        allUsersInfo
      } = useContext(ContextAPI);

    const userInfoName = allUsersInfo.uid.split('@')[0]

    //close the modal
    const handleUserModal = () => {
        setOpenUserModal(false);
    }

    const userModal = (
        <div className={classes.root}>
            <FaceIcon className={classes.faceIcon}/>
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
                <button className={classes.button}>Invite to Channel</button>
                <button className={classes.button}>Message</button>
            </div>
           
        </div>
    )
    return (
        <div>
            <Modal open={openUserModal} onClose={handleUserModal}>
                {userModal}
            </Modal>
        </div>
    )
}

export default AllUserSearch
