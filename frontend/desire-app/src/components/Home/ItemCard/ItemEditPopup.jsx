import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";
import axiosInstance from "../../../utils/axiosInstancs";

const ItemEditPopup = ({
  itemData,
  type,
  onClose,
  list,
  getAllActiveItems,
}) => {
  const [item, setItem] = useState(itemData?.itemName || "");
  const [description, setDescription] = useState(itemData?.description || "");
  const [amount, setAmount] = useState(itemData?.amount || "");

  const [error, setError] = useState("");

  //Add new item
  const addNewItem = async (list) => {
    try {
      const response = await axiosInstance.post(`/add-item/${list._id}`, {
        itemName: item,
        description: description,
        amount: amount,
      });

      if (response.data && response.data.item) {
        //renders the page
        await getAllActiveItems(list._id);
        onClose();
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

  //Edit item
  const editItem = async () => {
    try {
      const response = await axiosInstance.put(`/edit-item/${itemData?._id}`, {
        itemName: item,
        description: description,
        amount: amount,
      });

      if (response.data && response.data.item) {
        //renders the page
        await getAllActiveItems(list._id);
        onClose();
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

  const handleAddItem = () => {
    if (!item) {
      setError("Please enter an item name ");
      return;
    } else if (!amount) {
      setError("Please enter an amount");
      return;
    }

    setError("");

    if (type === "edit") {
      editItem();
    } else {
      addNewItem(list);
    }
  };

  return (
    <div className="p-6 w-full bg-white rounded-lg shadow-md ">
      <button className="icon-button rounded-full flex absolute right-6">
        <VscClose size={24} onClick={onClose} />
      </button>
      <div className="flex flex-col py-2">
        <label className="input-label"> ITEM </label>
        <input
          onClick={() => {
            setError("");
          }}
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="I desire ..."
          value={item}
          onChange={({ target }) => setItem(target.value)}
        ></input>
      </div>

      <div className="flex flex-col py-2">
        <label className="input-label"> DISCRIPTION </label>
        <textarea
          onClick={() => {
            setError("");
          }}
          type="text"
          className="text-sm text-slate-950 bg-slate-50 p-2 outline-none"
          rows={5}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        ></textarea>
      </div>

      <div className="flex flex-col py-2">
        <label className="input-label">AMOUNT</label>
        <input
          onClick={() => {
            setError("");
          }}
          type="text"
          placeholder="$"
          className="input-label text-xl outline-none"
          value={amount}
          onChange={({ target }) => setAmount(target.value)}
        ></input>
      </div>
      {error && <p className="text-red-900 text-xs pt-4">{error}</p>}
      <button
        className="w-full bg-primary text-white font-medium rounded-lg py-3 mt-5"
        onClick={handleAddItem}
      >
        {type === "edit" ? "SAVE" : "ADD"}
      </button>
    </div>
  );
};

export default ItemEditPopup;
