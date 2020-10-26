import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import BackDrop from '../back-drop/back-drop';
import FieldMap from '../field-map/field-map';
import "./merge-match-modal.scss";

const MergeMatchModal = (props) => {
    const modalClassName = props.show ? "display-block" : "display-none";
    return (
        <div className={modalClassName}>
            <BackDrop modalClose={props.modalClose}/>
            <div className="merge-confirm">
                <AiOutlineCloseCircle className="close-icon" onClick={props.modalClose} size="1.5em"/>
                <div className="header">
                    {props.title?.toUpperCase()}
                </div>
                <hr />
                <FieldMap modal={true} modalSubmit={props.modalSubmit}/>
            </div>
        </div>
    )
};

export default MergeMatchModal;