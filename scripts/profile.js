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

// inputs
const gpaInput = document.querySelector("#gpa");
const subjectInput = document.querySelector("#subject");

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
  gpaInput.parentElement.classList.add("hidden");
  subjectInput.parentElement.classList.remove("hidden");
}

signOutBtn.addEventListener("click", () => {
  signOut();
});

dashboardBtn.addEventListener("click", () => {
  window.location.href = "dashboard.html";
});

let curCourseSlide = 0,
  curRequestsSlide = 0;

leftArrowCourses.addEventListener("click", (e) => {
  e.preventDefault();

  if (curCourseSlide !== 0) {
    curCourseSlide--;
    coursesSlider.style.transform = `translateX(-${curCourseSlide * 420}px)`;
  }
});

rightArrowCourses.addEventListener("click", (e) => {
  e.preventDefault();

  if (curCourseSlide !== allCourses.length - 1) {
    curCourseSlide++;
    coursesSlider.style.transform = `translateX(-${curCourseSlide * 420}px)`;
  }
});

leftArrowRequests.addEventListener("click", (e) => {
  e.preventDefault();

  if (curRequestsSlide !== 0) {
    curRequestsSlide--;
    requestsSlider.style.transform = `translateX(-${curRequestsSlide * 420}px)`;
  }
});

rightArrowRequests.addEventListener("click", (e) => {
  e.preventDefault();

  if (curRequestsSlide !== allRequests.length - 1) {
    curRequestsSlide++;
    requestsSlider.style.transform = `translateX(-${curRequestsSlide * 420}px)`;
  }
});

allCourses.forEach((course) =>
  course.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "course.html";
  })
);
