"use client";
import React, { use, useState } from "react";
import ProjectHeader from "../ProjectHeader";

type Props = {
  params: {
    id: string;
  };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* Modal New Task */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default Project;
