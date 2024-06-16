import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import Backdrop from "../../components/Backdrop/Backdrop";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstancs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email adress.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }
    setError("");

    //Login API call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      //handle successful login response
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
        <div className="w-68 border rounded-md bg-white px-10 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7 font-bold tracking-tight text-center">
              D e s i r e
            </h4>
            <input
              type="text"
              placeholder="Email"
              className="w-full flex text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
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

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Not registered?{" "}
            <Link to="/register" className="font-medium text-primary underline">
              Create an Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
