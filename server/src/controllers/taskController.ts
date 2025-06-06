import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { projectId } = req.query;
    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId ? Number(projectId) : undefined,
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: `Error fetching tasks: ${error.message}` });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      description,
      status,
      priority,
      tags,
      startDate,
      dueDate,
      points,
      projectId,
      authorUserId,
      assignedUserId,
    } = req.body;
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    res.status(201).json(newTask);
  } catch (error: any) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: `Error creating task: ${error.message}` });
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },
    });
    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ error: `Error updating task: ${error.message}` });
  }
};
