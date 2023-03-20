import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col mt-12 py-12 mx-4">
      <div className="mb-1 flex flex-row">
        <span>{`Built by `}</span>
        <Link
          href="https://michaelwhite.dev"
          className="font-bold text-blue-700 underline ml-1"
        >
          {` Michael White`}
        </Link>
      </div>
      <ul className="flex flex-row items-center">
        <li className="mr-2">
          <i class="fa-brands fa-youtube"></i>
        </li>
        <li className="mr-2">
          <i class="fa-brands fa-twitter"></i>
        </li>
        <li className="mr-2">
          <i class="fa-brands fa-github"></i>
        </li>
      </ul>
    </div>
  );
}
