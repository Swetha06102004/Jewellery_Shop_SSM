import {useEffect,useState} from "react";

function Orders(){

 const [orders,setOrders] = useState([]);

 useEffect(()=>{

  fetch("https://jewellery-shop-ssm-1.onrender.com/admin/orders")
  .then(res=>res.json())
  .then(data=>setOrders(data));

 },[]);

 return(

  <div>

   <h2>Customer Orders</h2>

   {orders.map((o,i)=>(
    <div key={i} style={{border:"1px solid #ccc", margin:"10px", padding:"10px"}}>

     <p><strong>Customer:</strong> {o.customerName}</p>
     <p><strong>Mobile:</strong> {o.mobile}</p>
     <p><strong>Total:</strong> ₹{o.total}</p>
     <p><strong>Status:</strong> {o.status}</p>
     <p><strong>Date:</strong> {new Date(o.createdAt).toLocaleString()}</p>

     <h4>Items:</h4>
     {o.items.map((item,j)=>(
      <div key={j}>
       <p>{item.name} - Qty: {item.qty} - Price: ₹{item.price} - Weight: {item.weight}g</p>
      </div>
     ))}

    </div>
   ))}

  </div>

 )

}

export default Orders;