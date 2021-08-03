import { dbService, storageService } from "MyBase";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TweetFactory.css";
import Cancle from "../img/Cancle.svg";
import Tweet from "../img/Tweet.svg";

const TweetFactory = ({ userObj, togglePost, setIsPost }) => {
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

    let time = new Date();

    const tweetObj = {
      text: tweet,
      createdAt: time.toLocaleDateString(),
      creatorId: userObj.uid,
      name: userObj.displayName,
      attachmentUrl,
    };
    await dbService.collection("tweets").add(tweetObj);
    setTweet("");
    setAttachment("");
    setIsPost(false);
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
          <button id="tweetFactory-delete-btn" onClick={togglePost}>
            <img id="tweetFactory-delete-btn-img" src={Cancle} />
          </button>
        </div>
        <input
          id="tweetFactory-text-input"
          type="text"
          placeholder="내용을 적어주세요."
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <div className="tweetFactory-bottom-wrap">
          <label for="tweetFactory-file-input">
            사진추가
            <img src={Tweet} />
          </label>
          <input
            id="tweetFactory-file-input"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
          {attachment && (
            <div id="tweetFactory-preview-wrap">
              <img
                src={attachment}
                id="tweetFactory-preview-img"
                height="50px"
              />
              <button
                id="tweetFactory-preview-delete-btn"
                onClick={onClearAttachment}
              >
                <img src={Cancle} />
              </button>
            </div>
          )}
          <input id="tweetFactory-tweet-btn" type="submit" value="게시" />
        </div>
      </form>
    </div>
  );
};

export default TweetFactory;
