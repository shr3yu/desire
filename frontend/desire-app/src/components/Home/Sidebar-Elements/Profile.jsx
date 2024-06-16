import React from "react";

const Profile = ({ userInfo }) => {
  const name = userInfo?.fullName;
  const firstletter = name ? name[0].toUpperCase() : '';
  
  return (
    <>
      <div className="w-12 h-12 flex items-center rounded-full justify-center text-black font-medium bg-slate-100">
        {firstletter}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium overflow-auto scroll-input">
          {name}
        </p>
        <p className="text-xs text-gray-500 overflow-auto scroll-input">
          {userInfo?.email}{" "}
        </p>
      </div>
    </>
  );
};

export default Profile;
