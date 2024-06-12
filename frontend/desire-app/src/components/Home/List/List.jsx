import React from 'react'
import ListItem from "./ListItem";
//ICON imports
import clothes from "./List-icons/clothes.JPG"
import giftbag from "./List-icons/giftbag.JPG"
import love from "./List-icons/love.JPG"
import makeup from "./List-icons/makeup.JPG"
import travel from "./List-icons/travel.JPG"

const List = ({expanded}) => {
  return (
    <div className="space-y-2 mt-4">
        <ListItem icon={clothes} name="Clothes" expanded={expanded} active={true} />
        <ListItem icon={giftbag} name="Gift Ideas" expanded={expanded} />
    </div>
  )
}

export default List