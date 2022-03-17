import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import InputSearchB from '../src/Components/FormPost/'

import Payment from "./Pages/Payment"
import { Register } from './Components/LoginAndRegister/Register';
import { Login } from './Components/LoginAndRegister/LoginModal';
import { RatingDemo }from './Components/Review'
import { DetailsPage } from './Pages/DetailsPage'; 
import { ForgotPassword } from './Components/LoginAndRegister/ForgotPassword';
import { MailCode } from './Components/LoginAndRegister/mailCode';



function App() {
  return (
    <Router>
      <Routes>

      
        <Route path="/mailcode" element={<MailCode/>}/>           
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>   
        <Route path="/payment" element={<Payment/>}/>     
        <Route path="/Register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/rating" element={<RatingDemo/>}/>
        <Route path="/DetailsPage" element={<DetailsPage/>}/>
        {/*<Route path="/formpublic" element={<Form/>}/>*/}


      </Routes>
    </Router>    
  );
}

export default App;
