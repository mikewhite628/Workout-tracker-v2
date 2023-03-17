import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faTwitter,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { faHeart } from "@fortawesome/pro-solid-svg-icons";
faHeart;

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
          <Link href="/" className="icon text-red-600">
            <FontAwesomeIcon icon={faYoutube} width="36px" />
          </Link>
        </li>
        <li className="mr-2">
          <Link href="/" className="icon text-blue-700">
            <FontAwesomeIcon icon={faTwitter} width="36px" />
          </Link>
        </li>
        <li className="mr-2">
          <Link href="/">
            <FontAwesomeIcon icon={faGithub} width="36px" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
