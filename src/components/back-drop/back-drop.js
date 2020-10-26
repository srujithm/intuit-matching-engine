import React from 'react';
import './back-drop.scss';

const BackDrop = (props) => {
    return (
        <div className="back-drop" onClick={props.modalClose} />
    )
};

export default BackDrop;