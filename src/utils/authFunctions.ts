import nextBase64 from "next-base64";
import { API_MESSAGES } from "./consts";

type authMessage = {
  message: string;
  session: string;
};

export async function authenticate(
  email: string,
  password: string,
  rememberMe: boolean
): Promise<authMessage> {
  const response = await fetch(`/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: nextBase64.encode(email),
      password: nextBase64.encode(password),
      rememberMe: rememberMe,
    }),
  });

  const data: authMessage = await response.json();
  return data;
}

export const ifLoginValidRedirict = (data: {
  message: string;
  session: string;
}) => {
  if (data.message === API_MESSAGES.success) {
    localStorage.setItem("sessionInfo", JSON.stringify(data.session));
    window.open("/products", "_self");
  }
};

export const getCurrentUser = () => {
  if (typeof window !== "undefined") {
    const storedSessionInfo = localStorage.getItem("sessionInfo");
    if (storedSessionInfo) {
      return JSON.parse(storedSessionInfo);
    }
  }
  return;
};
