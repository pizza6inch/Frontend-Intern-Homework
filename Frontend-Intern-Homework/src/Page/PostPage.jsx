import React, { useState, useEffect } from "react";
import Header from "../component/Header/Header";
import Post from "../component/Post/Post";
import Comment from "../component/Comment/Comment";
import math from "math"; // I'm assuming this is a typo and you meant to import the 'math' library as 'Math'

function PostPage() {
  // State variable to store the issue data
  const [Issue, setIssue] = useState(undefined);
  // State variable to store the user data
  const [userData, setUserData] = useState([]);
  // State variable to control re-rendering of the component
  const [rerender, setRerender] = useState(false);
  const [Comments, setComments] = useState([]);

  // Get the 'number' parameter from the URL search parameters
  const IssueNumber = new URLSearchParams(window.location.search).get(
    "IssueNumber"
  );

  // useEffect hook to fetch data when the component mounts and whenever the 'rerender' state changes
  useEffect(() => {
    const page = (Math.floor(IssueNumber / 10) % 10) + 1; // Calculate the page number based on the 'number' parameter

    // Check if there's a valid access token in local storage
    if (localStorage.getItem("accessToken") !== null) {
      getUserData();
    } else {
      setUserData({ login: "Guest" });
    }

    // If 'Issue' is undefined (meaning we haven't fetched issue data yet), fetch it
    if (Issue === undefined) {
      getIssues(page);
    }
    if (Issue !== undefined && Comments.length === 0) {
      getComments();
    }
    // console.log(Issue);
    // console.log(Comments);
    // eslint-disable-next-line
  }, [rerender]);

  // Fetch user data from the server
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
