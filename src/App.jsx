import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

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
          <button onClick={saveEdit}><span class="material-symbols-outlined">check</span></button>
        </>
      ) : (
        <>
          <span style={{ textDecoration: item.completed ? "line-through" : "none" }}> {item.text}</span>
          <button className='icon-button' onClick={() => toggleComplete(item.id)}> <span class="material-symbols-outlined">check</span></button>
          <button className='icon-button' onClick={() => setIsEditing(true)}><span class="material-symbols-outlined">edit</span></button>
          <button className='icon-button' onClick={() => deleteItem(item.id)}><span class="material-symbols-outlined">delete</span></button>
        </>
      )}
      <br></br><br></br>
    </li>

  );
}

function Home({ items, deleteItem, toggleComplete, editItem }) {
  return (
    <div>
      <h2>Entered List:</h2>
      <ul>
        {items.map(item => (
          <ListItem key={item.id} item={item} deleteItem={deleteItem} toggleComplete={toggleComplete} editItem={editItem}/>
        ))}
      </ul>
    </div>
  );
}

function Movies() { 
  return <h2 style={{textAlign: 'center'}}>Movie List:</h2>;
}
function Cart() { 
  return <h2 style={{textAlign: 'center'}}>My Cart:</h2>;
}
function About() { 
  return <h2 style={{textAlign: 'center'}}>About Us</h2>;
}


function SubmitButton({ handleClick }) {
  return (
    <button onClick={handleClick}><span class="material-symbols-outlined">search</span></button>
  );
}

function TopNav({addItem}) {
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
      <Link to="/cart">Cart</Link> &nbsp;&nbsp;
      <Link to="/about">About</Link> &nbsp;&nbsp;

      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
      &nbsp;&nbsp;

      <SubmitButton handleClick={handleClick} />
    </div>
  );
}

function AppRoutes({ items, deleteItem, toggleComplete, editItem}) {
  return (
    <Routes>
      <Route path="/" element={<Home items={items} deleteItem={deleteItem} toggleComplete={toggleComplete} editItem={editItem} />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}


export default function MyApp() {
  const [items, setItems] = useState([]);

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

  return (
    <BrowserRouter>
      <div>
        <br></br>
        <h1 style={{textAlign: 'center'}}>Welcome to StreamList</h1>
        <TopNav addItem={addItem} />
        <br></br>
        <AppRoutes items={items} deleteItem={deleteItem} toggleComplete={toggleComplete} editItem={editItem}/>
      </div>
    </BrowserRouter>
  );
}

//Heyas World!