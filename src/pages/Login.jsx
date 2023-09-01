import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Image from "../components/Image";
import { ColorRing } from "react-loader-spinner";
import { toast } from "react-toastify";
import Alert from "@mui/material/Alert";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup

} from "firebase/auth";

const Login = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  let navigate = useNavigate();
  let [emailError, setEmailError] = useState("");
  let [passwordError, setPasswordError] = useState("");

  let [show, setShow] = useState(false);
  let [logInLoad, setLogInLoad] = useState(false);

  let [fromData, setFromDara] = useState({
    email: "",
    password: "",
  });

  let handleChange = (e) => {
    setFromDara({
      ...fromData,
      [e.target.name]: e.target.value,
    });
    setEmailError("");
    setPasswordError("");
  };

  let haandleGoogleLogin = () => {
    
    signInWithPopup(auth, provider).then(()=>{

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    })


    console.log("Ami haandleGoogleLogin");
  };

  let handleLogin = () => {
    if (!fromData.email) {
      setEmailError("Email require");
    }
    if (!fromData.password) {
      setPasswordError("Password require");
    }

    if (fromData.email && fromData.password) {
      setLogInLoad(true);
      signInWithEmailAndPassword(auth, fromData.email, fromData.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          if (user.emailVerified) {
            toast.success("Login successful", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });

            setTimeout(() => {
              navigate("/home");
            }, 2000);
            setLogInLoad(false);
          } else {
            toast.error("verify your email", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setLogInLoad(false);
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);

          if (errorCode.includes("wrong-password")) {
            toast.error("Wrong password", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setLogInLoad(false);
          }
          if (errorCode.includes("user-not-found")) {
            toast.error("Email not found", {
              position: "bottom-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setLogInLoad(false);
          }
        });
    }
  };

  return (
    <div className="registerpage">
      <div className="left">
        <div className="text_container">
          <h2>Login to your account!</h2>
          <Button onClick={haandleGoogleLogin}>
            <Image className="googlelogin" src="/src/assets/google_login.png" />
          </Button>
          <TextField
            onChange={handleChange}
            className="inputcss"
            type="email"
            name="email"
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
          />
          {emailError && <Alert severity="error">{emailError}</Alert>}
          <TextField
            onChange={handleChange}
            className="inputcss"
            name="password"
            type={show ? "text" : "password"}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          {passwordError && <Alert severity="error">{passwordError}</Alert>}

          {show ? (
            <AiFillEye onClick={() => setShow(false)} className="eye" />
          ) : (
            <AiFillEyeInvisible onClick={() => setShow(true)} className="eye" />
          )}

          {logInLoad ? (
            <Button className="loginbtn" variant="contained">
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
              onClick={handleLogin}
              className="loginbtn"
              variant="contained"
            >
              Login to Continue
            </Button>
          )}
          <p className="singlnk">
            Already have an account ?{" "}
            <Link to="/" className="singlnkcolor">
              Sign In
            </Link>{" "}
          </p>
          <Link to="/forgotpassword" className="singlnkcolor">
              Forgot Password
            </Link>{" "}
        </div>
      </div>
      <div className="right">
        <div className="bg">
          <Image src="/src/assets/login.png" />
        </div>
      </div>
    </div>
  );
};

export default Login;
