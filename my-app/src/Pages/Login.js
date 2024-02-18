import React, { useState } from "react";
import { signInWithGoogle } from "../libs/firebase";
import "../Styles/Login.css";

function Login() {
  return (
    <div className="container">
      <div className="login-container">
        <h1>Note Easy App📝</h1>
        <p>You can sign in our app with Google Account.</p>
        <button onClick={signInWithGoogle} className="btn-login">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
export default Login;
