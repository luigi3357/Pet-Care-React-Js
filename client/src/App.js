import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { Login } from './Components/LoginAndRegister/LoginModal';
import { Register } from './Components/LoginAndRegister/Register';
import { RatingDemo } from './Components/Review';
import { DetailsPage } from './Pages/DetailsPage';
// import InputSearchB from '../src/Components/FormPost/'
import Payment from "./Pages/Payment";




function App() {
  return (
    <Router>
      <Routes>


        <Route path="/" element={<algo/>}/>   
        <Route path="/payment" element={<Payment/>}/>     
        <Route path="/Register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/rating" element={<RatingDemo/>}/>
        <Route path="/DetailsPage" element={<DetailsPage/>}/>
        {/* <Route path="/formpublic" element={<Form/>}/>         */}


      </Routes>
    </Router>    
  );
}

export default App;
