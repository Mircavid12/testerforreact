import { studentsService } from "../service";
import { STUDENT_ACTIONS } from "./consts";

export function getstudents(dispatch){
    dispatch({type:STUDENT_ACTIONS.GET_STUDENTS});
    studentsService.getstudents().then(({data})=>{
        dispatch({
            type:`${STUDENT_ACTIONS.GET_STUDENTS}_SUCCESS`,
            payload:data,
        })
    }).catch(err=>dispatch({
        type:`${STUDENT_ACTIONS.GET_STUDENTS}_ERROR`,
            error:err,
    }))
    return{
        type:STUDENT_ACTIONS.GET_STUDENT,
    }
    // console.log(dispatch);
}