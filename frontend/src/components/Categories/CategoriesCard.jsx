import React from "react";
import "./style.css";
const CategoriesCard = ({ uniqueTypes }) => {
  return (
    <div className="w-full">
      <div className="flex w-full justify-between items-center  px-4">
        {uniqueTypes.map((category) => (
          <div
            key={category}
            className="  flex gap-3 text-center justify-center items-center flex-col "
          >
            <div className="category-item flex h-20 w-20 justify-center items-center rounded-full ">
              <p className="text-2xl"> {category[0]?.toUpperCase()}</p>
            </div>
            <p>{category[0].toUpperCase() + category.slice(1)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesCard;
