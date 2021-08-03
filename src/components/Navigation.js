import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";
import TweetFactory from "./TweetFactory";
import Tweet from "../img/Tweet.svg";
import Home from "../img/Home.svg";
import Logo from "../img/Logo.svg";
import Profile from "../img/Profile.svg";

const Navigation = ({ userObj }) => {
  const [currentSection, setCurrentSection] = useState(true);
  const [isPost, setIsPost] = useState(false);

  const changeSection = (event) => {
    const {
      target: { name },
    } = event;
    if (name === "home") {
      setCurrentSection(true);
    } else if (name === "profile") {
      setCurrentSection(false);
    }
  };

  const togglePost = () => setIsPost((prev) => !prev);

  {
    useEffect(() => {
      if (isPost === true) {
        document.body.style.cssText = `
        position : fixed;
        top : -${window.scrollY}px
        overflow-y : scroll;
        width : 100%`;
        return () => {
          const scrollY = document.body.style.top;
          document.body.style.cssText = "";
          window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
        };
      }
    }, [isPost]);
  }
  return (
    <>
      <nav id="navigation">
        <img src={Logo} id="navigation-logo" />
        <ul>
          {currentSection ? (
            <li onClick={togglePost}>
              <img src={Tweet} />
              추가
            </li>
          ) : null}
          <li onClick={changeSection}>
            <Link name="home" to="/" className="navigation-item">
              <img src={Home} name="home" />홈
            </Link>
          </li>
          <li onClick={changeSection}>
            <Link name="profile" to="/profile" className="navigation-item">
              <img src={Profile} name="profile" />
              {userObj.displayName}님의 프로필
            </Link>
          </li>
        </ul>
      </nav>
      {isPost ? (
        currentSection ? (
          <TweetFactory
            setIsPost={setIsPost}
            userObj={userObj}
            togglePost={togglePost}
          />
        ) : null
      ) : null}
    </>
  );
};
export default Navigation;
