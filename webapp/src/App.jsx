import './App.css'
import {Route,Routes,BrowserRouter} from 'react-router-dom';
import EmployeeList from './components/EmployeeList';

function App() {

  return (
    <BrowserRouter>
    
       <Routes>
        <Route path="/" element={<EmployeeList/>} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
