"use client";
import React, { useState } from "react";
import { Priority, Task, useGetTasksByUserQuery } from "../../../state/api";
import { useAppSelector } from "@/app/redux";
import ModalNewTask from "@/components/ModalNewTask";
import Header from "@/components/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { dataGridClassNames } from "@/lib/utils";
import { dataGridSxStyles } from "../../../lib/utils";

type Props = {
  priority: Priority;
};
const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 130,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 130,
  },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value?.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value?.username || "Unassigned",
  },
];

const ReusablePriorityPage = ({ priority }: Props) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  const userId = 1; // Replace with actual user ID logic
  const {
    data: tasks,
    isLoading,
    isError: isTaskError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const filteredTasks = tasks?.filter((task: Task) => {
    return task.priority === priority;
  });

  if (isTaskError || !tasks) return <div>Error loading tasks</div>;
  if (isLoading) return <div>Loading tasks...</div>;

  return (
    <div className="m-5 p-4">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority age"
        buttonComponent={
          <button
            onClick={() => setIsModalNewTaskOpen(true)}
            className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Add Task
          </button>
        }
      />
      <div className="mb-4 flex justify-start">
        <button
          className={`px-4 py-2 ${view === "list" ? "bg-gray-300" : "bg-white"} rounded-l`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`px-4 py-2 ${view === "table" ? "bg-gray-300" : "bg-white"} rounded-r`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div className="">Loading...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <div
              key={task.id}
              className={`rounded-lg border p-4 ${isDarkMode ? "border-[#323539] bg-[#1D1F21] text-white" : "bg-white text-black"}`}
            >
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <span className="text-sm text-gray-500">
                Priority: {task.priority}
              </span>
            </div>
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
