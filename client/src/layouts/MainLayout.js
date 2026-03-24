import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GoldPriceTicker from "../pages/GoldPriceTicker";
import { Outlet } from "react-router-dom";

function MainLayout() {

  return (
    <>
    
      <Navbar />
      <Outlet />
      <GoldPriceTicker />
      <Footer />
    </>
  );

}

export default MainLayout;