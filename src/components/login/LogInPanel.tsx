import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { emailIsInvalid, emailIsTooLong } from "@/utils/validations";

interface LoginPanelProps {
  setShowLogInPanel: Dispatch<SetStateAction<Boolean>>;
}

export const LoginPanel: React.FC<LoginPanelProps> = (
  props: LoginPanelProps
) => {
  const { setShowLogInPanel } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailIsTooLong(email)) {
      alert("Email is too long.");
    } else if (emailIsInvalid(email)) {
      alert("Email is not valid.");
    } else {
      // Handle form submission logic here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className=" text-sm">
          Email
        </label>
        <InputText
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby="email-help"
        />
        <small id="email-help" className=" text-red-800">
          error
        </small>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className=" text-sm">
          Password
        </label>
        <InputText
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-describedby="password-help"
        />
        <small id="password-help" className=" text-red-800">
          error
        </small>
      </div>
      <Button label="Log in" className="w-full mt-2" type="submit" />
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <span
          className="text-primary ml-1 cursor-pointer"
          onClick={() => setShowLogInPanel(false)}
        >
          Register
        </span>
      </p>
    </form>
  );
};
