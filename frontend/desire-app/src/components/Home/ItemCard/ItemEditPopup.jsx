import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";

const ItemEditPopup = ({ itemData, type, onClose }) => {
  const [item, setItem] = useState("");
  const [discription, setDiscription] = useState("");
  const [amount, setAmount] = useState("");

  const [error, setError] = useState("");

  //Add new item
  const addNewItem= async ()=> {};
  //Edit item
  const editItem= async()=>{}

  
  const handleAddItem = () => {
    if (!item) {
      setError("Please enter an item name ");
      return;
    } else if (!amount) {
      setError("Please enter an amount");
      return;
    }

    setError("");

    if(type === "edit"){
        editItem();
    }else{
        addNewItem();
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
          value={discription}
          onChange={({ target }) => setDiscription(target.value)}
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
        ADD
      </button>
    </div>
  );
};

export default ItemEditPopup;
