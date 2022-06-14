import { useState } from "react";

export default function useAuth() {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  return {
    message,
    showMessage,
    setMessage,
    setShowMessage,
  };
}
