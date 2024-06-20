import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const Profile = ({ userInfo, handleUserEdit }) => {
  const name = userInfo?.fullName;
  const [hoverState, setHoverState] = useState(false);
  const firstletter = name ? name[0].toUpperCase() : "";

  return (
    <>
      <button
        onClick={handleUserEdit}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
      >
        <div className="w-12 h-12 flex items-center rounded-full justify-center text-black font-medium bg-slate-100">
          {hoverState ? (
            <FaEdit
              size={19}
              className="flex flex-grow "
            />
          ) : (
            <div>{firstletter}</div>
          )}
        </div>
      </button>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium overflow-auto scroll-input">{name}</p>
        <p className="text-xs text-gray-500 overflow-auto scroll-input">
          {userInfo?.email}{" "}
        </p>
      </div>
    </>
  );
};

export default Profile;
