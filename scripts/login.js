const BASE = "http://127.0.0.1:5000/login";

function handleError(message) {
  const component = document.querySelector(".error-message");
  component.textContent = message;
  component.classList.remove("hidden");
}

async function login(email, password) {
  const res = await fetch(BASE, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + btoa(`${email}:${password}`),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  const data = await res.json();

  if (data.message) {
    handleError(data.message);
  }

  if (data.token && data.token !== "") {
    localStorage.setItem("lab-token", data.token);
    localStorage.setItem("lab-user", JSON.stringify(data.user));
    window.location.href = "dashboard.html";
  }
}

const isFieldValidated = (value) => value.trim() !== "";

const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector("#login-btn");

const token = localStorage.getItem("lab-token");

if (token) {
  window.location.href = "dashboard.html";
}

loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!isFieldValidated(email) || !isFieldValidated(password)) {
    return handleError("All fields are required");
  }

  document.querySelector(".error-message").classList.add("hidden");
  login(email, password);
});
