import React, { useState } from 'react';
import DataPreview from '../../components/data-preview/data-preview';
import FileUpload from '../../components/file-upload/file-upload';
import MergeArea from '../../components/merge-area/merge-area';

const HomePage = () => {
    const [ modalDisplay, setModalDisplay] = useState(null);
    const modalShow = (id) => {
        setModalDisplay(id)
    };
    const modalClose = () => {
        setModalDisplay(null);
    }
    return (
        <>
            <div style={{"display": "flex"}}>
                <FileUpload id="upload-1" modalShow={modalShow} modalClose={modalClose} />
                <FileUpload id="upload-2" modalShow={modalShow} modalClose={modalClose} />
            </div>
            <DataPreview show={modalDisplay} modalClose={modalClose} id={modalDisplay}/>
            <MergeArea />
        </>
    )
};

export default HomePage;