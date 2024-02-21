import React, { useEffect, useState } from "react";

function Page1() {
  const [rerender, setRerender] = useState(false);
  const [userData, setUserData] = useState({});
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    const accessToken = localStorage.getItem("accessToken");

    // local storage
    if (code && accessToken === null) {
      getAccessToken(code);
    } else if (code === null && accessToken === null) {
      window.location.replace("http://localhost:5173");
    }
    if (accessToken) {
      getUserData();
    }
    // console.log(code);
    // console.log(localStorage.getItem("accessToken"));
    // console.log(userData.login);
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
          getUserData();
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
      });
  }

  return (
    <div>
      <h1>Nice! {userData.login}</h1>
    </div>
  );
}

export default Page1;
