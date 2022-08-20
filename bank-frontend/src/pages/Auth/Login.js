import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../apis/auth";
import { createUserApi } from "../../apis/createUserApi";
import {
  setAccessToken,
  setAccNo,
  setUserType,
} from "../../redux/actions/user";
import { errorToast, successToast } from "../../redux/services/toast";
import { ToastContainer } from "react-toastify";

import "./login.css";

const Login = () => {
  const [email, setemail] = useState(undefined);
  const [password, setpassword] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setname] = useState(undefined);

  const [tabActive, settabActive] = useState("login");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (tabActive === "login") {
      const result = await loginApi({ email, password });
      if (result === false) {
        // Toast error
        console.error("Error in fetching user details");
        errorToast("Invalid email or password");
      } else {
        setUserType(result?.data?.role, dispatch);
        setAccessToken(result?.data?.token, dispatch);
        setAccNo(result?.data?.accountNo, dispatch);
        navigate("/");
        successToast("Logged in successfully");
      }
    } else {
      const result = await createUserApi({ email, password, name });
      if (result === false) {
        // Toast error
        errorToast("Error in creating user");
      } else {
        successToast("User created successfully !");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center login-canvas min-h-screen">
      <div className="py-19 mx-auto w-8/12  min-w-fit rounded-3xl	login-container h-2/5">
        <form className="row-span-1 p-8" onSubmit={handleLogin}>
          <div className="flex justify-center gap-2 py-8">
            <Typography
              variant={"h5"}
              component={"h2"}
              className="text-center pb-4 cursor-pointer"
              style={{
                color: tabActive === "login" ? "#0177FB" : "black",
                backgroundColor: tabActive === "login" ? "#E5F1FF" : "",
                borderRadius: "15px",
                padding: "10px 15px",
              }}
              onClick={() => settabActive("login")}
            >
              Login
            </Typography>

            <Typography
              variant={"h5"}
              component={"h2"}
              className="text-center pb-4"
              style={{
                padding: "10px 15px",
              }}
            >
              or
            </Typography>
            <Typography
              variant={"h5"}
              component={"h2"}
              className="text-center pb-4 cursor-pointer"
              style={{
                color: tabActive === "register" ? "#0177FB" : "black",
                backgroundColor: tabActive === "register" ? "#E5F1FF" : "",
                borderRadius: "15px",
                padding: "10px 15px",
              }}
              onClick={() => settabActive("register")}
            >
              {" "}
              {` Register`}
            </Typography>
          </div>

          <div className="flex flex-col gap-4">
            {tabActive === "register" && (
              <TextField
                required
                label="Name"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            )}
            <TextField
              required
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <TextField
              required
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              className="mx-auto"
              sx={{
                width: "fit-content",
                marginX: "auto",
                background: "#0177FB",
              }}
              onClick={(e) => handleLogin(e)}
            >
              {tabActive === "login" ? "Login" : "Register"}
            </Button>
          </div>
        </form>
        <div className="text-center row-span-2">
          <Typography variant={"h4"} component={"h1"}>
            Welcome to Mini Bank
          </Typography>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default connect()(Login);
