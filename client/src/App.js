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
import { ForgotPassword } from "./Components/LoginAndRegister/ForgotPassword";
import { MailCode } from "./Components/LoginAndRegister/mailCode";
import { Reset } from "./Components/LoginAndRegister/Reset";

import EditProfile from "./Components/FormPost/EditProfile";
import FormMercadoP from "./Components/FormPost/FormsPay/FormPayMP";
import FormPayBank from "./Components/FormPost/FormsPay/FormPayData";
import FormCuidador from "./Components/FormPost/Form-post-reqserv-cuidador/Form";
import FormServ from "./Components/FormPost/Form-post-reqserv-cuidador/Formreqserv";
import ResetPassword from "./Components/FormPost/ResetPassword";
// import InputSearchB from "../src/Components/FormPost/";
import SearchBar from "./Components/SearchBar";
import { Verification } from "./Components/LoginAndRegister/2fa";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/verificacion" element={<Verification />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/mailcode" element={<MailCode />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rating" element={<RatingDemo />} />
        <Route path="/DetailsPage" element={<DetailsPage />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/formMercadoP" element={<FormMercadoP />} />
        <Route path="/formPayBank" element={<FormPayBank />} />
        <Route path="/formpublic" element={<FormCuidador />} />
        <Route path="/formpublicServ" element={<FormServ />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
