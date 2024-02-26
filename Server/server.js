var express = require("express");
var cors = require("cors");
var { Octokit } = require("@octokit/core");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var bodyParser = require("body-parser");
const CLIENT_ID = "722ee22b46b4dbd64348";
const CLIENT_SECRET = "382ffd241addfe7e68ea5dd9949b703a2ec93336";

var app = express();

app.use(cors());

app.use(bodyParser.json());

//code being passed from the frontend
app.get("/getAccessToken", async function (req, res) {
  console.log(req.query.code);

  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;

  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

// get user data
// access token is going to be passed in as an Authorization header

app.get("/getUserData", async function (req, res) {
  req.get("Authorization"); //Bearer ACCESS_TOKEN

  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), // Bearer ACCESS_TOKEN
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

app.get("/getAllIssues", async function (req, res) {
  req.get("Authorization"); //Bearer ACCESS_TOKEN
  //console.log(req.get("Authorization"));
  const params =
    "?filter=all" + "&state=all" + "&sort=updated" + "&per_page=10" + "&page=1";
  await fetch("https://api.github.com/issues" + params, {
    method: "GET",
    headers: {
      Authorization: req.get("Authorization"), // Bearer ACCESS_TOKEN
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      res.json(data);
    });
});

app.get("/getIssue", async function (req, res) {});
app.listen(4000, () => {
  console.log("CORS Server is running on port 4000");
});
