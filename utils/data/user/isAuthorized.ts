"use server";
import { clerkClient } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const isAuthorized = async (
  userId: string
): Promise<{ authorized: boolean; message: string, data: any }> => {
  const result = await clerkClient.users.getUser(userId);
  if (!result) {
    return {
      authorized: false,
      message: "User not found",
      data: {}
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: userId
      }
    });

    if (user) {
      return {
        authorized: true,
        message: "User is authorized",
        data: user
      };
    }

    return {
      authorized: false,
      message: "User is not subscribed",
      data: {}
    };
  } catch (error: any) {
    return {
      authorized: false,
      message: error.message,
      data: {}
    };
  }
};