import { useState } from "react";
import "./addproduct.css";

function AddProduct(){

const [form,setForm] = useState({
name:"",
category:"",
subCategory:"",
weight:"",
price:"",
image:null
});

const [preview,setPreview] = useState(null);

const submit = async(e)=>{

e.preventDefault();

const data = new FormData();

data.append("name",form.name);
data.append("category",form.category);
data.append("subCategory",form.subCategory);
data.append("weight",form.weight);
data.append("price",form.price);
data.append("image",form.image);

await fetch("http://localhost:5000/admin/add-product",{
method:"POST",
body:data
});

alert("Product Added");

// reset form
setForm({
name:"",
category:"",
subCategory:"",
weight:"",
price:"",
image:null
});

setPreview(null);
};

return(

  <form onSubmit={submit} className = "add-product-form">

   <h2>Add Jewellery Collection</h2>

<input
placeholder="Product Name"
value={form.name}
onChange={e=>setForm({...form,name:e.target.value})}
/>

<select
value={form.category}
onChange={e=>setForm({...form,category:e.target.value})}

>

```
<option value="">Select Category</option>
<option value="Gold">Gold</option>
<option value="Silver">Silver</option>
<option value="Diamond">Diamond</option>
```

   </select>

<select
value={form.subCategory}
onChange={e=>setForm({...form,subCategory:e.target.value})}

>

```
<option value="">Select Sub Category</option>
<option value="Ring">Ring</option>
<option value="Bangles">Bangles</option>
<option value="Necklace">Necklace</option>
<option value="Bracelet">Bracelet</option>
```

   </select>

<input
type="number"
placeholder="Weight (g)"
value={form.weight}
onChange={e=>setForm({...form,weight:e.target.value})}
/>

<input
type="number"
placeholder="Price (₹)"
value={form.price}
onChange={e=>setForm({...form,price:e.target.value})}
/>

<input
type="file"
onChange={e=>{
setForm({...form,image:e.target.files[0]})
setPreview(URL.createObjectURL(e.target.files[0]))
}}
/>

{/* IMAGE PREVIEW */}

{preview && ( <img
  src={preview}
  alt="preview"
  className="preview-img"
 />
)}

<button>Add Product</button>

  </form>

)

}

export default AddProduct;
