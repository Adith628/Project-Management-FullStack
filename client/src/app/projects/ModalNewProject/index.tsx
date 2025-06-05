import Modal from "@/components/Modal";
import { useCreateProjectMutation } from "@/state/api";
import React, { useEffect, useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;
    try {
      const formattedStartDate = formatISO(new Date(startDate), {
        representation: "complete",
      });
      const formattedEndDate = formatISO(new Date(endDate), {
        representation: "complete",
      });

      await createProject({
        name: projectName,
        description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });
      setProjectName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      onClose();
    } catch (err) {
      console.error("Error creating project:", err);
    }
  };

  const isFormValid = () => {
    return projectName && startDate && endDate;
  };

  const inputStyles =
    "w-full rounded-lg border border-gray-300 bg-white p-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white";

  const labelStyles =
    "mb-1 text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
        <textarea
          className={`${inputStyles} resize-none`}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        ></textarea>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex w-full flex-col">
            <label className={labelStyles} htmlFor="start-date">
              Start Date
            </label>
            <input
              id="start-date"
              type="date"
              className={inputStyles}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="flex w-full flex-col">
            <label className={labelStyles} htmlFor="end-date">
              End Date
            </label>
            <input
              id="end-date"
              type="date"
              className={inputStyles}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 dark:focus:ring-offset-dark-secondary ${
            isLoading || !isFormValid() ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isLoading || !isFormValid()}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
