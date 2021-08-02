import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = ({ userObj }) => {
  const [currentSection, setCurrentSection] = useState(null);

  const changeSection = (event) => {
    const {
      target: { name },
    } = event;
    if (name === "home") {
      setCurrentSection("home");
    } else {
      setCurrentSection("profile");
    }
    console.log(currentSection);
  };
  return (
    <nav id="navigation">
      <ul>
        <li name="home" onClick={changeSection}>
          <Link to="/" className="navigation-item">
            홈
          </Link>
        </li>
        <li name="profile" onClick={changeSection}>
          <Link to="/profile" className="navigation-item">
            {userObj.displayName}님의 프로필
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navigation;
