import Image from "next/image";
import React from "react";

export default function CloseButton({ closeItem }) {
  const handleClick = () => {
    closeItem(false);
  };

  return (
    <button onClick={(e) => handleClick(e)} aria-label="close-button">
      <Image src="/x.svg" width={20} height={20} alt={`close button`} />
    </button>
  );
}
