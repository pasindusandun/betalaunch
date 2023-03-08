import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import EmployeeList from './components/EmployeeList';

function App() {

  return (
    <EmployeeList/>
    // <BrowserRouter>
    //    <Routes>
    //     <Route path="/" component={EmployeeList} />
    //    </Routes>
    // </BrowserRouter>
  )
}

export default App
