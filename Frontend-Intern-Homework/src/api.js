// api.js

const serverURL = "http://localhost:4000";
//const baseURL = Window.location.origin;
export async function fetchAccessToken(code) {
  const response = await fetch(`${serverURL}/getAccessToken?code=${code}`, {
    method: "GET",
  });

  const data = await response.json();
  // console.log(data);
  return data;
}

export async function fetchUserData() {
  const response = await fetch(`${serverURL}/getUserData`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchIssues(page) {
  const response = await fetch(`${serverURL}/getIssues`, {
    method: "GET",
    headers: {
      page: page,
      Authorization: localStorage.getItem("accessToken"),
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchIssue(IssueNumber) {
  const response = await fetch(`${serverURL}/getIssue`, {
    method: "GET",
    headers: {
      number: IssueNumber,
      Authorization: localStorage.getItem("accessToken"),
    },
  });

  const data = await response.json();
  return data;
}

export async function updateIssue(title, body, IssueNumber) {
  const response = await fetch(`${serverURL}/updateIssue`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      number: IssueNumber,
      body: JSON.stringify({ title, body }),
    },
  });

  const data = await response.json();
  return data;
}

export async function addIssue(title, body) {
  const response = await fetch(`${serverURL}/AddIssue`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      body: JSON.stringify({ title, body }),
    },
  });

  const data = await response.json();
  return data;
}

export async function closeIssue(number) {
  const response = await fetch(`${serverURL}/closeIssue`, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      number: number,
    },
  });

  const data = await response.json();
  return data;
}

export async function fetchComment(number) {
  const response = await fetch(`${serverURL}/getIssueComments`, {
    method: "GET",
    headers: {
      number: number,
      Authorization: localStorage.getItem("accessToken"),
    },
  });

  const data = await response.json();
  return data;
}
