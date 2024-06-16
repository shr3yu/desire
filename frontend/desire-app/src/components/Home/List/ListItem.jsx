import React, { useState } from "react";
import { MdCreate, MdDelete } from "react-icons/md";

const ListItem = ({
  list,
  icon,
  name,
  active,
  expanded,
  onChange,
  onDelete,
}) => {
  const [hoverState, setHoverState] = useState(null);

  const onEdit = () => {
    //when edit is pressed
  };

  return (
    <div
      className={`relative flex items-center py-2 px-3 my-1
        font-medium cursor-pointer justify-center
        transition-colours ${active ? "bg-secondary" : "hover:bg-gray-100"}`}
      onClick={() => {
        onChange(list);
      }}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
    >
      <img src={icon} className="w-12 h-12 flex-shrink-0 rounded-lg" />
      {expanded ? <span className="w-52 ml-3">{name}</span> : null}

      {expanded && hoverState ? (
        <div className="flex flex-row md:flex-row items-center gap-1 ml-auto">
          <MdCreate className="icon-btn text-black" onClick={onEdit} />
          <MdDelete
            className="icon-btn text-black"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(list);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ListItem;
