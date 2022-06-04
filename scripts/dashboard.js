const btn = document.querySelector(".sign-out");
const BASE = "http://127.0.0.1:5000/";

let userData = {};

btn.addEventListener("click", () => {
  localStorage.removeItem("lab-token");
  localStorage.removeItem("lab-user");
  window.location.href = "login.html";
});

function signOut() {
  // localStorage.removeItem("lab-token");
  // localStorage.removeItem("lab-user");
  // window.location.href = "login.html";
}

async function checkLogin(token, user) {
  if (!token || !user) {
    return signOut();
  }

  const endpoint =
    user.type === "student"
      ? `${BASE}students/${user.id}`
      : `${BASE}professors/${user.id}`;

  const res = await fetch(endpoint, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

  const data = await res.json();

  if (data.message) {
    return signOut();
  }

  userData = data;
}

const token = localStorage.getItem("lab-token");
const user = JSON.parse(localStorage.getItem("lab-user"));

checkLogin(token, user);
