import React, { useState, useEffect } from "react";
import Header from "../component/Header/Header";
import Post from "../component/Post/Post";
import Comment from "../component/Comment/Comment";


function PostPage() {
  
  const [Issue, setIssue] = useState(undefined);

  const [userData, setUserData] = useState([]);

  const [rerender, setRerender] = useState(false);
  const [Comments, setComments] = useState([]);

  const IssueNumber = new URLSearchParams(window.location.search).get(
    "IssueNumber"
  );


  useEffect(() => {
    const page = (Math.floor(IssueNumber / 10) % 10) + 1; 


    if (localStorage.getItem("accessToken") !== null) {
      getUserData();
    } else {
      setUserData({ login: "Guest" });
    }

    if (Issue === undefined) {
      getIssues(page);
    }
    if (Issue !== undefined && Comments.length === 0) {
      getComments();
    }
    // console.log(Issue);
    // console.log(Comments);
  }, [rerender]);

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
        //setRerender(!rerender); // Uncomment this line if you want to re-render the component after fetching user data
        //console.log(data);
      });
  }

  // Fetch issue data from the server
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
        setIssue(data[IssueNumber]);
        setRerender(!rerender);
        //console.log(data);
      });
  }

  async function getComments() {
    //console.log(Issue.number);
    await fetch("http://localhost:4000/getIssueComments", {
      method: "GET",
      headers: {
        number: Issue.number,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setComments(data);
      });
  }

  return (
    <div className="PostPage">
      <Header name={userData.login} />
      <Post issue={Issue} />
      <Comment comments={Comments} />
    </div>
  );
}

export default PostPage;
