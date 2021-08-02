import { dbService, storageService } from "MyBase";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TweetFactory.css";

const TweetFactory = ({ userObj, togglePost }) => {
  const [tweet, setTweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }

    const tweetObj = {
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      name: userObj.displayName,
      attachmentUrl,
    };
    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => setAttachment(null);
  return (
    <div id="tweetFactoty-form-wrap">
      <form id="tweetFactory-form" onSubmit={onSubmit}>
        <div className="tweetFactory-top-wrap">
          <h1 id="tweetFactory-title">질문을 마음껏 작성해주세요 :)</h1>
          <button onClick={togglePost} />
        </div>
        <input
          type="text"
          placeholder="무슨 생각을 하고 계신가요?"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="게시" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>삭제</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default TweetFactory;
