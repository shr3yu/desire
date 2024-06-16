import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Home/Sidebar";
import ItemCard from "../../components/Home/ItemCard/ItemCard";
import bag from "../../components/Backdrop/Backdrop-images/bag.JPG";
import ItemEditPopup from "../../components/Home/ItemCard/ItemEditPopup";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstancs";

export const Dashboard = () => {
  const [expanded, setExpanded] = useState(true);
  const [openEditItemPopupModal, setOpenEditItemModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const navigate = useNavigate();

  //get user info
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response.status == 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //get all lists
  const [allLists, setAllLists] = useState([]);

  const getAllLists = async () => {
    try {
      const response = await axiosInstance.get("/get-lists");

      if (response.data && response.data.lists) {
        setAllLists(response.data.lists);
        setSelectedList(response.data.lists[0]); //inital active list is the first one recieved
        return response.data.lists;
      }
    } catch (error) {
      console.log(`An unexpected error has occured: ${error}`);
    }
  };

  //Keeping track of the selected/active list
  const [selectedList, setSelectedList] = useState(null);

  const changeSelectedList = (list) => {
    setSelectedList(list);
    getAllActiveItems(list._id);
  };

  //get all active items
  const [allActiveItems, setAllActiveItems] = useState(null);

  const getAllActiveItems = async (listId) => {
    try {
      const response = await axiosInstance.get(`/get-items-in-list/${listId}`);

      if (response.data && response.data.items) {
        setAllActiveItems(response.data.items);
      }
    } catch (error) {
      console.log(`An unexpected error has occured: ${error}`);
    }
  };

  //Happens before rendering of the page
  useEffect(() => {
    const fetchData = async () => {
      const lists = await getAllLists();
      const firstListId = lists[0]?._id;
      if (firstListId) {
        await getAllActiveItems(firstListId);
      }
      getUserInfo();
    };

    fetchData();
  }, []);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Sidebar
        expanded={expanded}
        toggleSidebar={toggleSidebar}
        onChange={changeSelectedList}
        userInfo={userInfo}
        allLists={allLists}
        setAllLists={setAllLists}
        activeList={selectedList}
      />
      <div
        className={`flex-grow p-4 transition-all duration-100 ${
          expanded ? "ml-64" : "ml-20"
        }`}
      >
        <div className="py-8 px-7">
          <h1 className="text-4xl pd-30 tracking-tight">
            {selectedList?.listName}
          </h1>
          <div className="container mx-auto pt-10">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allActiveItems?.map((item) => (
                <ItemCard
                  key={item._id}
                  itemName={item.itemName}
                  image={bag}
                  description={item.description}
                  amount={item.amount}
                  isPinned={item.isPinned}
                  onDelete={() => {}}
                  onEdit={() => {}}
                  onPinNote={() => {}}
                />
              ))}
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
