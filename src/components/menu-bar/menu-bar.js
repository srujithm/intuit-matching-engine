import React from 'react';
import { useHistory } from 'react-router-dom';
import './menu-bar.scss';

const MenuBar = () => {
    const history = useHistory();
    return (
        <div className="menu-bar">
            <span
                style={{fontWeight: 600, fontStyle: "oblique", fontFamily: "sans-serif"}}
                onClick={() => history.push("/")}
                className="menu-item"
            >
                MATEN
            </span>
            <span
                className="menu-item"
                onClick={() => history.push("/results")}
            >
                RESULTS
            </span>
            <span onClick={() => history.push("/map-fields")} className="menu-item">
                FIELD SETTINGS
            </span>
        </div>
    )
};

export default MenuBar;