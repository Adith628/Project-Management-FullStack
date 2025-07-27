import { Project } from "@/state/api";
import React from "react";

type Props = {
  project: Project;
};

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="rounded border p-4 shadow">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
            project.status === "complete"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {project.status === "complete" ? "Complete" : "Incomplete"}
        </span>
      </p>
    </div>
  );
};

export default ProjectCard;
