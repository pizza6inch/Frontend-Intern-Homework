import React, { useState, useEffect } from "react";
import Header from "../component/Header/Header";
import Post from "../component/Post/Post";
import Comment from "../component/Comment/Comment";
import { fetchUserData, fetchIssue, fetchIssues, fetchComment } from "../api";

function PostPage() {
  const [Issue, setIssue] = useState(undefined);
  const [userData, setUserData] = useState({ login: "Guest" });
  const [Comments, setComments] = useState([undefined]);
  const IssueNumber = new URLSearchParams(window.location.search).get(
    "IssueNumber"
  );

  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      fetchUserData().then((data) => {
        if (data) setUserData(data);
      });
    } else {
      prompt("Please login first");
      window.location.href = window.location.origin + "/login";
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      fetchIssue(IssueNumber).then((data) => {
        if (data) setIssue(data);
      });
      fetchComment(IssueNumber).then((data) => {
        if (data) setComments(data);
      });
    } else {
      prompt("Please login first");
      window.location.href = window.location.origin + "/login";
    }
  }, []);

  return (
    <div className="PostPage">
      <Header name={userData.login} />
      <Post issue={Issue} userData={userData} />
      <Comment comments={Comments} />
    </div>
  );
}

export default PostPage;
