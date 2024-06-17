import React, { useState } from "react";
import { MdCreate, MdDelete } from "react-icons/md";
import { ImCheckmark2 } from "react-icons/im";
import { VscClose } from "react-icons/vsc";
import axiosInstance from "../../../utils/axiosInstancs";
import { capitalFirst } from "../../../utils/helper";

const ListItem = ({
  list,
  icon,
  name,
  active,
  expanded,
  onChange,
  onDelete,
  getAllLists
}) => {
  const [hoverState, setHoverState] = useState(null);
  const [editState, setEditState] = useState(false);
  const [error, setError] = useState("");
  const [listName, setListName] = useState("");

  const handleSubmit = async () => {
    if (!listName) {
      setError("Enter a list name");
      return;
    }

    //send edit-list name API call
    try {
      const response = await axiosInstance.put(`/edit-list/${list._id}`, {
        listName: capitalFirst(listName),
      });

      const responseTwo = await axiosInstance.get( `/get-list/${list._id}`)
      if (response.data && responseTwo.data) {
        //getting all lists to update the list name
        getAllLists(responseTwo.data?.list)
        setError("");
        setEditState(false);
        setListName("");
      }
    } catch (error) {
      console.log(error);
    }
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
      {editState && active? (
        <button
          className="flex items-center justify-center"
          onClick={handleSubmit}
        >
          <ImCheckmark2 className="icon-button pl-2 size-12" />
        </button>
      ) : (
        <img src={icon} className="w-12 h-12 flex-shrink-0 rounded-lg" />
      )}

      {editState && active && expanded ? (
        <div className="flex pl-2 items-center relative">
          <div>
            <input
              type="text"
              value={listName}
              onClick={() => setError("")}
              onChange={({ target }) => setListName(target.value)}
              className="text-sm text-slate-950 placeholder:text-white bg-secondary outline-none rounded mt-1"
              placeholder="List name"
            />
            {error && expanded && <p className="text-primary text-xs">{error}</p>}
          </div>
          <button className=" absolute right-6">
            <VscClose
              size={12}
              onClick={() => {
                setError("");
                setEditState(false);
              }}
            />
          </button>
        </div>
      ) : null}

      {expanded && (!editState || !active) ? (
        <span className="w-52 ml-3">{name}</span>
      ) : null}

      {expanded && hoverState && !editState ? (
        <div className="flex flex-row md:flex-row items-center gap-1 ml-auto">
          <MdCreate
            className="icon-btn text-black"
            onClick={() => {
              setEditState(true);
            }}
          />
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
