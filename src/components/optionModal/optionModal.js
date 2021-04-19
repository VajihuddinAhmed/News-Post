import React from 'react';
import Modal from 'react-modal';
import './optionModal.scss';

const OptionModal = (props) => {
    return (
        <Modal 
            isOpen={props.modalState} 
            contentLabel="deletepost" 
            ariaHideApp={false} 
            onRequestClose={props.handleCloseModal}
            closeTimeoutMS={200}
            className="modal"
        >
            <h2 className="modal--title">Are you sure you want to delete this post ?</h2>
            <button className="modal--button" onClick={props.deletedPost}>Yes</button>
            <button className="modal--button" onClick={props.handleCloseModal}>No</button>
        </Modal>
    )
}

export default OptionModal;