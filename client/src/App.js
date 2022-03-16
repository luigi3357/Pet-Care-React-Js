import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from './Components/LoginAndRegister/Register';







function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Register" element={<Register/>}/>        
      </Routes>
    </Router>    
  );
}

export default App;
