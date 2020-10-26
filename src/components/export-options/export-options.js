import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Loading from '../loading/loading';
import Modal from '../modal.js/modal';
import './export-options.scss';

const ExportOptions = (props) => {
    const [exportColumns, setExportColumns] = useState([]);
    const [fileFormat, setFileFormat] = useState("csv");
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const handleColumnClick = (column) => {
        if ( exportColumns.includes(column)) {
            let newColumns = exportColumns.filter(item => item !== column)
            setExportColumns(newColumns)
        } else {
            setExportColumns([...exportColumns, column]);
        }
    }
    const exportToCsv = () => {
        setLoading(true);
        let toBeExported = [];
        let finalVal = '';
        for (let i of exportColumns) {
            toBeExported.push(props.columns.indexOf(i));
        }
        finalVal += exportColumns.join(",") + "\n";
        for ( let i in props.employees) {
            let employee = props.employees[i];
            let employeeData = [];
            for ( let j of toBeExported) {
                employeeData.push(employee[j]);
            }
            finalVal += employeeData.join(",") + "\n";
        }
        var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(finalVal);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'workday_vs_alight.csv';
        hiddenElement.click();
        setLoading(false);
        props.modalClose();
    }
    if (loading) {
        return <Loading />
    }
    return (
        <Modal show={props.show} modalClose={props.modalClose}>
            <div className="export-options">
                <AiOutlineCloseCircle className="close-icon" onClick={props.modalClose} size="1.5em"/>
                <div className="header">Export Options</div>
                <hr />
                <div>
                    <span style={{display: "block", fontWeight: 600, fontSize: "1.2rem", marginBottom: "1.2rem"}}>Select Colums</span>
                    {
                        props.columns?.map(column => {
                            if (column.toLowerCase() !== "discrepancies") {
                                return (
                                    <div className="export-checkbox" key={column}>
                                        <input
                                            type="checkbox"
                                            id={column}
                                            name={column}
                                            value={column}
                                            onChange={() => handleColumnClick(column)}
                                            checked={exportColumns.includes(column) ? true : false}
                                        />
                                        <label htmlFor={column}>{column}</label>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
                <div>
                    <span style={{display: "block", fontWeight: 600, fontSize: "1.2rem", marginBottom: "1.2rem", marginTop: "1.2rem"}}>Select File Format</span>
                    <div className="export-checkbox" >
                        <input type="radio" id="csv" name="csv" value="csv" checked={fileFormat === "csv" ? true : false} onChange={() => setFileFormat("csv")}/>
                        <label htmlFor="csv">csv</label>
                    </div>
                    {/*<div className="export-checkbox">
                        <input type="radio" id="xlsx" name="xlsx" value="xlsx" checked={fileFormat === "xlsx" ? true : false} onChange={() => setFileFormat("xlsx")}/>
                        <label htmlFor="xlsx">xlsx</label>
                    </div>*/}
                </div>
                <button
                    className="export-button"
                    disabled={exportColumns.length === 0 ? true : false}
                    onClick={() => exportToCsv()}
                    name="start-export"
                >
                    START EXPORT
                </button>
            </div>
        </Modal>
    )
};

export default ExportOptions;