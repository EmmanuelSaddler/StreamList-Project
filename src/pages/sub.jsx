import { useState, useEffect } from "react";
import data from "../Data.js";

export default function Subscription({ addToCart }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Loading subscriptions...</p>;
  }
  
  return (
    <div style={{padding: 20}}>
      <h2 className="subscription-title">Available Subscriptions & Accessories</h2>

      <div className="subscription-grid">
        {data.map((item) => (
          <div key={item.id} className="subscription-card">
            <img src={item.img} alt={item.service} className="subscription-image"/>
            <h3 className="subscription-name">{item.service}</h3>
            <p className="subscription-info">{item.serviceInfo}</p>
            <p className="subscription-price">${item.price.toFixed(2)}</p>
            <button onClick={() => addToCart(item)} className="subscription-button">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

