import React, { useEffect, useState } from "react";
import { MainWrapper } from "@/components/MainWrapper";
import { API_MESSAGES } from "@/utils/consts";

export default function Settigns() {
  const [userInfo, setUserInfo] = useState<string>("");
  useEffect(() => {
    fetch(`/api/user?userId=${12}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === API_MESSAGES.success) {
          setUserInfo(JSON.stringify(data));
          
        }
      });
  }, []);


  return (
    <MainWrapper title="Settings">
      <div className="mt-24">{userInfo}</div>
    </MainWrapper>
  );
}
