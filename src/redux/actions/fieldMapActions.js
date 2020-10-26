const { FIELD_MAP_UPDATE_START, FIELD_MAP_UPDATE_SUCCESS, FIELD_MAP_UPDATE_FAILURE } = require("../constants/fieldMapConstants")

const fieldMapUpdateStart = () => {
    return {
        type: FIELD_MAP_UPDATE_START
    }
};

const fieldMapUpdateSuccess = (data) => {
    return {
        type: FIELD_MAP_UPDATE_SUCCESS,
        payload: data
    }
};

const fieldMapUpdateFailure = (error) => {
    return {
        type: FIELD_MAP_UPDATE_FAILURE,
        payload: error
    }
};

export const fieldMapUpdate = (type, prevState, index, newVal) => dispatch => {
    dispatch(fieldMapUpdateStart());
    let updatedState = {...prevState};
    try {
        updatedState[type][index] = newVal;
        dispatch(fieldMapUpdateSuccess(updatedState));
    } catch (e) {
        dispatch(fieldMapUpdateFailure(e));
    }
}