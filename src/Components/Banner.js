import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Banner() {
  const { user } = useUser();

  return (
    <div className="flex flex-row justify-around p-12 items-center mb-12 w-100">
      <div className="flex flex-col justify-center">
        <h3 className="mb-3">{`Your AI personal trailer has arrived!`}</h3>
        {user ? (
          <Link href={`/dashboard/${user.nickname}`} className="btn">
            {"Get Started"}
          </Link>
        ) : (
          <Link href="/api/auth/login" className="btn">
            {"Login to Get Started "}
          </Link>
        )}
      </div>
      <div className="banner-img max-md:hidden">
        <Image src="/lift1.webp" alt="deadlift" width={250} height={250} />
      </div>
    </div>
  );
}
