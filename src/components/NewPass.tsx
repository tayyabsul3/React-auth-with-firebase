import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NewPass = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmpassword, setconfirmpassword] = useState<string>("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword_2, setShowPassword_2] = useState<boolean>(false);

  function handleSubmission(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    alert(password + " " + confirmpassword);

    if (password !== confirmpassword) {
      alert("Passowrds do not match");
      setPassword("");
      setconfirmpassword("");
      return;
    }
    setPassword("");
    setconfirmpassword("");
    navigate("/");
  }
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form
        className=" shadow-2xl p-10 bg-black flex justify-center items-center flex-col text-white transition-all duration-1000 ease-in-out"
        onSubmit={handleSubmission}
      >
        <h1 className="text-3xl font-semibold mb-10">New Password</h1>
        <div>
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
              style={{ position: "relative" }}
            />
            {showPassword ? (
              <FaEye
                className="text-gray-400 absolute right-[20px]"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              />
            ) : (
              <FaEyeSlash
                className="text-gray-400 absolute right-[20px]"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
              />
            )}
          </div>
          <div
            className="formField flex gap-4 items-center mt-7"
            style={{ position: "relative" }}
          >
            <label htmlFor="Passowrd">
              <FaKey className="text-white" />
            </label>

            <input
              type={showPassword_2 ? "text" : "password"}
              name="confirmpassword"
              placeholder="Confirm Password"
              required={true}
              className="px-4 py-3 text-lg outline-none focus:outline-none w-[300px] text-black bg-white "
              value={confirmpassword}
              onChange={(e) => setconfirmpassword(e.target.value)}
              style={{ position: "relative" }}
            />
            {showPassword_2 ? (
              <FaEye
                className="text-gray-400 absolute right-[20px]"
                onClick={() => {
                  setShowPassword_2((prev) => !prev);
                }}
              />
            ) : (
              <FaEyeSlash
                className="text-gray-400 absolute right-[20px]"
                onClick={() => {
                  setShowPassword_2((prev) => !prev);
                }}
              />
            )}
          </div>
          <div className="formField flex mt-10 items-center justify-between w-full">
            <p></p>
            <input
              type="submit"
              value="Submit"
              className="w-[50px ] bg-green-600 text-black outline-none border-none px-3 py-2 text-xl cursor-pointer  hover:bg-white duration-300 transition-all ease-in-out self-end"
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
        </div>
      </form>
    </div>
  );
};

export default NewPass;
