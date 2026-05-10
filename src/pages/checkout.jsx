import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout({cart, setCart}) {

    const navigate = useNavigate();

    const totalPrice = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const [CardNum, setCardNumber] = useState("");
    const [CardName, setName] = useState("");
    const [ExDate, setExp] = useState("");
    const [CVV, setCvv] = useState("");

    const handleCardNumberChange = (e) => {
        let value = e.target.value;

        value = value.replace(/\s+/g, "");
        value = value.replace(/\D/g, "");
        value = value.slice(0, 16);

        const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        setCardNumber(formatted);
        };

    const handleSubmit = () => {
        if (CardNum.length !== 19) {
        alert("Card number must be 16 digits.");
        return;
    }

    if (CardName.trim() === "") {
        alert("Name cannot be empty.");
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(ExDate)) {
        alert("Expiration must be MM/YY.");
        return;
    }

    if (CVV.length !== 3 || /\D/.test(CVV)) {
        alert("CVV must be 3 digits.");
        return;
    }

    const cardData = {
      name: CardName,
      number: CardNum,
      exp: ExDate,
      cvv: CVV
    };

    localStorage.setItem("creditCard", JSON.stringify(cardData));

    alert("Payment saved!");
    navigate("/");
    };


    return(
        <div>
            <h2 style={{textAlign: 'center'}}>Checkout</h2>
            <br></br>

            <div className="cardinfo">
                <h2>Payment Information:</h2>
                <input value={CardNum} type="text" placeholder="Card Number..."
                style={{ marginBottom: "10px" , fontSize: "1rem" }} onChange={handleCardNumberChange}/>

                <input onChange={(e) => setName(e.target.value)} value={CardName} type="text" placeholder="Name On Card..."style={{ marginBottom: "10px" , fontSize: "1rem" }}/>
                <input onChange={(e) => setExp(e.target.value)} value={ExDate} type="text" placeholder="Expiration Date..." style={{ marginBottom: "10px" , fontSize: "1rem" }}/>
                <input onChange={(e) => setCvv(e.target.value)} value={CVV} type="text" placeholder="CVV..." style={{ marginBottom: "10px" , fontSize: "1rem" }}/>
                <button className="subscription-button" onClick={handleSubmit}>Submit</button>
            </div>

            <h2 style={{left: 20}}>In Your Cart:</h2>
            <br></br>
            <h2 className="cart-total">Subtotal: ${totalPrice.toFixed(2)}</h2>
            <h2>Tax: $0.00</h2>
            <h2 className="cart-total">Total: ${totalPrice.toFixed(2)}</h2>

            <br></br><br></br>

            <button className="subscription-button" onClick={() => navigate("/cart")}>Back To Cart</button>
        </div>

    );
}