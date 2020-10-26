import React, { Fragment } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { matenUpdate } from '../../redux/actions/matenActions';
import Modal from '../modal.js/modal';
import './issues-fix.scss';

const IssuesFix = (props) => {
    const dispatch = useDispatch();
    return (
        <Modal show={props.show} modalClose={props.modalClose}>
            <div className="issues-fix">
                <AiOutlineCloseCircle className="close-icon" onClick={props.modalClose} size="1.5em"/>
                <div className="header" name="issue-header">View/Fix Issues</div>
                <hr />
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>WORKDAY</th>
                            <th colSpan={2}>ALIGHT</th>
                            <th rowSpan={2}>ACTIONS</th>
                        </tr>
                        <tr>
                            <th>Header</th>
                            <th>Value</th>
                            <th>Header</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.employee?.[props.employee.length - 1].map((discrepancy, index) => {
                                return (
                                    <tr key={index}>
                                        {
                                            Object.keys(discrepancy).map((header,idx) => {
                                                return (
                                                    <Fragment key={idx}>
                                                        <td>{header}</td>
                                                        <td>{discrepancy[header]}</td>
                                                    </Fragment>
                                                )
                                            })
                                        }
                                        <td>
                                            <button
                                                className="export-button"
                                                name="issue-fix-workday"
                                                onClick={() => dispatch(matenUpdate("workday", props.employee_id, props.employee, index, props.columns))}
                                            >
                                                workday
                                            </button>
                                            <button
                                                className="export-button"
                                                name="issue-fix-alight"
                                                onClick={() => dispatch(matenUpdate("alight", props.employee_id, props.employee, index, props.columns))}
                                            >
                                                alight
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Modal>
    )
};

export default IssuesFix;