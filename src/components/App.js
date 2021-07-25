import { useState } from "react";
import "./App.css";
import AppRouter from "./Router";
import { authService } from "../MyBase";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; Twitter Clone {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
