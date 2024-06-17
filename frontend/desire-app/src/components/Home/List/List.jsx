import React from "react";
import ListItem from "./ListItem";
//ICON imports
import stary from "./List-icons/Stary.JPG";

const List = ({ expanded, allLists, onChange, activeList, onDelete}) => {
  return (
    <div className="space-y-2 mt-4">
      {allLists.map((list) => (
        <ListItem
          key= {list?._id}
          list={list}
          icon={stary}
          name={list.listName}
          expanded={expanded}
          active= {list?._id == activeList?._id}
          onChange = {onChange}
          onDelete = {onDelete}
        />
      ))}
    </div>
  );
};

export default List;
