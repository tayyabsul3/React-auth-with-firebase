import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.tsx";
import "./index.css";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPass from "./components/ForgotPass.tsx";
import NewPass from "./components/NewPass.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.Fragment>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPass />} />
        <Route path="/newpassword" element={<NewPass />} />
      </Routes>
    </React.Fragment>
  </BrowserRouter>
);
