import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading/loading';
import Pagination from '../../components/pagination/pagination';
import "./results-page.scss";
import { AiOutlineWarning } from 'react-icons/ai';
import ExportOptions from '../../components/export-options/export-options';
import IssuesFix from '../../components/issues-fix/issues-fix';
import SendMail from '../../components/send-mail/send-mail';

const ResultsPage = () => {
    const maten = useSelector(state => state.maten);
    const [page, setPage] = useState(1);
    const [modalShow, setModalShow] = useState("");
    const [employee, setEmployee] = useState(null);
    const [ employeeId, setEmployeeId] = useState(null);
    const [searchHeader, setSearchHeader] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const tot_length = Object.keys(maten.data?.employees || {})
        .filter(entry => maten.data?.employees?.[entry]?.[maten.data?.headers?.indexOf(searchHeader)]?.toLowerCase()?.includes(searchTerm))
        .length;
    const pages = Math.ceil(tot_length / 10);
    const handleClose = () => {
        setModalShow("")
        setEmployee(null);
        setEmployeeId(null);
    };
    const showIssues = (emp) => {
        setModalShow("issues_fix");
        setEmployeeId(emp)
        setEmployee(maten.data.employees[emp])
    }
    useEffect(() => {
        if (maten.data?.headers) {
            setSearchHeader(maten.data?.headers[0]);
        }
    }, [maten.data?.headers]);
    useEffect(() => {
        let emp = maten.data?.employees?.[employeeId];
        if ( emp) {
            let discrepancies = emp[emp.length - 1];
            if (discrepancies.length === 0) {
                handleClose();
            }
        }
    }, [maten.data])
    if ( maten.loading ) {
        return <Loading />
    }
    return (
        <div className="results">
            <ExportOptions
                show={modalShow === "export_options" ? true : false}
                modalClose={handleClose}
                columns={maten.data?.headers}
                employees={maten.data?.employees}
            />
            <IssuesFix
                show={modalShow === "issues_fix" ? true : false}
                modalClose={handleClose}
                columns={maten.data?.headers}
                employee={employee}
                employee_id={employeeId}
            />
            <SendMail
                show={modalShow === "send_email" ? true : false}
                modalClose={handleClose}
                columns={maten.data?.headers}
                employees={maten.data?.employees}
            />
            {
                maten.data?.employees && (
                    <div className="search">
                        <select
                            name="headers"
                            id="headers"
                            value={searchHeader}
                            onChange={(e) => setSearchHeader(e.target.value)}
                            className="header-dropdown"
                        >
                            {
                                maten.data?.headers?.map((header, index) => index !== maten.data.headers.length - 1 && <option value={header} key={header}>{header}</option>)
                            }
                        </select>
                        <input type="text" placeholder="Search.." className="search-area" onChange={(e) => setSearchTerm(e.target.value.toLowerCase())} />
                    </div>
               )
            }
            <div className="export-button-group">
                <button
                    className="export-button"
                    disabled={tot_length > 0 ? false : true}
                    onClick={() => setModalShow("export_options")}
                    name="export-button"
                >
                    EXPORT
                </button>
                <button
                    className="export-button"
                    disabled={tot_length > 0 ? false : true}
                    onClick={() => setModalShow("send_email")}
                    name="email-button"
                >
                    EMAIL REPORT
                </button>
            </div>
            {
                Object.keys(maten.data?.employees || {}).length === 0 && (
                    <div className="go-home">
                        <a href="/">Go Home.</a> Upload files and generate data
                    </div>
                )
            }
            <table>
                <thead>
                    <tr>
                        {
                            maten.data?.headers?.map((item, index) => {
                                return (
                                    <th key={index}>{item.split("_").join(" ")}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(maten.data?.employees || {})
                            .filter(entry => maten.data?.employees?.[entry]?.[maten.data?.headers?.indexOf(searchHeader)]?.toLowerCase()?.includes(searchTerm))
                            .slice((page-1)*10, page *10).map(emp => {
                            return (
                                <tr key={emp}>
                                    {
                                        maten.data.employees[emp].map((val,idx) => {
                                            if (idx === maten.data.employees[emp].length -1 && val.length > 0) {
                                                return (
                                                    <td key={idx} name="issue-button">
                                                        <button className="issue-button" onClick={() => showIssues(emp)}>
                                                            <AiOutlineWarning size="1.2rem" color="red"/> {val.length} issue(s)
                                                        </button>
                                                    </td>
                                                )
                                            }
                                            return (
                                                <td key={idx}>{val}</td>
                                            )
                                    })
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
    )
};

export default ResultsPage;