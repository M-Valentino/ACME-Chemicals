import React, { useEffect, useState } from "react";
import { API_MESSAGES } from "@/utils/consts";

export default function Logout() {
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch(`/api/auth`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== API_MESSAGES.success) {
          setError(
            "Error logging you out. Please delete all cookies for this site."
          );
        }
        window.open("/", "_self");
      });
  }, []);

  return <div className="text-3xl text-red-800">{error}</div>;
}
