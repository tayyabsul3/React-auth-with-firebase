import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaKey, FaUser } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const auth = getAuth();
  function handleSubmission(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log(userCredentials.user);
      })
      .catch((err) => {
        const errorMessage = err.message;
        const errorCode = err.code;

        setError(true);

        switch (errorCode) {
          case "auth/weak-password":
            setErrorMessage("The password is too weak.");
            break;
          case "auth/email-already-in-use":
            setErrorMessage(
              "This email address is already in use by another account."
            );
            break;
          case "auth/invalid-email":
            setErrorMessage("This email address is invalid.");
            break;
          case "auth/operation-not-allowed":
            setErrorMessage("Email/password accounts are not enabled.");
            break;
          default:
            setErrorMessage(errorMessage);
            break;
        }
      });
    alert("User created successfully" + auth.currentUser?.email);
    setEmail("");
    setPassword("");
    setUsername("");
  }
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form
        className=" shadow-2xl p-8 sm:p-10 bg-green-800 flex justify-center items-center flex-col text-white transition-all duration-1000 ease-in-out rounded-3xl"
        onSubmit={handleSubmission}
      >
        <h1 className="text-3xl font-semibold mb-5 sm:mb-10">Register</h1>
        <div>
          <div className="formField flex gap-2 sm:gap-4 items-center">
            <label htmlFor="username">
              <FaUser className="text-white" />
            </label>
            <input
              type="text"
              required={true}
              name="username"
              placeholder="Username"
              className="px-4 py-3 text-lg outline-none focus:outline-none w-[250px] sm:w-[300px] text-black bg-white rounded-3xl"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="formField flex gap-2 sm:gap-4 items-center mt-7">
            <label htmlFor="email">
              <SiGmail className="text-white" />
            </label>
            <input
              type="text"
              required={true}
              name="email"
              placeholder="Email"
              className="px-4 py-3 text-lg outline-none focus:outline-none w-[250px] sm:w-[300px] text-black bg-white rounded-3xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div
            className="formField flex gap-2 sm:gap-4 items-center mt-7"
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
              className="px-4 py-3 text-lg outline-none focus:outline-none w-[250px] sm:w-[300px] text-black bg-white rounded-3xl"
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
          <div className="formField flex mt-7 items-center justify-between w-full">
            <p className="text-red-500">{error ? errorMessage : ""}</p>
            <input
              type="submit"
              value="Register"
              className=" rounded-3xl   bg-white text-gray-400 hover:text-gray-700 outline-none border-none px-4 py-[7px] text-lg cursor-pointer  hover:bg-slate-200 duration-300 transition-all ease-in-out"
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
          <div className="my-5 sm:my-10 w-[100%] outline-1 outline-black mx-auto  border border-t-1 border-slate-900"></div>
          <div className="mt-10">
            <Link to={"/login"}>
              <button className="w-full bg-green-600 rounded-3xl text-black text-xl py-2 px-2 hover:bg-slate-200 cursor-pointer transition-all duration-300 ease-in-out">
                Login
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
