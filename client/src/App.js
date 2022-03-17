import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from '../src/Components/Form/Form'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form/>}/>        
      </Routes>
    </Router>    
  );
}

export default App;
