const signOutBtn = document.querySelector("#sign-out");
const profileBtn = document.querySelector("#profile");
const addCourseBtn = document.querySelector("#add-course");
const addCourseForm = document.querySelector(".add-course-form");
const overlay = document.querySelector(".overlay");
const coursesSlider = document.querySelector(".courses-list");
const coursesToJoinSlider = document.querySelector(".courses-to-join-list");
const leftArrowCourses = document.querySelector("#left-arrow-course");
const rightArrowCourses = document.querySelector("#right-arrow-course");
const leftArrowCoursesToJoin = document.querySelector(
  "#left-arrow-course-to-join"
);
const rightArrowCoursesToJoin = document.querySelector(
  "#right-arrow-course-to-join"
);
const allCourses = document.querySelectorAll(".course");
const allCoursesToJoin = document.querySelectorAll(".course-to-join");

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
  addCourseBtn.classList.remove("hidden");
  document.querySelectorAll(".section-label")[1].classList.add("hidden");
  document.querySelectorAll(".courses")[1].classList.add("hidden");
}

addCourseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addCourseForm.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

overlay.addEventListener("click", (e) => {
  e.preventDefault();
  addCourseForm.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});

signOutBtn.addEventListener("click", () => {
  signOut();
});

profileBtn.addEventListener("click", () => {
  window.location.href = "profile.html";
});

let curCourseSlide = 0,
  curCoursesToJoinSlide = 0;

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

leftArrowCoursesToJoin.addEventListener("click", (e) => {
  e.preventDefault();

  if (curCoursesToJoinSlide !== 0) {
    curCoursesToJoinSlide--;
    coursesToJoinSlider.style.transform = `translateX(-${
      curCoursesToJoinSlide * 420
    }px)`;
  }
});

rightArrowCoursesToJoin.addEventListener("click", (e) => {
  e.preventDefault();

  if (curCoursesToJoinSlide !== allCoursesToJoin.length - 1) {
    curCoursesToJoinSlide++;
    coursesToJoinSlider.style.transform = `translateX(-${
      curCoursesToJoinSlide * 420
    }px)`;
  }
});

allCourses.forEach((course) =>
  course.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "course.html";
  })
);
