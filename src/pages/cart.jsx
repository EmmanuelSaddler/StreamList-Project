import { useNavigate } from "react-router-dom";

export default function Cart({ cart, setCart }) {

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const increaseQty = (id) => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity || 1) - 1) }
          : item
      )
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const navigate = useNavigate();


  return (
    <div className="cart-container">
      <h2>My Cart:</h2>
      <br></br>
      {cart.length === 0 && <p>Your cart is empty.</p>}

      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.img} alt={item.name} style={{width: 100, height: 100}}/>

          <div className="cart-details">
            <h3>{item.name}</h3>
            <p>{item.info}</p>
            <p>${item.price.toFixed(2)}</p>

            {item.type === "accessory" && (
              <div className="cart-quantity">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>
            )}

            {item.type === "subscription" && (
              <p>Quantity: 1 (Subscriptions cannot change)</p>
            )}

            <button onClick={() => removeItem(item.id)}>Remove</button>
            <br></br><br></br>
          </div>
        </div>
      ))}

      <h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>

      <button className="subscription-button" onClick={() => navigate("/checkout")}>Checkout</button>
    </div>
  );
}
