import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import InputSearchB from '../src/Components/FormPost/InputSearchB'

import Payment from "./Pages/Payment"
import { Register } from './Components/LoginAndRegister/Register';
import { Login } from './Components/LoginAndRegister/LoginModal';
import { RatingDemo }from './Components/Review'
import { DetailsPage } from './Pages/DetailsPage'; 



function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<InputSearchB/>}/>        

        {/* <Route path="/" element={<algo/>}/>   
        <Route path="/payment" element={<Payment/>}/>     
        <Route path="/Register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/rating" element={<RatingDemo/>}/>
        <Route path="/DetailsPage" element={<DetailsPage/>}/> */}


      </Routes>
    </Router>    
  );
}

export default App;
