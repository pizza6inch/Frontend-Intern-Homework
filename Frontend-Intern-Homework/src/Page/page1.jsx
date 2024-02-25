import { all } from "axios";
import React, { useEffect, useState } from "react";

function Page1() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});
  const [allIssue, setAllIssue] = useState([]);

  useEffect(() => {
    getUserData();
    getAllIssue();
  }, [rerender]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    //console.log(code);
    //console.log(localStorage.getItem("accessToken"));
    getAccessToken(code);
    getUserData();
    getAllIssue();
  }, []);

  async function getAccessToken(code) {
    await fetch("http://localhost:4000/getAccessToken?code=" + code, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          setRerender(!rerender);
        }
      });
  }

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
        //console.log(data);
      });
  }

  async function logout() {
    localStorage.removeItem("accessToken");
    window.location.replace("http://localhost:5173");
  }

  async function getAllIssue() {
    await fetch("http://localhost:4000/getAllIssues", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        //console.log(data[0].title);
        setAllIssue(data);
      });
  }

  const Issues = allIssue.map((row, rowIndex) => {
    const { title, body } = row;
    return (
      <div key={rowIndex}>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    );
  });

  return (
    <div>
      <h1>Nice! {userData.login}</h1>
      <button onClick={getAllIssue}>Click me</button>
      <h1>this is Issues</h1>
      <div>{Issues}</div>
    </div>
  );
}

export default Page1;
