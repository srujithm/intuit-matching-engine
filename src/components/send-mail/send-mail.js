import React, { useState } from 'react';
import Modal from '../modal.js/modal';
import './send-mail.scss';
import { AiOutlineCloseCircle, AiOutlineWarning } from 'react-icons/ai';
import { API_URL } from '../../config';

const SendMail = (props) => {
    const [recepients, setRecepients] = useState([]);
    const [error, setError] = useState(null);
    const updateRecepients = (rcpnts) => {
        setRecepients(rcpnts.split(","));
    }
    const sendMail = () => {
        setError(null);
        let finalVal = "";
        let exportColumns = props.columns.slice(0, props.columns.length - 2);
        let toBeExported = [];
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
        fetch(API_URL + "/sendmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recepients: recepients,
                attachments: [{
                    filename: "workday_vs_alight.csv",
                    content: finalVal,
                    contentType: 'text/csv'
                }]
            })
        })
        .then(() => props.modalClose())
        .catch(() => setError("Unable to send mail"));
    }
    return (
        <Modal show={props.show} modalClose={props.modalClose}>
            <div className="send-mail">
                <AiOutlineCloseCircle className="close-icon" onClick={props.modalClose} size="1.5em"/>
                <div className="header">Send Email</div>
                <hr />
                <input
                    className="email-recepients"
                    type="text"
                    name="email-recepients"
                    id="email-recepients"
                    value={recepients.join(",")}
                    onChange={(e) => updateRecepients(e.target.value)}
                    placeholder="Please enter email recepients"
                />
                {
                    error && (
                        <div className="email-error">
                            <AiOutlineWarning size="1.2rem" color="red"/> {error}
                        </div>
                    )
                }
                <button
                    className="email-button"
                    disabled={recepients.length > 0 ? false : true}
                    onClick={sendMail}
                    name="send-email"
                >
                    CONFIRM
                </button>
            </div>
        </Modal>
    )
};

export default SendMail;