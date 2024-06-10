import React, { Dispatch, SetStateAction } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface LoginPanelProps {
  setShowLogInPanel: Dispatch<SetStateAction<Boolean>>;
}

export const LoginPanel: React.FC<LoginPanelProps> = (
  props: LoginPanelProps
) => {
  const { setShowLogInPanel } = props;

  return (
    <>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className=" text-sm">
          Email
        </label>
        <InputText id="email" aria-describedby="email-help" />
        <small id="email-help" className=" text-red-800">
          error
        </small>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className=" text-sm">
          Password
        </label>
        <InputText id="password" aria-describedby="password-help" />
        <small id="password-help" className=" text-red-800">
          error
        </small>
      </div>
      <Button label="Log in" className="w-full mt-2" />
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <span
          className="text-primary ml-1 cursor-pointer"
          onClick={() => setShowLogInPanel(false)}
        >
          Register
        </span>
      </p>
    </>
  );
};
