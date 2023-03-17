import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Nav() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <div className="relative w-100">
      <nav
        className="flex flex-row justify-between w-screen justify-between p-3 fixed top
      0 z-50 bg-white shadow-sm font-semibold"
      >
        <div className="text-blue-700">
          <Link href="/">Home</Link>
        </div>
        <ul className="flex flex-row justify between ">
          <li className="mr-5 ">
            {user ? (
              <Link
                href={`/dashboard/${user.nickname}`}
                className={`${
                  currentRoute === `/dashboard/[username]`
                    ? `text-blue-700 underline`
                    : `text-black`
                } `}
              >
                Dashboard
              </Link>
            ) : null}
          </li>
          <li className="mr-5">
            <Link
              href="/Workout"
              className={`${
                currentRoute === `/Workout`
                  ? `text-blue-700 underline`
                  : `text-black`
              }`}
            >
              Workouts
            </Link>
          </li>
          <li className="mr-5">
            <Link
              href="/Plan"
              className={`${
                currentRoute === "/Plan"
                  ? `text-blue-700 underline`
                  : `text-black`
              }`}
            >
              Workout Plan
            </Link>
          </li>

          <li className="mr-5">
            {user ? (
              <Link href="/api/auth/logout">Logout</Link>
            ) : (
              <Link href="/api/auth/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
