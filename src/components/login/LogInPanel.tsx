import React, { Dispatch, SetStateAction, useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import {
  emailIsInvalid,
  emailOrNameIsTooLong,
  passwordLengthIsInvalid,
} from "@/utils/validations";
import { API_MESSAGES } from "@/utils/consts";
import { authenticate, ifLoginValidRedirict } from "@/utils/authFunctions";

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
  const [rememberMe, setRememberMe] = useState<boolean>(false);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (allFieldsAreValid()) {
      const data = await authenticate(email.value, password.value, rememberMe);
      if (data.message === API_MESSAGES.incorrectLogin) {
        setPassword({ ...password, error: API_MESSAGES.incorrectLogin });
      }
      ifLoginValidRedirict(data);
    }
  }

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
      <div className="mt-1 flex align-items-center">
        <Checkbox
          inputId="RememberMe"
          value={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
          checked={rememberMe}
        />
        <label htmlFor="RememberMe" className="ml-2">
          Remember Me
        </label>
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
