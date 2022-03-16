import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payment from "./Pages/Payment"
import { Register } from './Components/LoginAndRegister/Register';
import { Login } from './Components/LoginAndRegister/LoginModal';


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<algo/>}/>   */} 
        <Route path="/payment" element={<Payment/>}/>     
        <Route path="/Register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>

      </Routes>
    </Router>    
  );
}

export default App;
