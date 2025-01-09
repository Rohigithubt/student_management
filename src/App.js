
import { useState } from 'react';
import './App.css';
import AllStudents from './components/AllStudents';
import Createstudent from './components/Createstudent';
import Feedback from './components/Feedback';
import Headers from './components/Headers';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import {BrowserRouter as Router,Route,  Routes} from 'react-router'

function App() {
   const [loginSuccess, setLoginSuccess] = useState(true)
  return (
    <div>
      <Router>
      {loginSuccess && <Headers/>}
      <div className='row'>
         <div className='col-4'>
            {loginSuccess && <Sidebar/>}    
         </div>
         <div className='col-8'>
         <div className="flex-grow-1 p-3">
           <Routes>
            <Route path="/create-student" exact element={loginSuccess && <Createstudent/>} />
            <Route path="/all-students" exact element={loginSuccess && <AllStudents/>} />
            <Route path="/dashboard" exact element={ loginSuccess && <h2>Welcome to the Dashboard</h2>}/>
            <Route path="/feedback" exact element={loginSuccess && <Feedback/>}/>
            <Route path="/" exact element={<Login setLoginSuccess = {setLoginSuccess}/>}/>
             
            
            </Routes>
        </div>
         </div>
      </div>
     
    
        </Router>
    </div>
  
  );
}

export default App;
