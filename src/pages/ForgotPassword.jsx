import React from 'react'
import Button from '@mui/material/Button';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const ForgotPassword = () => {
    const auth = getAuth();


    let [email, setEmail] = useState("");
     
      let handleChange = (e) => {
     
          setEmail(e.target.value)
        console.log(email);
       
      };


    let HandleForgotPassword=()=>{
        sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          // ..
          console.log("Password reset email sent!");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
          console.log(errorCode);
         
        });
    }

  return (
    <div>
        <TextField onChange={handleChange} id="filled-basic" label="Enter Your Email" variant="filled" />
        <Button onClick={HandleForgotPassword} variant="contained">Submit</Button>
    </div>
  )
}

export default ForgotPassword
