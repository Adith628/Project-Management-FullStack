import Modal from "@/components/Modal";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string | null; // Assuming you want to pass projectId for task creation
};

const ModalNewTask = ({ isOpen, onClose, projectId = null }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Low);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [projectID, setProjectID] = useState("  ");

  const handleSubmit = async () => {
    if (!title || !authorUserId || !(projectId !== null || projectID)) return;
    try {
      const formattedStartDate = formatISO(new Date(startDate), {
        representation: "complete",
      });
      const formattedDueDate = formatISO(new Date(dueDate), {
        representation: "complete",
      });

      await createTask({
        title,
        description,
        startDate: formattedStartDate,
        dueDate: formattedDueDate,
        status,
        priority,
        tags,
        projectId: projectId !== null ? Number(projectId) : Number(projectID), // Assuming projectId is passed as a prop
        authorUserId: Number(authorUserId) || undefined,
        assignedUserId: Number(assignedUserId) || undefined,
      });

      // Reset all fields
      setTitle("");
      setDescription("");
      setStatus(Status.ToDo);
      setPriority(Priority.Low);
      setTags("");
      setStartDate("");
      setDueDate("");
      setAuthorUserId("");
      setAssignedUserId("");
      onClose();
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const isFormValid = () => {
    console.log("Validating form...");
    console.log("Title:", title);
    console.log("Author User ID:", authorUserId);
    console.log("Project ID:", projectId, "or ProjectID:", projectID);

    return title && authorUserId;
  };

  const inputStyles =
    "w-full rounded-lg border border-gray-300 bg-white p-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white";

  const selectStyles =
    "w-full rounded-lg border border-gray-300 bg-white p-3 text-sm shadow-sm transition focus:border-blue-500 focus:outline-none dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white";

  const labelStyles =
    "mb-1 text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div>
          <label className={labelStyles}>Title</label>
          <input
            type="text"
            className={inputStyles}
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelStyles}>Description</label>
          <textarea
            className={`${inputStyles} resize-none`}
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          ></textarea>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelStyles}>Status</label>
            <select
              className={selectStyles}
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              {Object.values(Status).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelStyles}>Priority</label>
            <select
              className={selectStyles}
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
            >
              {Object.values(Priority).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelStyles}>Tags (comma separated)</label>
          <input
            type="text"
            className={inputStyles}
            placeholder="e.g., frontend, urgent"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <label className={labelStyles}>Start Date</label>
            <input
              type="date"
              className={inputStyles}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className={labelStyles}>Due Date</label>
            <input
              type="date"
              className={inputStyles}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelStyles}>Author User ID</label>
            <input
              type="number"
              className={inputStyles}
              placeholder="Enter author ID"
              value={authorUserId}
              onChange={(e) => setAuthorUserId(e.target.value)}
            />
          </div>
          <div>
            <label className={labelStyles}>Assigned User ID</label>
            <input
              type="number"
              className={inputStyles}
              placeholder="Enter assignee ID"
              value={assignedUserId}
              onChange={(e) => setAssignedUserId(e.target.value)}
            />
          </div>
        </div>
        {projectId === null && (
          <div>
            <label className={labelStyles}>Project ID</label>
            <input
              type="number"
              className={inputStyles}
              placeholder="Enter project ID"
              value={projectID}
              onChange={(e) => setProjectID(e.target.value)}
            />
          </div>
        )}

        <button
          type="submit"
          className={`w-full rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 dark:focus:ring-offset-dark-secondary ${
            isLoading || !isFormValid() ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={isLoading || !isFormValid()}
        >
          {isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewTask;
