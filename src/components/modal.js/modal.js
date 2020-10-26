import React from 'react';
import BackDrop from '../back-drop/back-drop';
import "./modal.scss";

const Modal = (props) => {
    const modalClassName = props.show ? "display-block" : "display-none";
    return (
        <div className={modalClassName}>
            <BackDrop modalClose={props.modalClose}/>
            {props.children}
        </div>
    )
};

export default Modal;