import React, { useState } from 'react';
import './file-upload.scss';
import { FaFileUpload } from 'react-icons/fa';
import { fileUpload } from '../../redux/actions/fileActions';
import { useDispatch } from 'react-redux';

const FileUpload = (props) => {
    const [drag, setDrag] = useState(false);
    const [sectionName, setSectionName] = useState(null);
    const dispatch = useDispatch();
    const onFileSelected = (files) => {
        let file = files[0];
        let name = file.name.split(".csv")[0].toLowerCase();
        setSectionName(name);
        dispatch(fileUpload(props.id, file));
    }
    const fileDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(true);
    };
    const fileDragExit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
    };
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    const fileDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDrag(false);
        if ( e.dataTransfer?.files && e.dataTransfer.files?.length > 0) {
            onFileSelected(e.dataTransfer.files);
        }
    };

    const removeFile = () => {
        document.getElementById("file-upload").value = ""
        setSectionName(null);
    }
    return (
        <div
            className={`file-upload ${drag ? "dragged" : ''}`}
            onDragEnter={fileDragEnter}
            onDragLeave={fileDragExit}
            onDragOver={handleDrag}
            onDrop={fileDrop}
            name={props.id}
        >
            <div className="upload-header">
                {
                    sectionName ? sectionName.toUpperCase() : <><FaFileUpload size="1.5em" /> Upload your file here</>
                }
            </div>
            <div className="file-selector">
                <label htmlFor="file-upload">Upload file</label>
                <input
                    type="file"
                    id="file-upload"
                    accept=".csv"
                    onChange={(e) => onFileSelected(e.target.files)}
                />
            </div>
            <div className="button-group">
                <button
                    className="upload-button"
                    disabled={!sectionName}
                    onClick={removeFile}
                >
                    REMOVE
                </button>
                <button
                    className="upload-button"
                    onClick={() => props.modalShow(props.id)}
                    disabled={sectionName ? false: true}
                >
                    PREVIEW
                </button>
            </div>
        </div>
    )
};

export default FileUpload;