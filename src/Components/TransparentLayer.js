import React, { useEffect, useState } from "react";

export default function TransparentLayer({ addingWorkout }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 ${
        addingWorkout ? "block" : "hidden"
      }`}
    ></div>
  );
}
