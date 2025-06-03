"use client";
import React, { use, useState } from "react";
import ProjectHeader from "../ProjectHeader";
import BoardView from "../BoardView";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Project = ({ params }: Props) => {
  const { id } = use(params);
  console.log("Project ID:", typeof id);
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* Modal New Task */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default Project;
