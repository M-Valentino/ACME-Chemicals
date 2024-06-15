import React, { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sessionInfo");
      window.open("/", "_self");
    }
  }, []);

  return <div></div>;
}
