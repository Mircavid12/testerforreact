import { HttpClient } from "../httpClient";

class StudentService extends HttpClient{
    constructor(){
        super("https://607ebb8202a23c0017e8bf04.mockapi.io/a/1/")
    }
    getstudents(){
        return this.get('students');
    }
    getStudentById(id,students){
         return students.find((student)=>student.id === id)
    }
}

export const studentsService = new StudentService();