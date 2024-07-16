import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { SiGmail } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase/firebase";

const ForgotPass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [showField, setShowField] = useState<boolean>(true);
  function handleSubmission(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then((data) => {
        console.log("code sent" + data);
      })
      .catch((e) => {
        console.log(e);
      });
    if (!showField) {
      alert("Please Check you Inbox [Code Resent]");
      return;
    }
    alert("Recovery Mail Has been sent Check your Email");
    setEmail("");
    setShowField((prev) => !prev);
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form
        className=" shadow-2xl p-5 md:p-10 bg-black flex justify-center items-center flex-col text-white transition-all duration-1000 ease-in-out"
        onSubmit={handleSubmission}
      >
        <h1 className="text-3xl font-semibold mb-10">Change Password</h1>
        <div>
          {showField ? (
            <div className="formField flex gap-4 items-center mt-7">
              <label htmlFor="email">
                <SiGmail className="text-white" />
              </label>
              <input
                type="text"
                required={true}
                name="email"
                placeholder="Email"
                className="px-4 py-3 text-lg outline-none focus:outline-none w-[250px] md:w-[300px] text-black bg-white "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <p>
                Please Check your Inbox for Recovery Email. <br />
                If you did not recive it click on Resend Code button
              </p>
            </div>
          )}

          <div className="formField flex mt-7 items-center justify-between w-full">
            <p></p>
            <input
              type="submit"
              value={showField ? "verify" : "Login"}
              className="w-[50px ] bg-white text-black outline-none border-none px-3 py-2 text-xl cursor-pointer  hover:bg-slate-200 duration-300 transition-all ease-in-out self-end"
            />
          </div>
          {/* <div className="formField flex mt-5 justify-center items-center text-sm">
              <p>Forgot Password?</p>
              <a
                href="/forgotpassword"
                className=" p-5 pl-1 hover:underline transition-all duration-300 ease-in-out hover:text-lg hover:p-4"
              >
                Click here
              </a>
            </div> */}
          <div className="my-10 w-[100%] outline-1 outline-black mx-auto  border border-t-1 border-slate-900"></div>
          <div className="mt-10 ">
            <Link to={"/login"}>
              <button className="w-full bg-green-600  text-black text-xl py-2 px-2 hover:bg-slate-200 cursor-pointer transition-all duration-300 ease-in-out">
                Login
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPass;
