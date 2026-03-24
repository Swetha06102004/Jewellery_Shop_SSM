import { useEffect, useState } from "react";

function Dashboard(){

 const [customers,setCustomers] = useState(0);
 const [bookings,setBookings] = useState(0);
 const [products,setProducts] = useState(0);

 useEffect(()=>{

  fetch("http://localhost:5000/admin/customers")
  .then(res=>res.json())
  .then(data=>setCustomers(data.length));

  fetch("http://localhost:5000/admin/bookings")
  .then(res=>res.json())
  .then(data=>setBookings(data.length));

  fetch("http://localhost:5000/admin/products")
  .then(res=>res.json())
  .then(data=>setProducts(data.length));

 },[]);

 return(

  <div>

    <div className="admin-topbar">
     <h1>Admin Dashboard</h1>
    </div>
    
   <div className="dashboard-cards">

    <div className="dashboard-card">
      <h3>Total Customers</h3>
      <p>{customers}</p>
    </div>

    <div className="dashboard-card">
      <h3>Total Bookings</h3>
      <p>{bookings}</p>
    </div>

    <div className="dashboard-card">
      <h3>Total Products</h3>
      <p>{products}</p>
    </div>

    <div className="dashboard-card">
      <h3>Today's Visits</h3>
      <p>--</p>
    </div>

   </div>

  </div>

 )

}

export default Dashboard;