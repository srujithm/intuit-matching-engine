import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { matenMerge } from '../../redux/actions/matenActions';
import MergeMatchModal from '../merge-match-modal/merge-match-modal';
import './merge-area.scss';

const MergeArea = (props) => {
    const [show, setShow] = useState(false);
    const data = useSelector(state => state.maten.data);
    const fileData = useSelector(state => state.files.data);
    const fieldMap = useSelector(state => state.fieldMap.data);
    const dispatch = useDispatch();
    const history = useHistory();
    const startMerge = () => {
        dispatch(matenMerge(fieldMap, fileData["upload-1"], fileData["upload-2"]));
        history.push("/results");
    };
    const handleClose = () => setShow(false);
    return (
        <div className="merge-area">
            <button
                className="merge-button"
                name="merge-button"
                onClick={() => setShow(true)}
                disabled={fileData["upload-1"] && fileData["upload-2"] && Object.keys(fileData["upload-1"])[0] !== Object.keys(fileData["upload-2"])[0] ? false : true}
            >
                MATCH & GENERATE
            </button>
            <MergeMatchModal show={show} title="CONFIRM FIELD MAP" modalClose={handleClose} modalSubmit={startMerge}/>
        </div>
    )
};

export default MergeArea;