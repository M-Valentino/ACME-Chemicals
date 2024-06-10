import { MainWrapper } from "@/components/MainWrapper";
import { InputText } from "primereact/inputtext";

export default function login() {
  return (
    <MainWrapper title="Log In">
      <div className="border-secondary border-2 max-w-[480px] p-8 m-auto rounded-md">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className=" text-sm">Email</label>
          <InputText id="email" aria-describedby="email-help" />
          <small id="email-help" className=" text-red-800">
            error
          </small>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className=" text-sm">Password</label>
          <InputText id="password" aria-describedby="password-help" />
          <small id="password-help" className=" text-red-800">
            error
          </small>
        </div>
      </div>
    </MainWrapper>
  );
}
