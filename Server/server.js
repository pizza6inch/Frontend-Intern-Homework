var express = require("express");
var cors = require("cors");
var { Octokit } = require("@octokit/core");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
var bodyParser = require("body-parser");
const CLIENT_ID = "722ee22b46b4dbd64348";
const CLIENT_SECRET = "382ffd241addfe7e68ea5dd9949b703a2ec93336";
const BLOG_ACCESS_TOKEN =
  "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";
// need to be updated after Thu, Mar 27 2025. after that, the token will be invalid
var app = express();

app.use(cors());

app.use(bodyParser.json());

//code being passed from the frontend
app.get("/getAccessToken", async function (req, res) {
  //console.log(req.query.code);

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
      //console.log(response);
      return response.json();
    })
    .then((data) => {
      //console.log(data);
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
      //console.log(data);
      res.json(data);
    });
});

app.get("/getIssues", async function (req, res) {
  req.get("page");
  //console.log(req.get("page"));

  //console.log(req.get("Authorization"));
  const params =
    "?sort=number" +
    "&direction=asc" +
    "&per_page=10" +
    "&page=" +
    req.get("page");
  await fetch(
    "https://api.github.com/repos/pizza6inch/Github-Blog/issues" + params,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + BLOG_ACCESS_TOKEN, // Bearer ACCESS_TOKEN
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      res.json(data);
    });
});

app.get("/getIssue", async function (req, res) {
  await fetch(
    "https://api.github.com/repos/pizza6inch/Github-Blog/issues/" +
      req.get("number"),
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + BLOG_ACCESS_TOKEN, // Bearer ACCESS_TOKEN
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      res.json(data);
    });
});

app.get("/getIssueComments", async function (req, res) {
  req.get("number");
  //console.log(req.get("number"));
  await fetch(
    "https://api.github.com/repos/pizza6inch/Github-Blog/issues/" +
      req.get("number") +
      "/comments",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + BLOG_ACCESS_TOKEN, // Bearer ACCESS_TOKEN
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      res.json(data);
    });
});

app.post("/AddIssue", async function (req, res) {
  req.get("Authorization");
  req.get("body");
  const data = req.get("body");
  //console.log(data);
  await fetch("https://api.github.com/repos/pizza6inch/Github-Blog/issues", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + req.get("Authorization"), // Bearer ACCESS_TOKEN
    },
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      res.json(data);
    });
});

app.post("/updateIssue", async function (req, res) {
  req.get("Authorization");
  req.get("number");
  const issueData = req.get("body");
  //console.log(issueData);
  await fetch(
    "https://api.github.com/repos/pizza6inch/Github-Blog/issues/" +
      req.get("number"),
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + req.get("Authorization"), // Bearer ACCESS_TOKEN
      },
      body: issueData,
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      res.json(data);
    });
});

app.post("/closeIssue", async function (req, res) {
  req.get("number");
  req.get("Authorization");
  await fetch(
    "https://api.github.com/repos/pizza6inch/Github-Blog/issues/" +
      req.get("number"),
    {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + req.get("Authorization"), // Bearer ACCESS_TOKEN
      },
      body: JSON.stringify({ state: "closed" }),
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //console.log(data);
      res.json(data);
    });
});

app.listen(4000, () => {
  console.log("CORS Server is running on port 4000");
});
