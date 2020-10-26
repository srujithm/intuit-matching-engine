import React from 'react';
import { ImSpinner9 } from 'react-icons/im';
import BackDrop from '../back-drop/back-drop';
import './loading.scss';

const Loading = () => {
    return (
        <div className="loader">
            <BackDrop />
            <ImSpinner9 size="2rem" className="icon-spin" />
        </div>
    )
};

export default Loading;