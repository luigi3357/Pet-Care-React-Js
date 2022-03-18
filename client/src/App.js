import "./App.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Payment from "./Pages/Payment";
import { Register } from "./Components/LoginAndRegister/Register";
import { Login } from "./Components/LoginAndRegister/LoginModal";
import { RatingDemo } from "./Components/Review";
import { DetailsPage } from "./Pages/DetailsPage";
// import { Profile } from "./Pages/Profile";
import { Home } from "./Pages/Home";
import { ForgotPassword } from './Components/LoginAndRegister/ForgotPassword';
import { MailCode } from './Components/LoginAndRegister/mailCode';
import { Reset } from './Components/LoginAndRegister/Reset';
import FormCard from "../src/Components/FormPost/Form";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reset" element={<Reset/>}/>   
        <Route path="/mailcode" element={<MailCode/>}/>   
        <Route path ="/forgotPassword" element={<ForgotPassword/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rating" element={<RatingDemo />} />
        <Route path="/DetailsPage" element={<DetailsPage />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/formpublic" element={<FormCard/>}/>        
      </Routes>
    </Router>
  );
}

export default App;
