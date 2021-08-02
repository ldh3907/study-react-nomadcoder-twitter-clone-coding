import { authService, dbService } from "MyBase";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default ({ userObj, refreshUser }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
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
    console.log(tweets.docs.map((doc) => doc.data()));
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
    }
  };
  return (
    <>
      <section id="profile">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            onChange={onChange}
            placeholder="변경하실 이름을 적어주세요"
            value={newDisplayName}
          />
          <input type="submit" value="이름 변경" />
        </form>
        <button onClick={onLogOutClick}>로그아웃</button>
      </section>
    </>
  );
};
