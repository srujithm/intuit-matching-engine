import React from 'react';
import './page-not-found.scss';
import { CgDanger } from 'react-icons/cg';

const PageNotFound = () => {
    return (
        <div className="not-found">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <CgDanger size="2.5rem" />
                <span style={{"fontSize": "2.5rem"}}>
                    Uh-Oh! Now What?
                </span>
            </div>
            <span style={{"display": "block"}}>Lets get you back to <a href="/">home</a> page</span>
        </div>
    )
};

export default PageNotFound;