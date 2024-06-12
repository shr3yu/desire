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
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <img src={image} className="w-12 h-12 " />
          <h6 className="text-2xl font-medium pt-4">{itemName}</h6>
        </div>

        <MdOutlinePushPin className={`icon-btn`} onClick={onPinNote} />
      </div>

      <p className="text-xs text-slate-600 mt-2">{description?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-1">
        <div className="text-xs text-slate-500"> ${amount}</div>
        <div className="flex items-center gap-2">
          <MdCreate className="icon-btn" onClick={onEdit} />
          <MdDelete className="icon-btn" onClick={onDelete}/>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
