import { useEffect, useState } from "react";
import "./App.css";
import AppRouter from "./Router";
import { authService } from "../MyBase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    setUserObj(authService.currentUser());
  };
  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
