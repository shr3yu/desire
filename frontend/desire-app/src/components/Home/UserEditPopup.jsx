import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";
import PasswordInput from "../PasswordInput";
import axiosInstance from "../../utils/axiosInstancs";

const UserEditPopup = ({ userData, onClose, getUserInfo }) => {
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState(userData?.fullName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState("");

  const handleEditUser = async () => {
    //API call to edit user
    try {
      const response = await axiosInstance.put(`/edit-user`, {
        fullName: fullName,
        email: email,
        password: password,
      });

      if (response.data && !response.data.error) {
        onClose();
        getUserInfo();
        //get user info again
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="p-6 w-full bg-white rounded-lg shadow-md ">
      <button className="icon-button rounded-full flex absolute right-6">
        <VscClose size={24} onClick={onClose} />
      </button>
      <div className="flex flex-col pt-9">
        <label className="input-label"> FULL NAME </label>
        <input
          onClick={() => {
            setError("");
          }}
          type="text"
          placeholder="Name"
          className="w-full flex text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
        ></input>
      </div>

      <div className="flex flex-col">
        <label className="input-label"> EMAIL </label>
        <input
          onClick={() => {
            setError("");
          }}
          placeholder="Email"
          type="text"
          className="w-full flex text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        ></input>
      </div>

      <div className="flex flex-col">
        <label className="input-label">PASSWORD</label>
        <PasswordInput
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onClick={() => {
            setError("");
          }}
        ></PasswordInput>
      </div>
      {error && <p className="text-red-900 text-xs pt-4">{error}</p>}
      <button
        className="w-full bg-primary text-white font-medium rounded-lg py-3 mt-5"
        onClick={() => {
          handleEditUser();
        }}
      >
        SAVE
      </button>
    </div>
  );
};

export default UserEditPopup;
