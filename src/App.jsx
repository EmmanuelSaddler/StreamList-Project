import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Home() { 
  return 
}
function Movies() { 
  return 
}
function Cart() { 
  return 
}
function About() { 
  return 
}


function SubmitButton() {
  const handleClick = () => {
    const input = document.getElementById('movinput')
    console.log("The User Inputed:", input ? input.value : '')
  }

  return (
    <button onClick={handleClick}>Submit</button>
  )
}

function TopNav() {
  return (
    <div className="topnav" style={{ textAlign: 'center' }}>
      <Link to= "/">Home</Link> &nbsp;&nbsp;
      <Link to= "/movies">Movies</Link> &nbsp;&nbsp;
      <Link to= "/cart">Cart</Link> &nbsp;&nbsp;
      <Link to= "/about">About</Link> &nbsp;&nbsp;
      <input type="text" name="movinput" id="movinput" />&nbsp;&nbsp;
      <SubmitButton />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}


export default function MyApp() {
  return (
    <BrowserRouter>
      <div>
        <br></br>
        <TopNav />
        <h1 style={{textAlign: 'center'}}>Welcome to StreamList</h1>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

//Heyas World!