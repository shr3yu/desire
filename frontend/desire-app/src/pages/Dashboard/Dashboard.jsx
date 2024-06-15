import React, { useState } from "react";
import Sidebar from "../../components/Home/Sidebar";
import ItemCard from "../../components/Home/ItemCard/ItemCard";
import bag from "../../components/Backdrop/Backdrop-images/bag.JPG";
import ItemEditPopup from "../../components/Home/ItemCard/ItemEditPopup";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";

export const Dashboard = () => {
  const [expanded, setExpanded] = useState(true);
  const [openEditItemPopupModal, setOpenEditItemModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Sidebar expanded={expanded} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-grow p-4 transition-all duration-100 ${
          expanded ? "ml-64" : "ml-20"
        }`}
      >
        <div className="py-8 px-7">
          <h1 className="text-4xl pd-30 tracking-tight"> Active List Name</h1>
          <div className="container mx-auto pt-10">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ItemCard
                itemName="I want to get my nails done"
                image={bag}
                description="A treat?"
                amount="80"
                isPinned={true}
                onDelete={() => {}}
                onEdit={() => {}}
                onPinNote={() => {}}
              />

              <ItemCard
                itemName="purse"
                image={bag}
                description="Maybe for a birthday present??"
                amount="22"
                isPinned={true}
                onDelete={() => {}}
                onEdit={() => {}}
                onPinNote={() => {}}
              />
            </div>
          </div>

          <button
            className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-secondary fixed right-10 bottom-10"
            onClick={() => {
              setOpenEditItemModal({ isShown: true, type: "add", data: null });
            }}
          >
            <MdAdd className="text-[32px] text-white" />
          </button>

          <Modal
            isOpen={openEditItemPopupModal.isShown}
            onRequestClose={() => {}}
            style={{
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              },
              content: {
                position: "relative",
                inset: "auto",
                width: "70%",
                maxWidth: "500px",
                height: "auto",
                maxHeight: "80%",
                background: "white",
                overflow: "auto",
                margin: "auto",
              },
            }}
            contentLabel="Edit Item Modal"
            className="w-full max-w-3xl h-auto max-h-[50%] bg-white rounded-md overflow-auto mx-2 sm:mx-auto mt-0 sm:mt-14"
          >
            <ItemEditPopup
              type={openEditItemPopupModal.type}
              itemData={openEditItemPopupModal.data}
              onClose={() =>
                setOpenEditItemModal({
                  isShown: false,
                  type: "add",
                  data: null,
                })
              }
            />
          </Modal>
        </div>
      </div>
    </>
  );
};
