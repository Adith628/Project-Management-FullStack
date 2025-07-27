import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        tasks: true,
      },
    });

    const projectsWithStatus = projects.map((project) => {
      const allTasksCompleted =
        project.tasks.length > 0 &&
        project.tasks.every((task) => task.status === "Completed");

      return {
        ...project,
        status: allTasksCompleted ? "complete" : "incomplete",
      };
    });

    res.status(200).json(projectsWithStatus);
  } catch (error: any) {
    res.status(500).json({ error: `Error fetching project: ${error.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res.status(500).json({ error: `Error creating project: ${error.message}` });
  }
};
