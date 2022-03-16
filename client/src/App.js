import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from './Components/LoginAndRegister/Register';
import { Login } from './Components/LoginAndRegister/LoginModal';
import { RatingDemo }from './Components/Review'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/rating" element={<RatingDemo/>}/>

      </Routes>
    </Router>    
  );
}

export default App;
