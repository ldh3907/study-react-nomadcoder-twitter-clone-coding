import { authService, dbService } from "MyBase";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import Edit from "img/Edit.svg";

export default ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [isClick, setIsClick] = useState(false);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };
  const getMyTweets = async () => {
    const tweets = await dbService
      .collection("tweets")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt", "desc")
      .get();
    tweets.docs.map((doc) => doc.data());
  };
  useEffect(() => {
    getMyTweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
      setIsClick(false);
    }
  };

  const toggleRename = () => setIsClick((prev) => !prev);

  return (
    <>
      <section id="profile">
        <div id="profile-form">
          <form id="profile-rename-wrap" onSubmit={onSubmit}>
            <div id="profile-top-wrap">
              <h1>{userObj.displayName}</h1>
              <button id="tweet-rename-btn" onClick={toggleRename}>
                <img src={Edit} />
              </button>
            </div>
            {isClick ? (
              <>
                <input
                  type="text"
                  onChange={onChange}
                  placeholder="변경하실 이름을 적어주세요"
                  value={newDisplayName}
                />
                <input type="submit" value="이름 변경" />
              </>
            ) : null}
          </form>
          <button id="profile-logOut-btn" onClick={onLogOutClick}>
            로그아웃
          </button>
        </div>
      </section>
    </>
  );
};
