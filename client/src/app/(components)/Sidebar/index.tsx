"use client";
import { useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Icon,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(false);

  const dispatch = useDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300
  h-full z-40 dark:bg-black overflow-y-auto bg-white 
  ${isSidebarCollapsed ? "w-0" : "w-64"}
  `;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-900 dark:text-white">
            PROMAN
          </div>
          {isSidebarCollapsed ? null : (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 dark:text-gray-100" />
            </button>
          )}
        </div>
        {/* TEAM */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src="/logo.png"
            alt="logo"
            width={30}
            unoptimized
            height={30}
          />
          <div className="">
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              PRO TEAM
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] size-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full">
          <SidebarLink
            href="/dashboard"
            icon={Home}
            label="Dashboard"
            isCollapsed={false}
          />
          <SidebarLink
            href="/timeline"
            icon={Briefcase}
            label="Timeline"
            isCollapsed={false}
          />
          <SidebarLink
            href="/search"
            icon={Search}
            label="Search"
            isCollapsed={false}
          />
          <SidebarLink
            href="/settings"
            icon={Settings}
            label="Settings"
            isCollapsed={false}
          />
          <SidebarLink
            href="/users"
            icon={User}
            label="Users"
            isCollapsed={false}
          />
          <SidebarLink
            href="/teams"
            icon={Users}
            label="Teams"
            isCollapsed={false}
          />
        </nav>

        {/* PROJECTS LINKS */}
        <button
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          onClick={() => setShowProjects((prev) => !prev)}
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        {/* PROJECTS LIST */}

        {/* PRIORITIES LINKS */}
        <button
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
          onClick={() => setShowPriority((prev) => !prev)}
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              href="/priority/urgent"
              icon={AlertCircle}
              label="Urgent"
              isCollapsed={false}
            />
            <SidebarLink
              href="/priority/high"
              icon={ShieldAlert}
              label="High"
              isCollapsed={false}
            />
            <SidebarLink
              href="/priority/medium"
              icon={AlertTriangle}
              label="Medium"
              isCollapsed={false}
            />
            <SidebarLink
              href="/priority/low"
              icon={AlertOctagon}
              label="Low"
              isCollapsed={false}
            />
            <SidebarLink
              href="/priority/backlog"
              icon={Layers3}
              label="Backlog"
              isCollapsed={false}
            />
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
