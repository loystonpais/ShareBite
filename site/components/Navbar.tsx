"use client";
import React from "react";
import { Avatar } from "@radix-ui/react-avatar";
import Link from "next/link";

import Cookies from "js-cookie";

const Navbar = () => {
  let email = Cookies.get("shareBiteEmail");

  const getInitials = (email: string) => {
    if (!email) return "U";
    return email.charAt(0).toUpperCase();
  };

  return (
    <>
      <nav className="bg-white h-14 flex justify-between items-center pl-10 pr-10">
        <h1 className="font-black">SHARE BITE</h1>
        <Link href="/login/">
          <div className="flex items-center gap-2">
            <div
              className="rounded-full bg-green-900 hover:bg-green-700 transition-colors
                 w-8 h-8 flex justify-center items-center
                 text-white font-medium"
            >
              {getInitials(email ?? "?")}
            </div>
            {/* Show truncated email or username */}
            <span className="hidden md:block text-sm">
              {email?.split("@")[0] || "User"}
            </span>
          </div>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
