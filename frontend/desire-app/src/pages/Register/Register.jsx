import React, { useState } from "react";
import Backdrop from "../../components/Backdrop/Backdrop";
import PasswordInput from "../../components/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstancs";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email adress.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    setError("");

    //SignUpAPI
    try {
      const response = await axiosInstance.post("/create-account", {
        fullName: name,
        email: email,
        password: password,
      });

      //handle successful sign up response
      if (response.data && response.data.error) {
        setError(response.data.message);
        return;
      }

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      //handle login error
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured.");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4">
        <Backdrop />
        <div className="w-68 border rounded bg-white px-10 py-10">
          <form onSubmit={handleSignup}>
            <h4 className="text-2xl mb-7 font-bold tracking-tight text-center">
              D e s i r e
            </h4>
            <input
              type="text"
              placeholder="Name"
              className="w-full flex text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              onClick={() => {
                setError("");
              }}
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onClick={() => {
                setError("");
              }}
            />
            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onClick={() => {
                setError("");
              }}
            ></PasswordInput>

            <button type="submit" className="submit-button">
              Sign Up
            </button>

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <p className="text-sm text-center mt-4">
              Have an account? {""}
              <Link to="/" className="font-medium text-primary underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
