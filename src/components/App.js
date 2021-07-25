import { useState } from "react";
import "./App.css";
import AppRouter from "./Router";
import firebase from "../firebase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Twitter Clone {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
