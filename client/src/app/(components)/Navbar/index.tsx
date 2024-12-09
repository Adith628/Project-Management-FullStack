import React from "react";
import { Menu, Moon, Search, Settings, Sun } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      {/* search bar */}
      <div className="flex items-center gap-8">
        {!isSidebarCollapsed ? null : (
          <button
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-5 w-5 cursor-pointer dark:text-white" />
          </button>
        )}
        <div className="flex h-min w-[200px] items-center overflow-hidden rounded bg-gray-100 pl-3 dark:bg-gray-700 dark:text-white dark:placeholder-white">
          <Search className="mr-2 h-5 w-5 cursor-pointer dark:bg-gray-700 dark:text-white dark:placeholder-white" />
          <input
            type="search"
            placeholder="Search..."
            className="w-full border-none bg-gray-100 p-2 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
          />
        </div>
      </div>

      {/* Icons */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className={
            isDarkMode
              ? `rounded p-2 dark:hover:bg-gray-700`
              : `rounded p-2 dark:hover:bg-gray-100`
          }
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 cursor-pointer dark:text-white" />
          ) : (
            <Moon className="h-5 w-5 cursor-pointer dark:text-white" />
          )}
        </button>
        <Link
          href="/settings"
          className={`size-min ${
            isDarkMode
              ? "rounded p-2 dark:hover:bg-gray-700"
              : "p2 rounded dark:hover:bg-gray-100"
          } `}
          // className="size-min rounded p-2 hover:bg-gray-100"
        >
          <Settings className="h-5 w-5 cursor-pointer dark:text-white" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
      </div>
    </div>
  );
};

export default Navbar;
