const signOutBtn = document.querySelector("#sign-out");
const dashboardBtn = document.querySelector("#dashboard");
const coursesSlider = document.querySelector(".courses-list");
const requestsSlider = document.querySelector(".requests-list");
const leftArrowCourses = document.querySelector("#left-arrow-course");
const rightArrowCourses = document.querySelector("#right-arrow-course");
const leftArrowRequests = document.querySelector("#left-arrow-request");
const rightArrowRequests = document.querySelector("#right-arrow-request");
let allCourses = document.querySelectorAll(".course");
let allRequests = document.querySelectorAll(".request");

// inputs
const gpaInput = document.querySelector("#gpa");
const subjectInput = document.querySelector("#subject");

const BASE = "http://127.0.0.1:5000/";

function createCourseElement(subject, first_name, last_name) {
  const c = document.createElement("div");
  c.classList.add("course");

  const courseContent = `
    <img src="./images/course-mild-pink.png" alt=course" />
    <div class="course-info">
      <span class="subject-name">${subject}</span>
      <span class="professor-name">${first_name} ${last_name}</span>
    </div>
  `;

  c.innerHTML = courseContent;

  return c;
}

function createRequestElement(
  subject,
  first_name,
  last_name,
  student_name,
  is_student,
  status = "pending"
) {
  const c = document.createElement("div");
  c.classList.add("request");

  const courseContent = `
    <img src="./images/request-mild-pink.png" alt="request" />
    <div class="request-info">
      <span class="subject-name">${subject}</span>
      <span class="professor-name">${first_name} ${last_name}</span>
    </div>
    ${
      !is_student
        ? ` <div class="request-form">
    <span class="student-name">${student_name}</span>
    <button class="request-form-btn" id="approve">Approve</button>
    <button class="request-form-btn" id="reject">Reject</button>
  </div>`
        : `<span class="status--${status}">${status}</span>`
    }
  `;

  c.innerHTML = courseContent;

  return c;
}

function recalculateCourses() {
  allCourses = document.querySelectorAll(".course");
  allRequests = document.querySelectorAll(".request");

  allCourses.forEach((course) =>
    course.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "course.html";
    })
  );
}

async function fetchCourses(token) {
  const endpoint1 = `${BASE}courses_list`;
  const endpoint2 = `${BASE}requests_list`;

  const [res, res2] = await Promise.all([
    fetch(endpoint1, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }),

    fetch(endpoint2, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }),
  ]);

  const { requests } = await res2.json();

  const { joined } = await res.json();

  if (joined.length === 0) {
    document.querySelectorAll(".section-label")[1].classList.add("hidden");
    document
      .querySelector(".courses-list")
      .parentElement.classList.add("hidden");
  }

  if (requests.length === 0) {
    document.querySelectorAll(".section-label")[2].classList.add("hidden");
    document
      .querySelector(".requests-list")
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

  requests.forEach((request) => {
    const element = createRequestElement(
      request.course.subject,
      request.course.professor.first_name,
      request.course.professor.last_name,
      `${request.student.first_name} ${request.student.last_name}`,
      user.type === "student",
      request.status
    );

    requestsSlider.append(element);
  });

  recalculateCourses();
}

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
}

const token = localStorage.getItem("lab-token");
const user = JSON.parse(localStorage.getItem("lab-user"));

checkLogin(token, user);

if (user.type === "professor") {
  gpaInput.parentElement.classList.add("hidden");
  subjectInput.parentElement.classList.remove("hidden");
}

fetchCourses(token);

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
