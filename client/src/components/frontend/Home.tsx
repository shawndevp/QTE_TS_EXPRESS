import React, { useState, useEffect } from "react";
import axios from "axios";
import server from "../backend/Server";

function Home() {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [usernameTwo, setUsernameTwo] = useState("");
  const [commentTwo, setCommentTwo] = useState("");
  const [listData, setListData] = useState<any[]>([]);
  const [listDataTwo, setListDataTwo] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${server}/api/get`).then((response) => {
      setListData(response.data);
    });
    axios.get(`${server}/api/get/joined`).then((response) => {
      setListDataTwo(response.data);
    });
  }, []);

  const submitInput = () => {
    axios.post(`${server}/api/insert`, {
      postUsername: username,
      postComment: comment,
    });
    setListData([
      ...listData,
      { postUsername: username, postComment: comment },
    ]);
  };

  const submitInputTwo = () => {
    axios.post(`${server}/api/insert`, {
      postUsernameTwo: usernameTwo,
      postCommentTwo: commentTwo,
    });
    setListDataTwo([
      ...listDataTwo,
      { postUsername: usernameTwo, postComment: commentTwo },
    ]);
  };

  return (
    <>
      <h1>Diskutera!</h1>

      <div className="questionBoxWrapper">
        <div className="questionBox">
          <div className="questionBottom">
            <label>Namn:</label>
            <input
              type="text"
              name="name"
              placeholder="Ditt namn"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <br />
            <label>Kommentar:</label>
            <input
              type="text"
              name="comment"
              placeholder="Ditt Svar"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <br />
            <button onClick={submitInput}>Skicka</button>
          </div>

          <label>Namn2:</label>
          <input
            type="text"
            name="name"
            placeholder="Ditt namn"
            onChange={(e) => {
              setUsernameTwo(e.target.value);
            }}
          />
          <br />
          <label>Kommentar2:</label>
          <input
            type="text"
            name="comment"
            placeholder="Ditt Svar"
            onChange={(e) => {
              setCommentTwo(e.target.value);
            }}
          />
          <br />
          <button onClick={submitInputTwo}>Skicka</button>

          {listData.map((val) => {
            return (
              <>
                <div className="discussionPosts">
                  <div className="discussionWrapper">
                    <p>Namn: {val["user"]}</p>
                    <p> Kommentar : {val["comment"]}</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
