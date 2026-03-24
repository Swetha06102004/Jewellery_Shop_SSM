import { useState } from "react";
import Dashboard from "./Dashboard";
import Customers from "./Customers";
import Bookings from "./Bookings";
import Products from "./Products";
import AddProduct from "./AddProduct";
import Orders from "./Orders";


function AdminDashboard(){

 const [tab,setTab] = useState("dashboard");

 return(

  <div className="admin-layout">

   <div className="admin-sidebar">

    <h2 className="admin-logo">SSM Admin</h2>

    <button onClick={()=>setTab("dashboard")}>Dashboard</button>
    <button onClick={()=>setTab("customers")}>Customers</button>
    <button onClick={()=>setTab("bookings")}>Bookings</button>
    <button onClick={()=>setTab("orders")}>Orders</button>
    <button onClick={()=>setTab("products")}>Collections</button>
    <button onClick={()=>setTab("add")}>Add Product</button>

   </div>

   <div className="admin-main">


    <div className="admin-content">

     {tab === "dashboard" && <Dashboard/>}
     {tab === "customers" && <Customers/>}
     {tab === "bookings" && <Bookings/>}
     {tab === "orders" && <Orders/>}
     {tab === "products" && <Products/>}
     {tab === "add" && <AddProduct/>}

    </div>

   </div>

  </div>

 )

}

export default AdminDashboard;