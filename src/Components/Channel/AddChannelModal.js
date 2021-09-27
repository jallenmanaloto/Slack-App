import React, { useState } from 'react'
import { makestyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { BorderStyle } from '@material-ui/icons';
import axios from 'axios';

const AddChannelModal = ({setModalOpen, closeModal}) => {

    const [modalClose, setModalClose] = useState(true);

    //function to handle closing of Add Channel modal
    const handleClose = () => {
        setModalClose (!modalClose);
        closeModal(false)
    }

    //Function to post request in creating new Channel
    const createChannel = () => {
        const createChannelURL = '206.189.91.54/api/v1/channels'
        axios.post(createChannelURL).then(res => console.log(res)).catch(err => console.log(err))
    }
    

    const body = (
        <div style={{height: '300px', width: '500px'}}>
            <h2> TItle </h2>
            <button onClick={handleClose}>click me</button>
        </div>
    )

    return (
        <div>
            <Modal
            open={setModalOpen}
            onClose={handleClose}
            >
                {body}
            </Modal>
        </div>
    )
}

export default AddChannelModal
