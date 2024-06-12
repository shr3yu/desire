import React from "react";

const ListItem = ({ icon, name, active, expanded }) => {
  return (
    <div
      className={`realative flex items-center py-2 px-3 my-1
        font-medium cursor-pointer justify-center items-center 
        transition-colours ${
          active
            ? "bg-gray-100"
            : "hover:bg-gray-100"
        }`}
    >
      <img src={icon} className="w-12 h-12 flex-shrink-0 rounded-lg" />
      {expanded ? <span className="w-52 ml-3">{name}</span> : null}
    </div>
  );
};

export default ListItem;
