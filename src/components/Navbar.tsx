
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export const Navbar = () => {
  const { data: session } = useSession();
  return (
    <div className="w-screen h-12 sticky top-0 flex justify-between items-center bg-slate-950">
      <nav className="flex-1">
        <ul className="flex">
          <li>Home</li>
        </ul>
      </nav>
      <div className="flex justify-between items-center">
        {session ? (
          <div className="flex items-center">
            {session.user?.image && (
              <div className="w-12 h-12 rounded-full">
                <Image
                  src={session.user.image}
                  width={50}
                  height={50}
                  alt={session.user.name ?? "you"}
                />
              </div>
            )}
            <button onClick={() => signOut()}>Log out</button>
          </div>
        ) : (
            <button onClick={() => signOut()}>Log In</button>
        )}
      </div>
    </div>
  );
};
