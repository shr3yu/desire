import { VscMenu } from "react-icons/vsc";
import { GoSignOut } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Profile from "./Sidebar-Elements/Profile";
import List from "./List/List";
import AddList from "./List/AddList";
import axiosInstance from "../../utils/axiosInstancs";

const Sidebar = ({
  expanded,
  toggleSidebar,
  onChange,
  userInfo,
  allLists,
  setAllLists,
  activeList,
  getAllLists,
  handleUserEdit
}) => {
  const navigate = useNavigate();

  //If you delete a list
  const onDelete = async (list) => {
    //delete list API call
    try {
      const response = await axiosInstance.delete(`/delete-list/${list._id}`);
      if (response.data && !response.data.error) {
        //render deleted list
        setAllLists((prevLists) =>
          prevLists.filter((item) => item._id !== list._id)
        );
        //set active list to be the first one
        changeSelectedList(allLists[0]);
      }
    } catch (error) {
      console.log(`An unexpected error has occured: ${error}`);
    }
  };

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen ${expanded ? "w-64" : " w-20"}`}
    >
      <nav className="h-full flex flex-col bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 pb-2 flex justify-between items-center">
          {expanded ? (
            <h1 className="text-3xl font-bold tracking-tight">D E S I R E</h1>
          ) : null}
          <button className="icon-button">
            <VscMenu size={24} onClick={toggleSidebar} />
          </button>
        </div>

        <List
          expanded={expanded}
          allLists={allLists}
          onChange={onChange}
          activeList={activeList}
          onDelete={onDelete}
          getAllLists= {getAllLists}
        />
        <AddList
          expanded={expanded}
          allLists={allLists}
          setAllLists={setAllLists}
        />
        <div className="border-t flex justify-center items-center p-4 space-x-3 mt-auto">
          {expanded ? <Profile userInfo={userInfo} handleUserEdit={handleUserEdit} /> : null}
          <button className="icon-button" onClick={onLogout}>
            <GoSignOut size={24} />
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
