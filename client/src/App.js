import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ForgotPassword } from './Components/LoginAndRegister/ForgotPassword';
import { Login } from "./Components/LoginAndRegister/LoginModal";
import { MailCode } from './Components/LoginAndRegister/mailCode';
import { Register } from "./Components/LoginAndRegister/Register";
import { RatingDemo } from "./Components/Review";
import { DetailsPage } from "./Pages/DetailsPage";
import { ConfirmationMP } from "./Pages/MP_Confirmation";
import { Payment } from "./Pages/Payment";
import { Profile } from "./Pages/Profile";
// import InputSearchB from "../src/Components/FormPost/";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Payment />} />
        <Route path="/mp_confirmation" element={<ConfirmationMP />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/mailcode" element={<MailCode/>}/>           
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>   
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rating" element={<RatingDemo />} />
        <Route path="/DetailsPage" element={<DetailsPage />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/formpublic" element={<Form/>}/>         */}
      </Routes>
    </Router>
  );
}

export default App;
