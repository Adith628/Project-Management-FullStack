import React from "react";
import { Search, Settings } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* search bar */}
      <div className="flex items-center gap-8">
        <div className="flex h-min w-[200px] items-center overflow-hidden rounded bg-gray-100 pl-3">
          <Search className="mr-2 h-5 w-5 cursor-pointer dark:text-white" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full border-none bg-gray-100 p-2 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center">
        <Link
          href="/settings"
          className="size-min rounded p-2 hover:bg-gray-100"
        >
          <Settings className="h-5 w-5 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
