import React, { useEffect, useRef, useState, useCallback } from "react";
import Header from "../component/Header/Header";
import Hero from "../component/Hero/Hero";
import Content from "../component/Content/Content";
import "../App.css";

function Home() {
  const baseUrl = process.env.PUBLIC_URL || "http://localhost:5173";
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({ login: "Guest" });
  const [Issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const code = new URLSearchParams(window.location.search).get("code");
  useEffect(() => {
    setLoading(true);
    getAccessToken(code);
    getUserData();
    setLoading(false);
    console.log(userData);
  }, [rerender]);

  useEffect(() => {
    getIssues(page);
  }, [page, rerender]);

  async function getAccessToken(code) {
    if (localStorage.getItem("accessToken") === null && code !== null) {
      await fetch(baseUrl + "/getAccessToken?code=" + code, {
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
  }

  async function getUserData() {
    if (userData.login === "Guest" && localStorage.getItem("accessToken")) {
      await fetch(baseUrl + "/getUserData", {
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
          setRerender(!rerender);
          //console.log(data);
        });
    }
  }

  async function getIssues(page) {
    if (localStorage.getItem("accessToken")) {
      await fetch(baseUrl + "/getIssues", {
        method: "GET",
        headers: {
          page: page,
          Authorization: localStorage.getItem("accessToken"),
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (page === 1)
            setIssues(data); // set data when page is 1 (initial load
          else setIssues((prevIssues) => [...prevIssues, ...data]); // append data when scrolling
          console.log(data);
        });
    }
  }

  const observer = useRef();
  const lastIssueElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div>
      <Header name={userData.login} />
      <Hero />
      <Content
        Issues={Issues}
        name={userData.login}
        lastIssueElementRef={lastIssueElementRef}
      />
    </div>
  );
}

export default Home;
