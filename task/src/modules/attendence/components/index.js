import React ,{useState} from 'react'
import { useSelector } from 'react-redux'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core'
import { ASYNC_STATUS } from "../../../redux/const";
import StudentsAttenceTable from './StudentsAttenceTable';
import { StudentAttendenceForm } from './StudentAttendenceForm';
export function AttendencePage() {
    const studentsBranch = useSelector((state) => state.students);
    const attendenceBranch = useSelector((state) => state.attendence);
    const [showDateDialog, setshowDateDialog] = useState(false)
    const [editDate, setEditDate] = useState(null)

    const handleNewDateCreation = date =>{
        setshowDateDialog(true);
        setEditDate(null);
    }
    const handleDataEdit = date =>{
        setEditDate(date)
        setshowDateDialog(true);
    }
    return (
        <Box width="1024px" margin="0 auto" paddingTop={4}>
            <Typography variant="h4">
                Student Attendence
            </Typography>
            {
                (studentsBranch.status === ASYNC_STATUS.LOADING || attendenceBranch.status === ASYNC_STATUS.LOADING)
                    ? (
                        <Box height="20vh" display="flex" justifyContent="center" alignItems="center">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                        <Box display="flex" justifyContent="flex-end">
                        <Button onClick={handleNewDateCreation} color="primary" variant="contained">Add new date</Button>
                        </Box>
                       
                        <StudentsAttenceTable onDateEdit={handleDataEdit} dates={attendenceBranch.data} students={studentsBranch.data} />
                        <StudentAttendenceForm date={editDate} open={showDateDialog} onClose={()=>setshowDateDialog(false)}/>
                        </>
                    )
            }

        </Box>
    )
}
