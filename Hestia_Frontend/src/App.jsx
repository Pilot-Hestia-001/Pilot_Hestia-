import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MemberPage from "./pages/MemberPage";
import AdminPage from "./pages/Admin"
import ProfilePage from "./pages/Profile";
import RewardsPage from "./pages/RewardsPage";
import RegisterVendor from "./pages/RegisterVendor"
import LoginVendor from "./pages/LoginVendor"
import VendorStorePage from "./pages/VendorSettings";
import PurchasedRewards from "./pages/PurchasedRewards";
import ContactPage from "./pages/ContactPage";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("lastPath", location.pathname + location.search);
  }, [location]);

  // On first load, check if we have a lastPath
  useEffect(() => {
    const lastPath = localStorage.getItem("lastPath");
    if (lastPath && lastPath !== location.pathname) {
      navigate(lastPath, { replace: true });
    }
  }, []); // only run once

  return (
      <Routes>
<<<<<<< HEAD
        <Route path="VendorsListPage" element={<VendorsListPage />} />
        <Route path="/MemberPage" element={<MemberPage />} />
=======
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/vendor/rewards" element={<PurchasedRewards />} />
        <Route path="/vendor/store" element={<VendorStorePage />}/>
        <Route path="/vendor/login" element={<LoginVendor />}/>
        <Route path="/vendor/register" element={<RegisterVendor />}/>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/member" element={<MemberPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
>>>>>>> main
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
<<<<<<< HEAD
    </Router>
  );
=======
  )
>>>>>>> main
}

export default App;
