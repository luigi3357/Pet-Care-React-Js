import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payment from "./Pages/Payment"


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<algo/>}/>   */} 
        <Route path="/payment" element={<Payment/>}/>     
      </Routes>
    </Router>    
  );
}

export default App;
