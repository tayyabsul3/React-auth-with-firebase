import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { SiGmail } from "react-icons/si";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  async function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((UserData) => {
        console.log(UserData.user.email);
      })
      .catch((e) => {
        console.log(e);
        return;
      });
    alert("Succesfully logged in  ");
    setPassword("");
    setEmail("");
  }

  function handleLogout() {
    signOut(auth)
      .then(() => {
        alert("User signed out");
        setIsSignIn(false);
      })
      .catch((error) => {
        console.log("Error signing out:", error);
      });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:");
        setIsSignIn(true);
      } else {
        console.log("No user is logged in.");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  return (
    <div className="flex justify-center items-center h-[100vh]">
      {isSignIn ? (
        <div className="bg-black p-10 text-white shadow-xl">
          <p>Already Logged In sign-out now to Login again.</p>
          <button
            onClick={handleLogout}
            className="w-full my-10 mx-auto   bg-white text-black outline-none border-none px-3 py-2 text-xl cursor-pointer  hover:bg-slate-200 duration-300 transition-all ease-in-out"
          >
            Logout
          </button>
        </div>
      ) : (
        <form
          className=" shadow-2xl p-10 bg-black flex justify-center items-center flex-col text-white transition-all duration-1000 ease-in-out"
          onSubmit={handleSubmission}
        >
          <h1 className="text-3xl font-semibold mb-10">Login</h1>

          <div>
            <div className="formField flex gap-4 items-center">
              <label htmlFor="email">
                <SiGmail className="text-white" />
              </label>
              <input
                type="text"
                required={true}
                name="email"
                placeholder="Email"
                className="px-4 py-3 text-lg outline-none focus:outline-none w-[300px] text-black bg-white "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className="formField flex gap-4 items-center mt-7"
              style={{ position: "relative" }}
            >
              <label htmlFor="Passowrd">
                <FaKey className="text-white" />
              </label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required={true}
                className="px-4 py-3 text-lg outline-none focus:outline-none w-[300px] text-black bg-white "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPassword ? (
                <FaEye
                  className="text-gray-400 absolute right-[20px] cursor-pointer"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                />
              ) : (
                <FaEyeSlash
                  className="text-gray-400 absolute right-[20px] cursor-pointer"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                />
              )}
            </div>
            <div className="formField flex mt-7 items-center justify-between">
              <div>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="mr-2 "
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <input
                type="submit"
                value="Submit"
                className="w-[50px ]   bg-white text-black outline-none border-none px-3 py-2 text-xl cursor-pointer  hover:bg-slate-200 duration-300 transition-all ease-in-out"
              />
            </div>
            <div className="formField flex mt-5 justify-center items-center text-sm">
              <p>Forgot Password?</p>
              <Link
                to={"/forgotpassword"}
                className=" p-5 pl-1 hover:underline transition-all duration-300 ease-in-out hover:text-lg hover:p-4"
              >
                Click here
              </Link>
            </div>
            <div className="my-5 w-[100%] outline-1 outline-black mx-auto  border border-t-1 border-slate-900"></div>
            <div className="mt-10 ">
              <Link to={"/register"}>
                <button className="w-full bg-green-600  text-black text-xl py-2 px-2 hover:bg-slate-200 cursor-pointer transition-all duration-300 ease-in-out">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
