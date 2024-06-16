import React from "react";
import ListItem from "./ListItem";
//ICON imports
import clothes from "./List-icons/clothes.JPG";
import giftbag from "./List-icons/giftbag.JPG";
import love from "./List-icons/love.JPG";
import makeup from "./List-icons/makeup.JPG";
import travel from "./List-icons/travel.JPG";

const List = ({ expanded, allLists, onChange, activeList}) => {
  return (
    <div className="space-y-2 mt-4">
      {allLists.map((list) => (
        <ListItem
          key= {list?._id}
          listId={list?._id}
          icon={clothes}
          name={list.listName}
          expanded={expanded}
          active= {list?._id === activeList}
          onChange = {onChange}
        />
      ))}
    </div>
  );
};

export default List;
