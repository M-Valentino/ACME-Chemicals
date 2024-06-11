import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { passwordStrength } from "check-password-strength";
import {
  emailIsInvalid,
  emailIsTooLong,
  passwordLengthIsInvalid,
} from "@/utils/validations";

interface RegisterPanelProps {
  setShowLogInPanel: Dispatch<SetStateAction<Boolean>>;
}

export const RegisterPanel: React.FC<RegisterPanelProps> = ({
  setShowLogInPanel,
}) => {
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
  const [passwordStrengthText, setPasswordStrengthText] = useState<string>("");
  const [passwordStrengthColor, setPasswordStrengthColor] = useState("transparent");

  const PSSWD_STRENGTH_NAMES = {
    tooWeak: "Too Weak",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
  };

  const psswdStrengthCfg = [
    {
      id: 0,
      value: PSSWD_STRENGTH_NAMES.tooWeak,
      minDiversity: 0,
      minLength: 0,
    },
    {
      id: 1,
      value: PSSWD_STRENGTH_NAMES.weak,
      minDiversity: 0,
      minLength: 8,
    },
    {
      id: 2,
      value: PSSWD_STRENGTH_NAMES.medium,
      minDiversity: 2,
      minLength: 10,
    },
    {
      id: 3,
      value: PSSWD_STRENGTH_NAMES.strong,
      minDiversity: 4,
      minLength: 12,
    },
  ];

  const getPsswdStrengthColor = (strength: string) => {
    switch (strength) {
      case PSSWD_STRENGTH_NAMES.tooWeak:
        return "#a01";
      case PSSWD_STRENGTH_NAMES.weak:
        return "#841";
      case PSSWD_STRENGTH_NAMES.medium:
        return "#881";
      case PSSWD_STRENGTH_NAMES.strong:
        return "#181";
      default:
        return "#000";
    }
  };

  useEffect(() => {
    if (password.value !== "") {
      const strength = passwordStrength(password.value, psswdStrengthCfg as any);
      setPasswordStrengthText(`Password Strength: ${strength.value}`);
      setPasswordStrengthColor(getPsswdStrengthColor(strength.value));
    } else {
      // Avoids telling user password is weak if nothing has been entered.
      setPasswordStrengthText("");
      setPasswordStrengthColor("#000");
    }
  }, [password.value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (emailIsInvalid(email.value)) {
      setEmail({ ...email, error: "Email is invalid." });
    } else if (emailIsTooLong(email.value)) {
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
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <div className="flex flex-col gap-1">
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
      <div style={{ color: passwordStrengthColor }}>{passwordStrengthText}</div>
      <Button label="Register" className="w-full mt-2" type="submit" />
    </form>
  );
};
