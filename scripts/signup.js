const BASE = "http://127.0.0.1:5000";

function handleError(message) {
  const component = document.querySelector(".error-message");
  component.textContent = message;
  component.classList.remove("hidden");
}

async function signUp(user, userType) {
  const endpoint =
    userType === "student" ? `${BASE}/students/0` : `${BASE}/professors/0`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  const data = await res.json();
  if (data.message) {
    handleError(data.message);
  } else if (data) {
    window.location.href = "login.html";
  }
}

const isFieldValidated = (value) => value.trim() !== "";

function validateUserInput(user, userType) {
  return (
    isFieldValidated(user.first_name) &&
    isFieldValidated(user.last_name) &&
    isFieldValidated(user.password) &&
    isFieldValidated(user.email) &&
    (userType === "student"
      ? isFieldValidated(user["GPA"])
      : isFieldValidated(user.subject))
  );
}

const form = document.querySelector(".signup-form");
const firstInput = document.querySelector("#first-name");
const lastInput = document.querySelector("#last-name");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const emailInput = document.querySelector("#email");
const studentRadio = document.querySelector("#student");
const professorRadio = document.querySelector("#professor");
const gpaInput = document.querySelector("#gpa");
const subjectInput = document.querySelector("#subject");
const signupBtn = document.querySelector("#signup-btn");

const token = localStorage.getItem("lab-token");

if (token) {
  window.location.href = "dashboard.html";
}

signupBtn.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("click");
  const userType = studentRadio.checked ? "student" : "professor";
  const confirmPassword = confirmPasswordInput.value;

  const user = {
    first_name: firstInput.value,
    last_name: lastInput.value,
    password: passwordInput.value,
    email: emailInput.value,
  };

  if (userType === "student") {
    user.iq = 100;
    user["GPA"] = gpaInput.value;
  } else {
    user.subject = subjectInput.value;
  }

  if (!validateUserInput(user, userType)) {
    return handleError("All fields are required");
  }

  if (user.password !== confirmPassword) {
    return handleError("Passwords don't match");
  }

  document.querySelector(".error-message").classList.add("hidden");
  signUp(user, userType);
});

function completeForm(isStudentForm) {
  if (isStudentForm) {
    document.querySelector("#gpa").value = "";
    document.querySelector("#gpa").parentElement.classList.remove("hidden");
    document.querySelector("#subject").parentElement.classList.add("hidden");
  } else {
    document.querySelector("#subject").value = "";
    document.querySelector("#gpa").parentElement.classList.add("hidden");
    document.querySelector("#subject").parentElement.classList.remove("hidden");
  }
}

studentRadio.addEventListener("change", () => {
  completeForm(true);
});

professorRadio.addEventListener("change", () => {
  completeForm(false);
});
