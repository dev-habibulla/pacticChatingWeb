import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Image from "../components/Image";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const Register = () => {
  const auth = getAuth();
  let navigate = useNavigate()
  let [emailError, setEmailError] = useState("");
  let [fullNameError, setFullNameError] = useState("");
  let [passwordError, setPasswordError] = useState("");
  let [show, setShow] = useState(false);
  let [singInLoad, setSingInLoad] = useState(false);

  let [fromData, setFromDara] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  let handleChange = (e) => {
    setFromDara({
      ...fromData,
      [e.target.name]: e.target.value,
    });
    setEmailError("");
    setFullNameError("");
    setPasswordError("");
  };

  let handleRegister = () => {
    if (!fromData.email) {
      setEmailError("Email require");
    }
    if (!fromData.fullName) {
      setFullNameError("Full Name require");
    }

    if (!fromData.password) {
      setPasswordError("Password require");
    }

    if (fromData.email && fromData.fullName && fromData.password){


      setSingInLoad(true);
    createUserWithEmailAndPassword(auth, fromData.email, fromData.password)
      .then((userCredential) => {

        setFromDara({
          email: "",
          fullName: "",
          password: "",
        })
        
        sendEmailVerification(auth.currentUser).then(() => {
         
          // Email verification sent!
          // ...
          toast.success("Registration successful Please Verify Your Email ", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

        });

        // Signed in
        const user = userCredential.user;
        // ...
        setSingInLoad(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        if (errorCode.includes("email-already")) {
          toast.error("Email already exists", {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }

        setSingInLoad(false);
      });

      setTimeout(() => {
        navigate("/login")
      }, 2000);

    }

  };

  return (
    <div className="registerpage">
      <div className="left">
        <div className="text_container">
          <h2>Get started with easily register</h2>
          <p>Free register and you can enjoy it</p>
          <TextField
            onChange={handleChange}
            className="inputcss"
            name="email"
            type="email"
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            value={fromData.email}
          />
          {emailError && (
            <Alert variant="filled" severity="error">
              {emailError}
            </Alert>
          )}
          <TextField
            onChange={handleChange}
            className="inputcss"
            name="fullName"
            type="text"
            id="outlined-basic"
            label="Full name"
            variant="outlined"
            value={fromData.fullName}
          />
          {fullNameError && (
            <Alert variant="filled" severity="error">
              {fullNameError}
            </Alert>
          )}
          <TextField
            onChange={handleChange}
            className="inputcss passhow"
            name="password"
            type={show ? "text" : "password"}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            value={fromData.password}
          />
          {passwordError && (
            <Alert variant="filled" severity="error">
              {passwordError}
            </Alert>
          )}

          {show ? (
            <AiFillEye onClick={() => setShow(false)} className="eye" />
          ) : (
            <AiFillEyeInvisible onClick={() => setShow(true)} className="eye" />
          )}
          {singInLoad ? (
            <Button className="regbtn" variant="contained">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </Button>
          ) : (
            <Button
              onClick={handleRegister}
              className="regbtn"
              variant="contained"
            >
              Sign up
            </Button>
          )}

          <p className="singlnk">
            Already have an account ?{" "}
            <Link to="/login" className="singlnkcolor">
              Sign In
            </Link>{" "}
          </p>
        </div>
      </div>
      <div className="right">
        <div className="bg">
          <Image src="/src/assets/registration.png" />
        </div>
      </div>
    </div>
  );
};

export default Register;
