import { all } from "axios";
import React, { useEffect, useState } from "react";
import Header from "../component/Header/Header";
import Hero from "../component/Hero/Hero";
import Content from "../component/Content/Content";
import Post from "../component/Post/Post";
import "../App.css";
function Page1() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});
  const [allIssue, setAllIssue] = useState([]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      getAccessToken(code);
    }
    if (localStorage.getItem("accessToken")) {
      getUserData();
      getAllIssue();
    }
  }, [rerender]);

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
          //console.log(data);
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

  return (
    <div className="Page1">
      <Header name={userData.login} />
      <Hero />
      <Content Issues={allIssue} />
    </div>
  );
}

export default Page1;
