import React, { useState } from "react";
import "./login.css";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import pinch from "../../images/Pinch.png";
import pinchimg from "../../images/Pinchimg.svg";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);
function Login() {
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(employeeEmail, password);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    signInWithEmailAndPassword(auth, employeeEmail, password)
      .then((value) => {
        navigate("/tab");
        console.log("login Done", value);
      })
      .catch((error) => {
        alert("Please Fill Coreect Email and Password");
        console.log(error);
      });
    // alert("hii")

    // navigate("/tab")
  };
  return (
    <div className="Body">
      <div className="form">
        <Box
          sx={{
            mt: "-70px",
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              cursor: "pointer",
            }}
            width={"120px"}
            src={pinch}
            alt=""
          />
          <h1 className="head"> H A W K </h1>
        </Box>
        <Box p={1}>
          <input
            onChange={(e) => {
              setEmployeeEmail(e.target.value);
            }}
            type="text"
            placeholder="Employee Email"
            id="username"
          />
        </Box>
        <Box p={1}>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            id="password"
          />
        </Box>
        <button onClick={handleSubmit}>Login</button>
      </div>
      <Box
        sx={{
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            cursor: "pointer",
            position: "fixed",
            right: 0,
            bottom: 0,
            margin: 0,
          }}
          width={"1463px"}
          src={pinchimg}
          alt=""
        />
      </Box>
    </div>
  );
}

export default Login;
