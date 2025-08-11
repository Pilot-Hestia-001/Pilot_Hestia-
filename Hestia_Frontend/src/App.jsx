import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberPage from "./pages/MemberPage";
import ProfilePage from "./pages/Profile";
import RewardsPage from "./pages/RewardsPage";
import RegisterVendor from "./pages/RegisterVendor"
import LoginVendor from "./pages/LoginVendor"
import VendorStorePage from "./pages/VendorSettings";
import PurchasedRewards from "./pages/PurchasedRewards";
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
   
      <Routes>
        <Route path="/vendor/rewards" element={<PurchasedRewards />} />
        <Route path="/vendor/store" element={<VendorStorePage />}/>
        <Route path="/vendor/login" element={<LoginVendor />}/>
        <Route path="/vendor/register" element={<RegisterVendor />}/>
        <Route path="/member" element={<MemberPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
   
  )
}

export default App
