import { ASYNC_STATUS } from "../../../redux/const";
import { ATTENDENCE_ACTIONS } from "../actions/consts";
const initialState = {
    error: null,
    data: [],
    status: ASYNC_STATUS.IDLE
}
export function attendenceReducer(state = initialState, action) {

    switch (action.type) {
        case ATTENDENCE_ACTIONS.GET_ATTENDENCE:
            return {
                ...state,
                status: ASYNC_STATUS.LOADING,
                data: [],
                error: null
            }
        case `${ATTENDENCE_ACTIONS.GET_ATTENDENCE}_SUCCESS`:
            return {
                ...state,
                status: ASYNC_STATUS.SUCCESS,
                data: action.payload,
                error: null,
            }
        case `${ATTENDENCE_ACTIONS.GET_ATTENDENCE}_ERROR`:
            return {
                ...state,
                status: ASYNC_STATUS.ERROR,
                error: action.error,
                data: []
            }
        case `${ATTENDENCE_ACTIONS.ADD_ATTENDENCE}`:
            return {
                ...state,
                status: ASYNC_STATUS.LOADING,
                error: null,
            }
        case `${ATTENDENCE_ACTIONS.ADD_ATTENDENCE}_SUCCESS`:
            return {
                ...state,
                status: ASYNC_STATUS.SUCCESS,
                error: null,
                data: [
                    ...state.data,
                    action.payload
                ]
            }
        case `${ATTENDENCE_ACTIONS.ADD_ATTENDENCE}_ERROR`:
            return {
                ...state,
                status: ASYNC_STATUS.ERROR,
                error: action.error,
            }
        case `${ATTENDENCE_ACTIONS.UPDATE_ATTENDENCE}`:
            return {
                ...state,
                status: ASYNC_STATUS.LOADING,
                error: null,
            }
        case `${ATTENDENCE_ACTIONS.UPDATE_ATTENDENCE}_SUCCESS`:
            return {
                ...state,
                status: ASYNC_STATUS.SUCCESS,
                error: null,
                data: state.data.map(attendence=>{
                    if (attendence.date === action.payload.date) {
                        return {
                            ...action.payload
                        }
                        
                    }
                    return attendence;
                })
            }
        case `${ATTENDENCE_ACTIONS.UPDATE_ATTENDENCE}_ERROR`:
            return {
                ...state,
                status: ASYNC_STATUS.ERROR,
                error: action.error,
            }
        default:
            break;
    }
    return state;

}