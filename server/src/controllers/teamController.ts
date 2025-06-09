import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTeams = async (req: Request, res: Response): Promise<void> => {
  try {
    const teams = await prisma.team.findMany();

    const teamWithUsernames = await Promise.all(
      teams.map(async (team: any) => {
        const productOwner = await prisma.user.findUnique({
          where: { userId: team.productOwnerUserId },
          select: { username: true },
        });
        const projectManager = await prisma.user.findUnique({
          where: { userId: team.projectManagerUserId },
          select: { username: true },
        });
        return {
          ...team,
          productOwnerUsername: productOwner?.username || null,
          projectManagerUsername: projectManager?.username || null,
        };
      })
    );

    res.status(200).json(teamWithUsernames);
  } catch (error: any) {
    res.status(500).json({ error: `Error fetching teams: ${error.message}` });
  }
};
