import React, { useEffect, useRef, useState, useCallback } from "react";
import { marked } from "marked";
import modal from "react-modal";
import Header from "../component/Header/Header";
import Hero from "../component/Hero/Hero";
import Content from "../component/Content/Content";
import "../App.css";

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

  // const markdown = `
  // # Heading 1

  // Some text here.

  // [name = Ewan]

  // >疫情不去意晴不來
  // > [name=匯吾]
  // > > 今日最佳發言
  // > > [name=櫛風]

  // |時間|細流|
  // |----|---|
  // |6.00 |[歐陽組](#歐陽組)帶目標去吃飯飯|
  // |6.00 |[佔位組](#佔位組)佔位置|
  // |6.30|[蛋糕組](#蛋糕組)去拿蛋糕|
  // |$X_{n}$|[歐陽組](#歐陽組)帶回來宿舍學餐，狀況不對（太吵被趕走、燈光不美氣氛不佳）的話回交誼廳（星星退隊）|
  // |$X_{n+1}$|蛋糕閃亮亮登場|
  // |$X_{n+2}$|[疫情組](#tip1)用【神奇道具】來遠端真情生日祝福|
  // |$X_{n+3}$|各回各家各找各媽（雖然其實都是宿舍幫）|
  // `;
  return (
    <div>
      <Header name={userData.login} />
      <Hero />
      <Content Issues={Issues} lastIssueElementRef={lastIssueElementRef} />
      {/* <div dangerouslySetInnerHTML={{ __html: marked(markdown) }} /> */}
    </div>
  );
}

export default Home;
