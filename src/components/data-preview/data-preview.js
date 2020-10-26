import React, { useEffect, useState } from 'react';
import './data-preview.scss';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import BackDrop from '../back-drop/back-drop';
import Pagination from '../pagination/pagination';

const DataPreview = (props) => {
    const modalClassName = props.show ? "display-block" : "display-none";
    const [searchTerm, setSearchTerm] = useState("");
    const [searchHeader, setSearchHeader] = useState("");
    const fileData = useSelector(state => state.files);
    const data = fileData.data[props.id];
    const title = Object.keys(data || {})?.[0];
    const tableData = data?.[title];
    const headers = tableData?.headers;
    const [page, setPage] = useState(1);

    const tot_length = Object.keys(tableData?.employees || {})
        .filter(entry => tableData.employees?.[entry]?.[headers?.indexOf(searchHeader)]?.toLowerCase()?.includes(searchTerm))
        .length;
    const pages = Math.ceil(tot_length / 10);
    

    useEffect(() => {
        if (headers) {
            setSearchHeader(headers[0]);
        }
    }, [headers]);
    return (
        <div className={modalClassName} >
            <BackDrop modalClose={props.modalClose} />
            <div className="data-preview">
                <AiOutlineCloseCircle className="close-icon" onClick={props.modalClose} size="1.5em"/>
                <div className="header">
                    {title?.toUpperCase()}
                    <div>
                        <select
                            name="headers"
                            id="headers"
                            value={searchHeader}
                            onChange={(e) => setSearchHeader(e.target.value)}
                            className="header-dropdown"
                        >
                            {
                                headers?.map(header => <option value={header} key={header}>{header}</option>)
                            }
                        </select>
                        <input type="text" placeholder="Search.." className="search-area" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
                    </div>
                </div>
                <hr />
                <table style={{width: "100%"}}>
                    <thead>
                        <tr>
                            {
                                headers?.map((header,index) => <th key={index}>{header.split("_").join(" ")}</th>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {
                                Object.keys(tableData?.employees || {})
                                    .filter(entry => tableData.employees?.[entry]?.[headers?.indexOf(searchHeader)]?.toLowerCase()?.includes(searchTerm))
                                    .slice((page-1)*10, page *10).map((entry, index) => {
                                    return (
                                        <tr key={index}>
                                            {
                                                tableData.employees?.[entry].map((item, ind) => <td key={ind}>{item}</td>)
                                            }
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
                {
                    tot_length > 10 && (
                        <Pagination page={page} pages={pages} updatePage={setPage} />
                    )
                }
            </div>
        </div>
    )
};

export default DataPreview;