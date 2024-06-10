import Link from "next/link";
import { MainWrapper } from "@/components/MainWrapper";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

export default function login() {
  return (
    <MainWrapper title="Log In">
      <h1 className=" text-6xl text-primary font-extrabold text-center">Welcome back!</h1>
      <div className="border-secondary border-2 max-w-[480px] p-8 m-auto rounded-md mt-4">
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
          <Link href="/register" className="text-primary ml-1">
            Register
          </Link>
        </p>
      </div>
    </MainWrapper>
  );
}
