import {useEffect,useState} from "react";
import "./products.css";

function Products(){

 const [products,setProducts] = useState([]);

 const loadProducts = ()=>{

  fetch("http://localhost:5000/admin/products")
  .then(res=>res.json())
  .then(data=>setProducts(data));

 }

 useEffect(()=>{
  loadProducts();
 },[]);

 const deleteProduct = async(id)=>{

  await fetch(`http://localhost:5000/admin/product/${id}`,{
   method:"DELETE"
  });

  loadProducts();

 }

 return(

  <div>

   <h2>Jewellery Collections</h2>

   {products.map(p=>(

    <div key={p._id}>

     <img
      src={`http://localhost:5000${p.image}`}
      width="120"
     />

     <p>{p.name}</p>
     <p>{p.category}</p>
     <p>{p.subCategory}</p>
     <p>Weight: {p.weight}g</p>
     <p>Price: ₹{p.price}</p>

     <button onClick={()=>deleteProduct(p._id)}>
      Delete
     </button>

    </div>

   ))}

  </div>

 )

}

export default Products;