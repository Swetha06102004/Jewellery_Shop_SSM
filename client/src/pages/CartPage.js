import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./CartPage.css";

function CartPage() {

  const { cartItems, removeFromCart, updateQty, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [goldPrice, setGoldPrice] = useState(0);

  useEffect(() => {

  if (!user) {
    alert("Please login first");
    navigate("/");
  }

}, [user, navigate]);

useEffect(() => {
  fetch("https://jewellery-shop-ssm-1.onrender.com/api/gold-price")
    .then(res => res.json())
    .then(data => setGoldPrice(data.price))
    .catch(err => console.log(err));
}, []);

 const total = cartItems.reduce(
  (sum, item) => sum + (item.weight * goldPrice) * item.qty,
  0
);

  const placeOrder = async () => {
    if (!user || !user.mobile) {
      alert("Please login first");
      return;
    }

    const items = cartItems.map(item => ({
      productId: item.id,
      name: item.name,
      price: item.price,
      qty: item.qty,
      weight: item.weight
    }));

    try {
      const res = await fetch("https://jewellery-shop-ssm-1.onrender.com/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: user.mobile,
          items,
          total
        })
      });

      if (res.ok) {
        alert("Order placed successfully!");
        clearCart();
        navigate("/");
      } else {
        alert("Order failed");
      }
    } catch (err) {
      console.log(err);
      alert("Error placing order");
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
      </div>

      {cartItems.length === 0 && <p className="empty-cart">Cart is empty</p>}

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image}   alt={item.name} className="cart-item-image" />

            <div className="cart-item-details">
              <h4 className="cart-item-name">{item.name}</h4>
              <p className="cart-item-price"> ₹ {goldPrice ? item.weight * goldPrice : "..."} </p>
            </div>

            <div className="cart-item-controls">
              <input
                type="number"
                value={item.qty}
                min="1"
                onChange={(e) =>
                  updateQty(item.id, Number(e.target.value))
                }
                className="quantity-input"
              />

              <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-total">
          <h3>Total: ₹ {total}</h3>
          <button onClick={placeOrder} className="checkout-btn">Place Order</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;