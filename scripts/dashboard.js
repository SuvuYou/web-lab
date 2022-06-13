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
let allCourses = document.querySelectorAll(".course-active");
let allCoursesToJoin = document.querySelectorAll(".course-to-join-active");

const BASE = "http://127.0.0.1:5000/";

function toggleForm() {
  addCourseForm.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}

function onCreateCourseSubmit(user, token) {
  const courseName = addCourseForm.querySelector("input").value;

  if (courseName.trim() !== "") {
    const endpoint = `${BASE}courses/0`;

    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ subject: courseName, professor_id: user.id }),
    });

    addCourseForm.querySelector("input").value = "";
    toggleForm();
  }
}

function createCourseElement(
  subject,
  first_name,
  last_name,
  isCourse = true,
  request = {},
  disabled = false
) {
  const sendRequest = request.status ? false : true;
  const c = document.createElement("div");
  const classNameMNodifier = isCourse ? "course" : "course-to-join";
  c.classList.add(classNameMNodifier);
  c.classList.add(disabled && "over");
  c.classList.add(!disabled && `${classNameMNodifier}-active`);
  const courseContent = `
    <img src="./images/${classNameMNodifier}-mild-pink.png" alt="${classNameMNodifier}" />
    ${
      !isCourse
        ? `<button class="request-btn ${!sendRequest && "request-sended"}">${
            sendRequest ? "Send Request" : "Request sended"
          }</button>`
        : ""
    }
    <div class="${classNameMNodifier}-info">
      <span class="subject-name">${subject}</span>
      <span class="professor-name">${first_name} ${last_name}</span>
    </div>
    ${disabled ? '<p class="disabled-text">Add Course</p>' : ""}
  `;

  c.innerHTML = courseContent;

  return c;
}

function recalculateCourses() {
  allCourses = document.querySelectorAll(".course-active");
  allCoursesToJoin = document.querySelectorAll(".course-to-join-active");

  allCourses.forEach((course) =>
    course.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "course.html";
    })
  );
}

function signOut() {
  localStorage.removeItem("lab-token");
  localStorage.removeItem("lab-user");
  window.location.href = "login.html";
}

async function fetchCourses(token) {
  const endpoint = `${BASE}courses_list`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  const { free, joined } = await res.json();

  if (joined.length === 0) {
    if (user.type === "student") {
      document.querySelectorAll(".section-label")[0].classList.add("hidden");
      document
        .querySelector(".courses-list")
        .parentElement.classList.add("hidden");
    }

    if (user.type === "professor") {
      const elem = createCourseElement("", "", "", true, {}, true);

      coursesSlider.append(elem);

      elem.addEventListener("click", (e) => {
        e.preventDefault();
        toggleForm();
      });
    }
  }

  if (free.length === 0) {
    document.querySelectorAll(".section-label")[1].classList.add("hidden");
    document
      .querySelector(".courses-to-join-list")
      .parentElement.classList.add("hidden");
  }

  joined.forEach((course) => {
    const element = createCourseElement(
      course.subject,
      course.professor.first_name,
      course.professor.last_name
    );

    coursesSlider.append(element);
  });

  free.forEach((course) => {
    const element = createCourseElement(
      course.subject,
      course.professor.first_name,
      course.professor.last_name,
      false,
      course.request
    );

    coursesToJoinSlider.append(element);
  });

  recalculateCourses();
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
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });

  const data = await res.json();

  if (data.message) {
    return signOut();
  }
}

const token = localStorage.getItem("lab-token");
const user = JSON.parse(localStorage.getItem("lab-user"));

checkLogin(token, user);

fetchCourses(token);

if (user.type === "professor") {
  addCourseBtn.classList.remove("hidden");
  document.querySelectorAll(".section-label")[1].classList.add("hidden");
  document.querySelectorAll(".courses")[1].classList.add("hidden");
}

addCourseBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForm();
});

overlay.addEventListener("click", (e) => {
  e.preventDefault();
  toggleForm();
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

addCourseForm
  .querySelector(".add-course-button")
  .addEventListener("click", () => {
    onCreateCourseSubmit(user, token);
  });
