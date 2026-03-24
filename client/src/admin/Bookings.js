import {useEffect,useState} from "react";

function Bookings(){

 const [bookings,setBookings] = useState([]);

 useEffect(()=>{

  fetch("http://localhost:5000/admin/bookings")
  .then(res=>res.json())
  .then(data=>setBookings(data));

 },[]);

 return(

  <div>

   <h2>Visit Bookings</h2>

   {bookings.map((b,i)=>(
    <div key={i}>

     <p>{b.name}</p>
     <p>{b.mobile}</p>
     <p>{b.visitDate}</p>

    </div>
   ))}

  </div>

 )

}

export default Bookings;