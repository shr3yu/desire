import React, { useState } from "react";
import Sidebar from "../../components/Home/Sidebar";
import ItemCard from "../../components/Home/ItemCard/ItemCard";
import bag from "../../components/Backdrop/Backdrop-images/bag.JPG";

export const Dashboard = () => {
  const [expanded, setExpanded] = useState(true);

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
            <div className="grid grid-cols-3 gap-4">
              <ItemCard
                itemName="bag"
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
        </div>
      </div>
    </>
  );
};
