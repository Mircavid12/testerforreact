import { HttpClient } from "../httpClient";

class AttendenceService extends HttpClient{
    constructor(){
        super("https://607ebb8202a23c0017e8bf04.mockapi.io/a/1/")
    }
    getAttendence(){
        return this.get('attendence');
    }
    getStudentAttendenceById(id,dates){
        return dates.map(({date,list})=>{
            const studentAttendence = list.find((attendence)=>attendence.studentId === id)
            return ({
                date,
                attended:studentAttendence ? studentAttendence.attended :false
            })
        });
    }

    addAttendence(data){
        return this.post(
            'https://httpbin.org/post',
            data
        )
    }
    updateAttendence(data){
        return this.post(
            'https://httpbin.org/post',
            data
        )
    }
}

export const attendenceService = new AttendenceService();