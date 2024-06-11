import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {
  emailIsInvalid,
  emailIsTooLong,
  passwordLengthIsInvalid,
} from "@/utils/validations";

interface LoginPanelProps {
  setShowLogInPanel: Dispatch<SetStateAction<Boolean>>;
}

export const LoginPanel: React.FC<LoginPanelProps> = (
  props: LoginPanelProps
) => {
  const { setShowLogInPanel } = props;
  const [email, setEmail] = useState<{ value: string; error: string }>({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState<{ value: string; error: string }>({
    value: "",
    error: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (emailIsInvalid(email.value) || emailIsTooLong(email.value)) {
      setEmail({ ...email, error: "Email is invalid." });
    } else {
      setEmail({ ...email, error: "" });
    }
    if (passwordLengthIsInvalid(password.value)) {
      setPassword({ ...password, error: "Password is invalid." });
    } else {
      setPassword({ ...password, error: "" });
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
          value={email.value}
          onChange={(e) => setEmail({ ...email, value: e.target.value })}
          aria-describedby="email-help"
        />
        <small id="email-help" className=" text-red-800">
          {email.error}
        </small>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className=" text-sm">
          Password
        </label>
        <InputText
          id="password"
          type="password"
          value={password.value}
          onChange={(e) => setPassword({ ...password, value: e.target.value })}
          aria-describedby="password-help"
        />
        <small id="password-help" className=" text-red-800">
          {password.error}
        </small>
      </div>
      <Button label="Log in" className="w-full mt-2" type="submit" />
      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
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
