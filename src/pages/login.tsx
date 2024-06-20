import React, { useState } from "react";
import { MainWrapper } from "@/components/MainWrapper";
import { LoginPanel } from "@/components/login/LogInPanel";
import { RegisterPanel } from "@/components/login/RegisterPanel";

export default function Login() {
  const [showLogInPanel, setShowLogInPanel] = useState<Boolean>(true);
  return (
    <MainWrapper title={showLogInPanel ? "Log In" : "Register"} showBG>
      <h1
        className="pt-12 text-6xl text-primary font-extrabold text-center"
        style={{
          textShadow:
            "0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 8px #fff, 0 0 10px #fff, 0 0 12px #fff",
        }}
      >
        Welcome back!
      </h1>
      <div className="border-secondary bg-white border-2 max-w-[480px] p-8 m-auto rounded-md mt-8">
        {showLogInPanel ? (
          <LoginPanel setShowLogInPanel={setShowLogInPanel} />
        ) : (
          <RegisterPanel setShowLogInPanel={setShowLogInPanel} />
        )}
      </div>
    </MainWrapper>
  );
}
