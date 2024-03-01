import React, { useEffect, useRef, useState, useCallback } from "react";
import modal from "react-modal";
import Header from "../component/Header/Header";
import Hero from "../component/Hero/Hero";
import Content from "../component/Content/Content";
import "../App.css";
import MyModal from "../component/Modal/MyModal";
function Home() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});
  const [Issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    const code = new URLSearchParams(window.location.search).get("code");
    if (localStorage.getItem("accessToken") === null && code !== null) {
      getAccessToken(code);
    }
    if (
      (userData.login === undefined || userData.login === "Guest") &&
      localStorage.getItem("accessToken")
    ) {
      getUserData();
      // console.log("getUserData");
    }
    if (
      userData.login === undefined &&
      localStorage.getItem("accessToken") === null
    ) {
      setUserData({ login: "Guest" });
      // console.log("Guest");
    }
    if (Issues.length === 0) {
      setPage(1);
      // console.log("setPage1");
    }
    // console.log("rerender");
    setLoading(false);
  }, [rerender]);

  useEffect(() => {
    if (page !== 0) {
      getIssues(page); //calling API
      // if (page === 1) {
      //   setRerender(!rerender);
      // }
    }
  }, [page]);

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
        setRerender(!rerender);
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
        setIssues((prevIssues) => [...prevIssues, ...data]);
        console.log(data);
      });
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
      <Content Issues={Issues} lastIssueElementRef={lastIssueElementRef} />
      <MyModal />
    </div>
  );
}

export default Home;
