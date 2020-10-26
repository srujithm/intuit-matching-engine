import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fieldMapUpdate } from '../../redux/actions/fieldMapActions';
import './field-map.scss';

const FieldMap = (props) => {
    const fieldMap = useSelector(state => state.fieldMap.data);
    const dispatch = useDispatch();
    return (
        <div className="field-map">
            <div className="header">
                <span>WORKDAY</span>
                <span style={{marginLeft: "1rem", marginRight: "1rem"}}>vs</span>
                <span>ALIGHT</span>
            </div>
            {
                fieldMap?.["workday"].map((item,ind) => (
                    <div className="input-group" key={ind} id={ind}>
                        <input
                            type="text"
                            value={item}
                            className="input-element"
                            onChange={(e) => dispatch(fieldMapUpdate("workday", fieldMap, ind, e.target.value))}
                        />
                        <input
                            type="text"
                            value={fieldMap.alight[ind]}
                            className="input-element"
                            onChange={(e) => dispatch(fieldMapUpdate("alight", fieldMap, ind, e.target.value))}
                        />
                    </div>
                ))
            }
            {
                props.modal && (
                    <button onClick={() => props.modalSubmit()} className="button" name="field-map-confirm">CONFIRM</button>
                )
            }
        </div>
    )
};

export default FieldMap;