import React, { useEffect, useState } from "react";
import { MainWrapper } from "@/components/MainWrapper";
import { API_MESSAGES } from "@/utils/consts";
import { getCurrentUser } from "@/utils/authFunctions";

export default function Settings() {
  const [userInfo, setUserInfo] = useState<string>("");

  useEffect(() => {
    const currentUser = getCurrentUser();

    if (currentUser) {
      fetch(`/api/user?userId=${currentUser.userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.message === API_MESSAGES.success) {
            setUserInfo(JSON.stringify(data));
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <MainWrapper title="Settings">
      <div className="mt-24">{userInfo}</div>
    </MainWrapper>
  );
}
