import { Table, Dialog, DialogContent, DialogTitle, TableRow, TableBody, TableCell, TableHead, Checkbox, Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import { addAttendence, updateAttendence } from '../actions'



export function StudentAttendenceForm({ open, onClose ,date}) {
  const dispatch = useDispatch();
  const students = useSelector(state => state.students)
  const attendence = useSelector(state => state.attendence)
  const [selectedDate, setSelectedDate] = useState()
  const [attendenceStatuses, setAttendenceStatuses] = useState([])


  const handleDateChange = React.useCallback((date) => {
    setSelectedDate(date);
  }, []);

  useEffect(() => {
    if(date){
      const matchedDate = attendence.data.find(attendenceStatus=> attendenceStatus.date ===date);
      setAttendenceStatuses(matchedDate.list)
    }else{
      setAttendenceStatuses(students.data.map(student => ({
        studentId: student.id,
        attended: false
      })))
    }
    
  }, [students.data,date,attendence.data])

  const handleSave = React.useCallback(() => {
   if(date){
    const updatePayload = {
      date: date,
      list: attendenceStatuses
    }
    const dispatchUpdateAttendence = updateAttendence(dispatch);
    dispatchUpdateAttendence(updatePayload)
   }else{
    const addPayload = {
      date: moment(selectedDate, "MM.dd.yy").format("DD.MM.yy"),
      list: attendenceStatuses
    }
    const dispatchAddAttendence = addAttendence(dispatch);
    dispatchAddAttendence(addPayload)
   }
    onClose();
  }, [selectedDate, attendenceStatuses,onClose,dispatch,date])

  const handleAttendenceStatusChange = React.useCallback((studentID, isChecked) => {
    setAttendenceStatuses(attendenceStatuses.map(status => {
      if (status.studentId === studentID) {
        return {
          ...status,
          attended: isChecked
        }
      }
      return status;
    }))
  }, [attendenceStatuses])
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Student Attendence Form
           </DialogTitle>
      <DialogContent>
        { date ? `${date}` :
        (<MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Select date"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>)
        }
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Student
              </TableCell>
              <TableCell>
                Attendence status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.data.map((student,idx) => (
              <TableRow key={student.id}>
                <TableCell>{student.name} {student.surname}</TableCell>
                <TableCell><Checkbox checked={attendenceStatuses[idx]?.attended ||false} onChange={evt => handleAttendenceStatusChange(student.id, evt.target.checked)} /></TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>
        <Button color="primary" variant="contained" onClick={handleSave}>SAVE</Button>
      </DialogContent>
    </Dialog>
  )
}
