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
import ResetPassWord from './Components/FormPost/EditProfile'
// import InputSearchB from "../src/Components/FormPost/";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/formpaydata" element={<ResetPassWord />} />
        
        <Route path="/payment" element={<Payment />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rating" element={<RatingDemo />} />
        <Route path="/DetailsPage" element={<DetailsPage />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/formpublic" element={<Form/>}/>        
      </Routes>
    </Router>
  );
}

export default App;
