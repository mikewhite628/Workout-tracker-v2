import React from "react";
import Link from "next/link";

import { useUser } from "@auth0/nextjs-auth0/client";

export default function Nav() {
  const { user, error, isLoading } = useUser();

  return (
    <div>
      <nav className="flex w-100 justify-between p-3 bg-slate-100">
        <div>
          <Link href="/">Home</Link>
        </div>
        <ul className="flex flex-row justify between ">
          <li className="mr-5 ">
            {user ? (
              <Link href={`/dashboard/${user.nickname}`}>Dashboard</Link>
            ) : null}
          </li>
          <li className="mr-5">
            <Link href="/Workout">Workouts</Link>
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
