import { ASYNC_STATUS } from "../../../redux/const";
import { STUDENT_ACTIONS } from "../actions/consts";

const initialState = {
    error:null,
     data:[],
     status: ASYNC_STATUS.IDLE
 }
export function studentReducer(state=initialState,action){
    switch (action.type) {
        case STUDENT_ACTIONS.GET_STUDENTS:
           return {
               ...state,
               status:ASYNC_STATUS.LOADING,
               data:[],
               error:null
           }
        case `${STUDENT_ACTIONS.GET_STUDENTS}_SUCCESS`:
            return {
                ...state,
                status:ASYNC_STATUS.SUCCESS,
                data:action.payload,
                error:null,
            }
        case `${STUDENT_ACTIONS.GET_STUDENTS}_ERROR`:
            return {
                ...state,
                status:ASYNC_STATUS.ERROR,
               error:action.error,
               data:[]
            }
    
        default:
            break;
    }
    return state;
}