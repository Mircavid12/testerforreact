import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'
import moment from 'moment'
import { attendenceService } from '../service';


export function StudentsAttenceTable({
    dates,
    students,
    onDateEdit
}) {
    return (
        <Box marginTop={2}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Student</strong></TableCell>
                            {
                                dates.map(({ date }) => <TableCell style={{cursor:"pointer"}} onClick={()=>onDateEdit(date)} key={date}>{moment(date, "DD.MM.yy").format("DD.MM.yy")}</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            students.map((student) => {
                                const attendenceMap = attendenceService.getStudentAttendenceById(student.id, dates);

                                return(<TableRow key={student.id}>
                                    <TableCell><strong>{`${student.name} ${student.surname}`}</strong></TableCell>
                                {
                                    attendenceMap.map(({attended,date})=><TableCell key={date}>{attended ? "Yes" : "No"}</TableCell>)
                                }
                                </TableRow>)
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default StudentsAttenceTable
