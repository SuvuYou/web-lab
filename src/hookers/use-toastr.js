import { useState } from "react";

export default function useToastr() {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  return {
    message,
    showMessage,
    setMessage,
    setShowMessage,
  };
}
