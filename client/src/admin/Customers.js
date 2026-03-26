import { useEffect, useState } from "react";

function Customers(){

 const [customers,setCustomers] = useState([]);

 useEffect(()=>{

  fetch("https://jewellery-shop-ssm-1.onrender.com/admin/customers")
  .then(res=>res.json())
  .then(data=>setCustomers(data));

 },[]);

 const deleteCustomer = (mobile) => {

  fetch(`https://jewellery-shop-ssm-1.onrender.com/admin/customer/${mobile}`,{
   method:"DELETE"
  })
  .then(()=> {
    setCustomers(customers.filter(c => c.mobile !== mobile))
  })

 }

 return(

  <div>

   <h2>Customers</h2>

   <table>

    <thead>
     <tr>
      <th>Mobile</th>
      <th>Actions</th>
     </tr>
    </thead>

    <tbody>

     {customers.map((c,i)=>(

      <tr key={i}>

       <td>{c.mobile}</td>

       <td>

        <a href={`tel:${c.mobile}`} className="call-btn">
         Call
        </a>

        <button 
         className="delete-btn"
         onClick={()=>deleteCustomer(c.mobile)}
        >
         Delete
        </button>

       </td>

      </tr>

     ))}

    </tbody>

   </table>
   

  </div>

 )

}

export default Customers;