import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Collections.css";

function CategoryPage() {

  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {

    axios.get(`https://jewellery-shop-ssm-1.onrender.com/jewellery?category=${category}`)
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));

  }, [category]);

  return (

    <div className="collections-page">

      <h1 className="collections-title">{category.toUpperCase()} Collection</h1>

      <div className="collections-container">

        {products.map(item => (

          <div className="jewel-card" key={item.id}>

            <img
              src={item.image}
              alt={item.name}
              className="jewel-image"
            />

            <h3>{item.name}</h3>

            <p>{item.weight}g</p>
            <p>₹{item.price}</p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default CategoryPage;