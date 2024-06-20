import React, { useEffect, useState } from "react";
import { MainWrapper } from "@/components/MainWrapper";
import { API_MESSAGES } from "@/utils/consts";
import { getCurrentUser } from "@/utils/authFunctions";

export default function Admin() {
  const [userInfo, setUserInfo] = useState<{
    id: number;
    name: string;
    email: string;
    isadmin: boolean;
  }>({ id: -1, name: "", email: "", isadmin: false });

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
            setUserInfo(data.data);
            console.log(data);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

  return (
    <MainWrapper title="Admin">
      {userInfo.isadmin && <div className="mt-24">admin</div>}
    </MainWrapper>
  );
}
