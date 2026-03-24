import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import TryOn from "./pages/TryOn";


import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CartPage from "./pages/CartPage";
import GoldPlan from "./pages/GoldPlan";
import Collections from "./pages/Collections";
import CategoryPage from "./pages/Category";

import AdminDashboard from "./admin/AdminDashboard";

function App() {
  return (
    <AuthProvider>
      <CartProvider>

        <Routes>

          {/* Customer Pages */}
          <Route element={<MainLayout />}>

            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/gold-plan" element={<GoldPlan />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/tryon" element={<TryOn />} />

          </Route>

          {/* Admin Pages */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

        </Routes>

      </CartProvider>
    </AuthProvider>
  );
}

export default App;