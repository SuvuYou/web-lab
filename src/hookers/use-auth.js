import { useState, useEffect } from "react";

const BASE = "http://127.0.0.1:5000/";

export default function useAuth() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("lab-user"))
  );

  const [token, setToken] = useState(localStorage.getItem("lab-token"));

  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("lab-user");
    localStorage.removeItem("lab-token");
  };

  const logIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("lab-user", JSON.stringify(user));
    localStorage.setItem("lab-token", token);
  };

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

  useEffect(() => {
    checkLogin(token, user);
  }, []);

  return { user, token, signOut, logIn };
}
