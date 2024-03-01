import React, { useState, useEffect } from "react";
import Header from "../component/Header/Header";
import Post from "../component/Post/Post";
import math from "math";
function PostPage() {
  const [Issues, setIssues] = useState([]);
  const [userData, setUserData] = useState([]);
  const [rerender, setRerender] = useState(false);

  const number = new URLSearchParams(window.location.search).get("number");
  useEffect(() => {
    const page = (math.floor(number / 10) % 10) + 1;
    if (localStorage.getItem("accessToken") !== null) {
      getUserData();
    } else {
      setUserData({ login: "Guest" });
    }
    if (Issues.length === 0) {
      getIssues(page);
    }
    //console.log(Issues);
  }, [rerender]);

  // console.log(page);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        //setRerender(!rerender);
        //console.log(data);
      });
  }

  async function getIssues(page) {
    await fetch("http://localhost:4000/getIssues", {
      method: "GET",
      headers: {
        page: page,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIssues(data);
        console.log(data);
      });
  }
  return (
    <div className="PostPage">
      <Header name={userData.login} />
      <Post issue={Issues[number]} />
      <h1>Page2</h1>
      <div>{number}</div>
    </div>
  );
}

export default PostPage;
