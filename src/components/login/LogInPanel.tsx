import React, { Dispatch, SetStateAction, useState } from "react";
import nextBase64 from "next-base64";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {
  emailIsInvalid,
  emailOrNameIsTooLong,
  passwordLengthIsInvalid,
} from "@/utils/validations";
import { API_MESSAGES } from "@/utils/consts";

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

  const allFieldsAreValid = () => {
    if (emailIsInvalid(email.value) || emailOrNameIsTooLong(email.value)) {
      setEmail({ ...email, error: "Email is invalid." });
    } else {
      setEmail({ ...email, error: "" });
    }
    if (passwordLengthIsInvalid(password.value)) {
      setPassword({ ...password, error: "Password is invalid." });
    } else {
      setPassword({ ...password, error: "" });
    }
    if (email.error === "" && password.error === "") {
      return true;
    }
    return false;
  };

  async function authenticate() {
    const response = await fetch(`/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: nextBase64.encode(email.value),
        password: nextBase64.encode(password.value),
      }),
    });
    const data = await response.json();
    if (data.message === API_MESSAGES.incorrectPassword) {
      setPassword({ ...password, error: API_MESSAGES.incorrectPassword });
    }
    console.log(data);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allFieldsAreValid()) {
      authenticate();
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
      <div className="flex flex-col gap-1 mt-1">
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
      <Button label="Log in" className="w-full mt-8" type="submit" />
      <p className="mt-4 text-center text-lg">
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
