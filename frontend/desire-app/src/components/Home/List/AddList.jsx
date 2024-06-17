import React, { useState } from "react";
import { VscDiffAdded } from "react-icons/vsc";
import { ImCheckmark2 } from "react-icons/im";
import { VscClose } from "react-icons/vsc";
import axiosInstance from "../../../utils/axiosInstancs";
import { capitalFirst } from "../../../utils/helper";

const AddList = ({ expanded, allLists, setAllLists }) => {
  // text: if text input should be displayed or not
  const [text, setText] = useState(false);
  // list: value of list name
  const [list, setList] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!list) {
      setError("Enter a list name");
      return;
    }

    //API call to add list
    try {
      const response = await axiosInstance.post("/add-list", {
        listName: capitalFirst(list),
      });

      if (response.data && response.data.list) {
        setAllLists([...allLists, response.data.list]); //adds to list, so page can render 
        setList("");
        setError("");
        setText(false);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured");
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-4 px-3 my-1 font-medium transition-colors">
      {text ? (
        <>
          <div className="flex items-center">
            <button
              className="flex items-center justify-center"
              onClick={handleSubmit}
            >
              <ImCheckmark2 className="icon-button pl-3 size-12" />
            </button>
            <div className="pl-2 ">
              {expanded ? (
                <div className="flex items-center relative">
                  <input
                    type="text"
                    value={list}
                    onClick={() => setError("")}
                    onChange={({ target }) => setList(target.value)}
                    className="text-sm text-slate-950 outline-none rounded mt-1"
                    placeholder="List name"
                  />
                  <button className=" absolute right-6">
                    <VscClose
                      size={12}
                      onClick={() => {
                        setText(false);
                        setError("");
                      }}
                    />
                  </button>
                </div>
              ) : null}
              {error && expanded && (
                <p className="text-primary text-xs">{error}</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <button
          className="flex items-center justify-center"
          onClick={() => setText(true)}
        >
          <VscDiffAdded className="icon-button size-12" />
        </button>
      )}
    </div>
  );
};

export default AddList;
