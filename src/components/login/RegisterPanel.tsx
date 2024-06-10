import React, { Dispatch, SetStateAction } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

interface RegisterPanelProps {
  setShowLogInPanel: Dispatch<SetStateAction<Boolean>>;
}

export const RegisterPanel: React.FC<RegisterPanelProps> = (
  props: RegisterPanelProps
) => {
  const { setShowLogInPanel } = props;

  return (
    <>
      <p
        className="text-primary cursor-pointer"
        onClick={() => setShowLogInPanel(true)}
      >
        ← Back to Log in
      </p>

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
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className=" text-sm">
          Confirm Password
        </label>
        <InputText id="password" aria-describedby="password-help" />
        <small id="password-help" className=" text-red-800">
          error
        </small>
      </div>
    </>
  );
};
