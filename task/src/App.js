import './App.css';
import * as React from 'react'
import { getstudents } from './modules/students/actions';
import { useDispatch } from 'react-redux';
import { getAttendence } from './modules/attendence/actions';
import { AttendencePage } from './modules/attendence/components';

function App() {
  const dispatch = useDispatch();
  React.useEffect(()=>{
    getstudents(dispatch)
    getAttendence(dispatch)
  },[dispatch])
  // console.log(getstudents);
  return <AttendencePage/>;
}

export default App;
