const { MATEN_MERGE_START, MATEN_MERGE_FAILURE, MATEN_MERGE_SUCCESS } = require("../constants/matenConstants")
const { INITIAL_STATE } = require("./matenReducer")
const { default: matenReducer } = require("./matenReducer")

describe("check maten merge start reducer", () => {
    it("should set loading true when merge starts", () => {
        expect(matenReducer(INITIAL_STATE, { type: MATEN_MERGE_START})).toEqual({
            data: null,
            loading: true,
            error: null
        })
    });
});

describe("check maten merge failure reducer", () => {
    it("should set error when merge fails", () => {
        expect(matenReducer(INITIAL_STATE, { type: MATEN_MERGE_FAILURE, payload: "error"})).toEqual({
            data: null,
            loading: false,
            error: "error"
        })
    });
});

describe("check maten merge success reducer", () => {
    it("should set data when merge succeeds", () => {
        expect(matenReducer(INITIAL_STATE, { type: MATEN_MERGE_SUCCESS, payload: {}})).toEqual({
            data: {},
            loading: false,
            error: null
        })
    });
});