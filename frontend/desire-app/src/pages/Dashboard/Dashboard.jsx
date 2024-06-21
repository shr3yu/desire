import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Home/Sidebar";
import ItemCard from "../../components/Home/ItemCard/ItemCard";
import bag from "../../components/Backdrop/Backdrop-images/bag.JPG";
import ItemEditPopup from "../../components/Home/ItemCard/ItemEditPopup";
import Modal from "react-modal";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstancs";
import EmptyCard from "../../components/Home/ItemCard/EmptyCard";
import imageReplace from "../../components/Home/List/List-icons/image.jpg";
import UserEditPopup from "../../components/Home/UserEditPopup";

export const Dashboard = () => {
  const [expanded, setExpanded] = useState(true);
  const [openEditItemPopupModal, setOpenEditItemModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openUserPopupModal, setOpenUserModal] = useState({
    isShown: false,
    data: null,
  });
  const navigate = useNavigate();

  // On user edit
  const handleUserEdit = () => {
    //show the usepopup
    console.log("hello");
    setOpenUserModal({ isShown: true, data: userInfo });
    console.log(openUserPopupModal);
  };

  //to edit item card
  const handleEdit = (item) => {
    setOpenEditItemModal({ isShown: true, data: item, type: "edit" });
  };

  //to delete item card
  const deleteItemCard = async (item) => {
    try {
      const response = await axiosInstance.delete(`/delete-item/${item?._id}`);
      getAllActiveItems(selectedList?._id);
    } catch (error) {
      if (error.response && error.response.data && error.reponse.data.message) {
        console.log(error.response.data.message);
      }
    }
  };

  //to pin item card
  const updatePinned = async (item) => {
    try {
      const response = await axiosInstance.put(`/pin-item/${item?._id}`, {
        isPinned: false,
      });
      getAllActiveItems(selectedList?._id);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getAllLists = async (list) => {
    try {
      const response = await axiosInstance.get("/get-lists");

      if (response.data && response.data.lists) {
        setAllLists(response.data.lists);
        setSelectedList(list || response.data.lists[0]); //inital active list is the first one recieved
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

  //calculate total amount of list
  const totalAmount = () => {
    let total = 0;
    allActiveItems?.forEach((item) => (total = Number(item.amount) + total));
    return total;
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

  useEffect(() => {
    // This useEffect will run every time `selectedList` is updated
    console.log("selectedList updated:", selectedList);
  }, [selectedList]);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Sidebar
        expanded={expanded}
        toggleSidebar={toggleSidebar}
        onChange={changeSelectedList}
        userInfo={userInfo}
        allLists={allLists}
        setAllLists={setAllLists}
        activeList={selectedList}
        getAllLists={getAllLists}
        handleUserEdit={handleUserEdit}
      />
      <div
        className={`flex-grow p-4 transition-all duration-100 ${
          expanded ? "ml-64" : "ml-20"
        }`}
      >
        <div className="py-8 px-7">
          <div className="flex items-center">
            <h1 className="text-4xl pd-30 tracking-tight">
              {selectedList?.listName}
            </h1>
            <h1 className="text-4xl p-2 pl-8 text-secondary">
              ${totalAmount()}
            </h1>
          </div>

          <div className="container mx-auto pt-10">
            {allActiveItems?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allActiveItems?.map((item) => (
                  <ItemCard
                    key={item._id}
                    itemName={item.itemName}
                    image={item.image == null ? imageReplace : item.image}
                    description={item.description}
                    amount={item.amount}
                    isPinned={item.isPinned}
                    onDelete={() => deleteItemCard(item)}
                    onEdit={() => handleEdit(item)}
                    onPinNote={() => updatePinned(item)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard />
            )}
          </div>

          {selectedList ? (
            <button
              className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-secondary fixed right-10 bottom-10"
              onClick={() => {
                setOpenEditItemModal({
                  isShown: true,
                  type: "add",
                  data: null,
                });
              }}
            >
              <MdAdd className="text-[32px] text-white" />
            </button>
          ) : null}

          {/* popup for item edit/add */}
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
              list={selectedList}
              getAllActiveItems={getAllActiveItems}
            />
          </Modal>

          {/* Popup for changing user information */}
          <Modal
            isOpen={openUserPopupModal.isShown}
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
            className="w-screen max-w-3xl h-auto max-h-[50%] bg-white rounded-md overflow-auto mx-2 sm:mx-auto mt-0 sm:mt-14"
          >
            <UserEditPopup
              userData={openUserPopupModal.data}
              onClose={() =>
                setOpenUserModal({
                  isShown: false,
                  data: null,
                })
              }
              getUserInfo={getUserInfo}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};
