import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import nextBase64 from "next-base64";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { passwordStrength } from "check-password-strength";
import {
  psswdStrengthCfg,
  getPsswdStrengthColor,
} from "@/utils/passwordStrength";
import {
  nameIsInvalid,
  emailIsInvalid,
  emailOrNameIsTooLong,
  passwordLengthIsInvalid,
} from "@/utils/validations";

interface RegisterPanelProps {
  setShowLogInPanel: Dispatch<SetStateAction<Boolean>>;
}

export const RegisterPanel: React.FC<RegisterPanelProps> = ({
  setShowLogInPanel,
}) => {
  const [name, setName] = useState<{ value: string; error: string }>({
    value: "",
    error: "",
  });
  const [email, setEmail] = useState<{ value: string; error: string }>({
    value: "",
    error: "",
  });
  const [password, setPassword] = useState<{ value: string; error: string }>({
    value: "",
    error: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<{
    value: string;
    error: string;
  }>({
    value: "",
    error: "",
  });
  const [passwordStrengthData, setPasswordStrengthData] = useState<{
    text: string;
    color: string;
  }>({ text: "", color: "transparent" });

  useEffect(() => {
    if (password.value !== "") {
      const strength = passwordStrength(
        password.value,
        psswdStrengthCfg as any
      );
      setPasswordStrengthData({
        color: getPsswdStrengthColor(strength.value),
        text: `Password Strength: ${strength.value}`,
      });
    } else {
      // Avoids telling user password is weak if nothing has been entered.
      setPasswordStrengthData({ ...passwordStrengthData, text: "" });
    }
  }, [password.value]);

  const allFieldsAreValid = () => {
    if (emailOrNameIsTooLong(name.value)) {
      setName({
        ...name,
        error: "Your name can't be longer than 40 characters.",
      });
    } else if (nameIsInvalid(name.value)) {
      setName({
        ...name,
        error: "Name can only contain characters A-Z, a-z and spaces.",
      });
    }
    else {
      setName({ ...name, error: "" });
    }
    if (emailIsInvalid(email.value)) {
      setEmail({ ...email, error: "Email is invalid." });
    } else if (emailOrNameIsTooLong(email.value)) {
      setEmail({
        ...email,
        error: "Email can't be longer than 40 characters.",
      });
    } else {
      setEmail({ ...email, error: "" });
    }
    if (passwordLengthIsInvalid(password.value)) {
      setPassword({
        ...password,
        error: "Passwords must be 8 to 32 characters.",
      });
    } else {
      setPassword({ ...password, error: "" });
    }
    if (password.value !== confirmPassword.value) {
      setConfirmPassword({
        ...confirmPassword,
        error: "Passwords don't match.",
      });
    } else {
      setConfirmPassword({ ...confirmPassword, error: "" });
    }
    if (
      name.error === "" &&
      email.error === "" &&
      password.error === "" &&
      confirmPassword.error === ""
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (allFieldsAreValid()) {
      register();
    }
  };

  async function register() {
    const response = await fetch(`/api/auth`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nextBase64.encode(name.value),
        email: nextBase64.encode(email.value),
        password: nextBase64.encode(password.value),
      }),
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <p
        className="text-primary cursor-pointer"
        onClick={() => setShowLogInPanel(true)}
      >
        ← Back to Log in
      </p>
      <div className="flex flex-col gap-1 mt-1">
        <label htmlFor="name" className=" text-sm">
          Name
        </label>
        <InputText
          id="name"
          value={name.value}
          onChange={(e) => setName({ ...name, value: e.target.value })}
          aria-describedby="name-help"
        />
        <small id="email-help" className=" text-red-800">
          {name.error}
        </small>
      </div>

      <div className="flex flex-col gap-1 mt-1">
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
        <small id="password-help" className="text-red-800">
          {password.error}
        </small>
      </div>
      <div style={{ color: passwordStrengthData.color }}>
        {passwordStrengthData.text}
      </div>
      <div className="flex flex-col gap-1 mt-1">
        <label htmlFor="confirm-password" className=" text-sm">
          Confirm Password
        </label>
        <InputText
          id="confirm-password"
          type="password"
          value={confirmPassword.value}
          onChange={(e) =>
            setConfirmPassword({ ...confirmPassword, value: e.target.value })
          }
          aria-describedby="confirm-password-help"
        />
        <small id="confirm-password-help" className=" text-red-800">
          {confirmPassword.error}
        </small>
      </div>
      <Button label="Register" className="w-full mt-8" type="submit" />
    </form>
  );
};
