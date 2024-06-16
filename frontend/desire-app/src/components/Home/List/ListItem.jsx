import React from "react";

const ListItem = ({ listId, icon, name, active, expanded, onChange }) => {
  return (
    <div
      className={`relative flex items-center py-2 px-3 my-1
        font-medium cursor-pointer justify-center
        transition-colours ${active ? "bg-primary" : "hover:bg-gray-100"}`}
      onClick={() => {
        console.log("Changed")
        onChange(listId);
      }}
    >
      <img src={icon} className="w-12 h-12 flex-shrink-0 rounded-lg" />
      {expanded ? <span className="w-52 ml-3">{name}</span> : null}
    </div>
  );
};

export default ListItem;
