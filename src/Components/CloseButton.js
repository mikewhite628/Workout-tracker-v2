import React from "react";

export default function CloseButton({ closeItem }) {
  const handleClick = () => {
    closeItem(false);
  };

  return (
    <button onClick={(e) => handleClick(e)} aria-label="close-button">
      <i class="fa-solid fa-xmark"></i>
    </button>
  );
}
