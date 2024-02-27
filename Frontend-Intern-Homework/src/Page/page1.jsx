import React, { useEffect, useRef, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll";
import Header from "../component/Header/Header";
import Hero from "../component/Hero/Hero";
import Content from "../component/Content/Content";
import Post from "../component/Post/Post";
import "../App.css";
function Page1() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});
  const [Issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) {
      getAccessToken(code);
    }
    if (localStorage.getItem("accessToken")) {
      getUserData();
      setPage(1);
    }
    setLoading(false);
  }, [rerender]);

  useEffect(() => {
    if (localStorage.getItem("accessToken") && page !== 0) {
      getIssues(page); //calling API
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
        //console.log(data);
      });
  }

  async function getIssues(page) {
    await fetch("http://localhost:4000/getIssues", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        page: page,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIssues((prevIssues) => [...prevIssues, ...data]);
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
    <div className="Page1">
      <Header name={userData.login} />
      <Hero />
      {/* <Content Issues={Issues} /> */}
      {Issues.map((Issue, i) => {
        if (Issues.length === i + 1) {
          return (
            <div key={i} ref={lastIssueElementRef}>
              <Post
                number={i}
                title={Issue.title}
                state={Issue.state}
                body={Issue.body}
              ></Post>
            </div>
          );
        } else {
          return (
            <Post
              number={i}
              title={Issue.title}
              state={Issue.state}
              body={Issue.body}
            ></Post>
          );
        }
      })}
      <div>{loading && "loading..."}</div>
    </div>
  );
}

export default Page1;
