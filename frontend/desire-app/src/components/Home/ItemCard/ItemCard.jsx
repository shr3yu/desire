import React from "react";
import { MdOutlinePushPin, MdCreate, MdDelete} from "react-icons/md";

const ItemCard = ({
  itemName,
  image,
  description,
  amount,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden p-4 bg-white hover:shadow-xl transition-all ease-in-out w-full max-w-xs md:max-w-md lg:max-w-lg flex flex-col md:flex-row items-start">
      <img src={image} alt={itemName} className="w-full h-48 md:w-32 md:h-32 object-cover rounded-lg mb-4 md:mb-0 md:mr-4" />
      <div className="flex-grow flex flex-col truncate space-y-2 w-full">
        <h6 className="text-2xl font-medium no-hover-scroll ">{itemName}</h6>
        <p className="text-sm text-slate-600 no-hover-scroll">{description?.slice(0, 60)}</p>
        <div className="text-xl font-semibold no-hover-scroll">${amount}</div>
      </div>
      <div className="flex flex-row  md:flex-col items-center gap-2 ml-auto pl-3 pt-6">
        <MdOutlinePushPin className= {`icon-btn ${isPinned ? 'text-primary' : ''}`} onClick={onPinNote} />
        <MdCreate className="icon-btn" onClick={onEdit} />
        <MdDelete className="icon-btn " onClick={onDelete} />
      </div>
    </div>
  );
};

export default ItemCard;
