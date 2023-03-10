import React from "react";

const ItemProduct = ({name, image, openModal}) => {
  return (
    <div onClick={openModal} className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-3">
      <img src={image} className="h-14 w-14" />
      <span>{name}</span>
    </div>
  );
};

export default ItemProduct;
