import { dbService, storageService } from "MyBase";
import { useState } from "react";
import "./Tweet.css";
import Delete from "../img/Delete.svg";
import Edit from "../img/Edit.svg";

const Tweet = ({ tweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 이 게시물을 삭제 하시겠습니까?");
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`tweets/${tweetObj.id}`).update({
      text: newTweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewTweet(value);
  };
  return (
    <div className="tweet-form">
      <div className="tweet-top-wrap">
        {tweetObj.name !== null ? (
          <h4 id="tweet-name">{tweetObj.name}</h4>
        ) : (
          <h4 id="tweet-name">이름없음</h4>
        )}
        {editing
          ? null
          : isOwner && (
              <div className="tweet-btn-wrap">
                <button onClick={onDeleteClick}>
                  <img id="tweet-btn-img" src={Delete} alt="삭제" />
                </button>
                <button onClick={toggleEditing}>
                  <img id="tweet-btn-img" src={Edit} alt="수정" />
                </button>
              </div>
            )}
      </div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <div id="tweet-edit-wrap">
                <form onSubmit={onSubmit}>
                  <input
                    id="tweet-text-input"
                    type="text"
                    placeholder="수정할 내용을 적어주세요"
                    value={newTweet}
                    onChange={onChange}
                    required
                  />
                  <input type="submit" value="수정" />
                </form>
                <button onClick={toggleEditing}>취소</button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="tweet-content-wrap">
            <h4 id="tweet-text">{tweetObj.text}</h4>
            {tweetObj.attachmentUrl && (
              <img src={tweetObj.attachmentUrl} className="tweet-img" />
            )}
          </div>
        </>
      )}
      <h4 id="tweet-date">{tweetObj.createdAt}</h4>
    </div>
  );
};

export default Tweet;
