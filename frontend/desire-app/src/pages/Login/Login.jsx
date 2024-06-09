import React from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../../components/PasswordInput";
import Backdrop from "../../components/Backdrop/Backdrop";

const Login = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen p-4">
        <Backdrop/>
        <div className="w-68 border rounded-md bg-white px-10 py-10">
          <form onSubmit={() => {}}>
            <h4 className="text-2xl mb-7 font-bold tracking-tight text-center">
              D e s i r e
            </h4>
            <input
              type="text"
              placeholder="Email"
              className="w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
            />
            <PasswordInput></PasswordInput>

            <button type="submit" className="submit-button">
              Login
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Not registered yet?{" "}
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
