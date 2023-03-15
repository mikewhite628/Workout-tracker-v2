import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";

export default function CloseButton({ itemToClose, closeItem }) {
  const handleClick = () => {
    closeItem(false);
  };

  return (
    <button onClick={(e) => handleClick(e)} aria-label="close-button">
      <FontAwesomeIcon icon={faXmark} width={18} />
    </button>
  );
}
