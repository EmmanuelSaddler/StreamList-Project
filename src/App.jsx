import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Movies from './pages/movies.jsx'
import Subscription from './pages/sub.jsx'
import Cart from './pages/cart.jsx'

function ListItem({ item, deleteItem, toggleComplete, editItem }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);

  const saveEdit = () => {
    editItem(item.id, editText);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input value={editText} onChange={(e) => setEditText(e.target.value)}/>
          <button onClick={saveEdit}><span className="material-symbols-outlined">check</span></button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: item.completed ? "line-through" : "none" }}> {item.text}</span>
          <button className='icon-button' onClick={() => toggleComplete(item.id)}> <span className="material-symbols-outlined">check</span></button>
          <button className='icon-button' onClick={() => setIsEditing(true)}><span className="material-symbols-outlined">edit</span></button>
          <button className='icon-button' onClick={() => deleteItem(item.id)}><span className="material-symbols-outlined">delete</span></button>
        </>
      )}
      <br></br><br></br>
    </li>

  );
}

function Home({ items, deleteItem, toggleComplete, editItem }) {
  return (
    <div className= "content-spacing">
      <h2 style={{textAlign: 'center'}}>Welcome to StreamingBuddy! Your one stop shop to help you watch your favroite entertainment!</h2>
      <br></br> 
      <p style={{textAlign: 'center'}}>Keep track of movies that you watched, Look up movies and their descriptions, and find your next popcorn flick!</p>
      
      <div className= "content-spacing">
        <h2>Entered List:</h2>
        <ul>
          {items.map(item => (
            <ListItem key={item.id} item={item} deleteItem={deleteItem} toggleComplete={toggleComplete} editItem={editItem}/>
          ))}
        </ul>
      </div>
      
      <footer>
      <p>This web app is a solo dev project. <br></br> Created by Emmanuel Saddler</p>
      </footer>

    </div>
  );
}

function About() { 
  return (
    <div style={{textAlign: 'center'}}>
      <h2>About Us</h2>
      <p>Coming Soon!
      <br></br><br></br><br></br><br></br>
      Movie API Powered by The Movie Database</p>
    </div>
  );
}


function SubmitButton({ handleClick }) {
  return (
    <button onClick={handleClick}><span className="material-symbols-outlined">check</span></button>
  );
}

function TopNav({addItem, cart}) {
  const [input, setInput] = useState("");

  const handleClick = () => {
    console.log("The User Inputed:", input);
        if (input.trim() === "") return;
    addItem(input);
    setInput("");
  };

  return (
    <div className="topnav" style={{ textAlign: 'center' }}>
      <Link to="/">Home</Link> &nbsp;&nbsp;
      <Link to="/movies">Movies</Link> &nbsp;&nbsp;
      <Link to="/cart">Cart ({cart.length})</Link> &nbsp;&nbsp;
      <Link to="/subscription">Shop</Link> &nbsp;&nbsp;
      <Link to="/about">About</Link> &nbsp;&nbsp;

      <input type="text" placeholder="Add a movie to the list..." value={input} onChange={(e) => setInput(e.target.value)}/>
      &nbsp;&nbsp;

      <SubmitButton handleClick={handleClick} />
    </div>
  );
}

function AppRoutes({ addItem, items, deleteItem, toggleComplete, editItem, cart, setCart, addToCart}) {
  return (
    <Routes>
      <Route path="/" element={<Home items={items} deleteItem={deleteItem} toggleComplete={toggleComplete} editItem={editItem} />} />
      <Route path="/movies" element={<Movies addItem={addItem}/>} />
      <Route path="/cart" element={<Cart  cart={cart} setCart={setCart}/>} />
      <Route path="/subscription" element={<Subscription addToCart={addToCart}/>} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}


export default function MyApp() {

//LocalStorage Stuff
const [items, setItems] = useState(() => {
  const saved = localStorage.getItem("items");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("items", JSON.stringify(items));
}, [items]);

const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

//Systems
  const addItem = (text) => {
    const newItem = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setItems([...items, newItem]);
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const toggleComplete = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const editItem = (id, newText) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, text: newText } : item
    ));
  };

  const addToCart = (item) => {
  const isSubscription = item.service.includes("Subscription");

  if (isSubscription) {
    const alreadyHasSubscription = cart.some(
      (cartItem) => cartItem.type === "subscription"
    );

    if (alreadyHasSubscription) {
      alert("You can only add one subscription at a time.");
      return;
    }
  }

  const existing = cart.find((cartItem) => cartItem.id === item.id);

  if (existing) {
    setCart(
      cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  } else {
    setCart([
      ...cart,
      {
        id: item.id,
        name: item.service,
        info: item.serviceInfo,
        price: item.price,
        img: item.img,
        quantity: 1,
        type: isSubscription ? "subscription" : "accessory",
      },
    ]);
  }
};

  return (
    <BrowserRouter>
      <div>
        <br></br>
        <h1 style={{textAlign: 'center'}}>StreamingBuddy</h1>
        <TopNav addItem={addItem} cart={cart}/>
        <br></br>
        <AppRoutes addItem={addItem} items={items} deleteItem={deleteItem} 
        toggleComplete={toggleComplete} editItem={editItem} 
        addToCart={addToCart} cart={cart} setCart={setCart}/>
      </div>
    </BrowserRouter>
    
  );
}

//Heyas World!