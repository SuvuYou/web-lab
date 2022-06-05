const signOutBtn = document.querySelector("#sign-out");
const dashboardBtn = document.querySelector("#dashboard");
const coursesSlider = document.querySelector(".courses-list");
const requestsSlider = document.querySelector(".requests-list");
const leftArrowCourses = document.querySelector("#left-arrow-course");
const rightArrowCourses = document.querySelector("#right-arrow-course");
const leftArrowRequests = document.querySelector("#left-arrow-request");
const rightArrowRequests = document.querySelector("#right-arrow-request");
const allCourses = document.querySelectorAll(".course");
const allRequests = document.querySelectorAll(".request");

const inputLabel = document.querySelector(".label");
//inputs
const subjectInput = document.querySelector("#subject-name-input");

//buttons
const submitBtn = document.querySelector(".submit-button");
const deleteBtn = document.querySelector(".delete-button");

const BASE = "http://127.0.0.1:5000/";

let userData = {};

function signOut() {
  localStorage.removeItem("lab-token");
  localStorage.removeItem("lab-user");
  window.location.href = "login.html";
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

if (user.type === "professor") {
  submitBtn.classList.remove("hidden");
  deleteBtn.classList.remove("hidden");
  subjectInput.classList.remove("hidden");
  inputLabel.classList.remove("hidden");
}

signOutBtn.addEventListener("click", () => {
  signOut();
});

dashboardBtn.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});
