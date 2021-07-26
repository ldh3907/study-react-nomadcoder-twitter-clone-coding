import { dbService } from "MyBase";
import { useState } from "react";

const Home = () => {
  const [tweet, setTweet] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("tweets").add({
      tweet,
      createdAt: Date.now(),
    });
    setTweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setTweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="무슨 생각을 하고 계신가요?"
          maxLength={120}
          value={tweet}
          onChange={onChange}
        />
        <input type="submit" value="게시" />
      </form>
    </div>
  );
};

export default Home;
