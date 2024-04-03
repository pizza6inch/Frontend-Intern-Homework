import React, { useEffect, useRef, useState, useCallback } from "react";
import Header from "../component/Header/Header";
import Hero from "../component/Hero/Hero";
import Content from "../component/Content/Content";
import "../App.css";
import { fetchAccessToken, fetchUserData, fetchIssues } from "../api";

function Home() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({ login: "Guest" });
  const [Issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const code = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null && code !== null) {
      fetchAccessToken(code).then((data) => {
        if (data.access_token) {
          localStorage.setItem("accessToken", data.access_token);
          setRerender(!rerender);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (userData.login === "Guest" && localStorage.getItem("accessToken")) {
      fetchUserData().then((data) => {
        if (data) setUserData(data);
      });
    }
  }, [rerender]);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("accessToken")) {
      fetchIssues(page).then((data) => {
        if (page === 1) setIssues(data);
        else setIssues((prevIssues) => [...prevIssues, ...data]);
      });
    }
    setLoading(false);
  }, [page, rerender]);

  const observer = useRef(); // IntersectionObserver used to implement infinite scrolling
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
    </div>
  );
}

export default Home;
