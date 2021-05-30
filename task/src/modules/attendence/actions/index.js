import { attendenceService } from "../service";
import { ATTENDENCE_ACTIONS } from "./consts";

export function getAttendence(dispatch) {
    dispatch({ type: ATTENDENCE_ACTIONS.GET_ATTENDENCE });
    attendenceService.getAttendence().then(({ data }) => {

        dispatch({
            type: `${ATTENDENCE_ACTIONS.GET_ATTENDENCE}_SUCCESS`,
            payload: data,
        })
    }).catch(err => dispatch({
        type: `${ATTENDENCE_ACTIONS.GET_ATTENDENCE}_ERROR`,
        error: err,
    }))
    return {
        type: ATTENDENCE_ACTIONS.GET_ATTENDENCE,
    }
}

export function addAttendence(dispatch) {

    return function (data) {

        dispatch({ type: ATTENDENCE_ACTIONS.ADD_ATTENDENCE });

        attendenceService.addAttendence(data)
            .then(resp => {
                console.log(resp);
                dispatch({
                    type: `${ATTENDENCE_ACTIONS.ADD_ATTENDENCE}_SUCCESS`,
                    payload: data,
                })
            })
            .catch(err => dispatch({
                type: `${ATTENDENCE_ACTIONS.ADD_ATTENDENCE}_ERROR`,
                error: err,
            }))
    }
}

export function updateAttendence(dispatch) {

    return function (data) {

        dispatch({ type: ATTENDENCE_ACTIONS.UPDATE_ATTENDENCE });

        attendenceService.updateAttendence(data)
            .then(resp => {
                console.log(resp);
                dispatch({
                    type: `${ATTENDENCE_ACTIONS.UPDATE_ATTENDENCE}_SUCCESS`,
                    payload: data,
                })
            })
            .catch(err => dispatch({
                type: `${ATTENDENCE_ACTIONS.UPDATE_ATTENDENCE}_ERROR`,
                error: err,
            }))
    }
}