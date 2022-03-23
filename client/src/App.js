/*import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";*/
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import "./App.css";
import AddressAutocom from "./Components/AddressAutocom.jsx";
import AdminHome from "./Components/Admin/AdminHome";
import EditProfile from "./Components/FormPost/EditProfileform/EditProfile.jsx";
import FormCuidador from "./Components/FormPost/Form-post-reqserv-cuidador/Form";
import FormServ from "./Components/FormPost/Form-post-reqserv-cuidador/Formreqserv";
import FormPayBank from "./Components/FormPost/FormsPay/FormPayData";
import FormMercadoP from "./Components/FormPost/FormsPay/FormPayMP";
import ResetPassword from "./Components/FormPost/Resetpasswordprofile/ResetPassword";

import EditForm from "./Components/FormPost/Form-post-reqserv-cuidador/EditForm";
// import InputSearchB from "../src/Components/FormPost/";
import SearchBar from "./Components/SearchBar";
import { ConfirmationMP } from "./Components/MP_Confirmation";
import { Payment } from "./Components/Payment";
import { BookingDatatables } from "./Components/BookingTable";

import { Verification } from "./Components/LoginAndRegister/2fa";
import { ForgotPassword } from "./Components/LoginAndRegister/ForgotPassword";
import { Login } from "./Components/LoginAndRegister/LoginModal";
import { MailCode } from "./Components/LoginAndRegister/mailCode";
import { Register } from "./Components/LoginAndRegister/Register";
import { Reset } from "./Components/LoginAndRegister/Reset";
import { RatingDemo } from "./Components/Review";
import { Home } from "./Pages/Home";
import { Profile } from "./Pages/Profile";
import { PersonalProfile } from "./Pages/PersonalProfile";
import MapDetail from "./Pages/MapDetail";
import About from "./Components/About/About";
import Terms from "./Components/Terms/Terms";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/mailcode" element={<MailCode />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rating" element={<RatingDemo />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/PersonalProfile/:id" element={<PersonalProfile />} />
        <Route path="/verificacion" element={<Verification />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/formMercadoP" element={<FormMercadoP />} />
        <Route path="/formPayBank" element={<FormPayBank />} />
        <Route path="/formpublic" element={<FormCuidador />} />
        <Route path="/formpublicServ" element={<FormServ />} />
        <Route path="/editForm/:id" element={<EditForm />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/Maps" element={<MapDetail />} />
        <Route path="/booking/:id" element={<Payment />} />
        <Route path="/AddressAutocom" element={<AddressAutocom />} />
        <Route path="/about" element={<About />} />
        <Route path="/mp_confirmation" element={<ConfirmationMP />} />
      </Routes>
    </Router>
  );
}

export default App;

//////////////       mercadopago                //////////////
{
  /* <Route path="/" element={<BookingDatatables title={'Contrataciones'}  />}/>    */
} /*data={infoUser.contrataciones}*/
{
  /* <Route path="/booking/:id" element={<Payment />} />
<Route path="/mp_confirmation" element={<ConfirmationMP />} /> */
}
