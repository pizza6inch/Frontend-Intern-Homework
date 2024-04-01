import React, { useState, useEffect } from "react";
import Header from "../component/Header/Header";
import Post from "../component/Post/Post";
import Comment from "../component/Comment/Comment";

function PostPage() {
  const [Issue, setIssue] = useState(undefined);

  const [userData, setUserData] = useState([]);

  const [rerender, setRerender] = useState(false);
  const [Comments, setComments] = useState([undefined]);
  var called = false;
  const IssueNumber = new URLSearchParams(window.location.search).get(
    "IssueNumber"
  );

  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      getUserData();
    } else {
      setUserData({ login: "Guest" });
    }

    if (Issue === undefined && called === false) {
      called = true;
      getIssue(IssueNumber);
      getComments(IssueNumber);
      //console.log("getIssues");
    }
    // console.log(Issue);
    //console.log(Comments);
  }, [rerender]);

  async function getUserData() {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        //setRerender(!rerender); // Uncomment this line if you want to re-render the component after fetching user data
        //console.log(data);
      });
  }

  // Fetch issue data from the server
  async function getIssue(IssueNumber) {
    await fetch("http://localhost:4000/getIssue/", {
      method: "GET",
      headers: {
        number: IssueNumber,
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIssue(data);
        setRerender(!rerender);
        //console.log(data);
      });
  }

  async function getComments(IssueNumber) {
    //console.log(Issue.number);
    await fetch("http://localhost:4000/getIssueComments", {
      method: "GET",
      headers: {
        number: IssueNumber,
        Authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setComments(data);
        //console.log(data);
      });
  }

  return (
    <div className="PostPage">
      <Header name={userData.login} />
      <Post issue={Issue} userData={userData} />
      <Comment comments={Comments} />
    </div>
  );
}

export default PostPage;
