import React from "react";

export default function CloseButton({ itemToClose, closeItem }) {
  const handleClick = () => {
    closeItem(false);
  };

  return (
    <button onClick={(e) => handleClick(e)} aria-label="close-button">
      close
    </button>
  );
}
