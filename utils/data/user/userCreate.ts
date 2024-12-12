"use server"
import { PrismaClient } from '@prisma/client'
import { userCreateProps } from "@/utils/types";

const prisma = new PrismaClient()

export const userCreate = async ({
  email,
  first_name,
  last_name,
  profile_image_url,
  user_id,
}: userCreateProps) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        firstName: first_name,
        lastName: last_name,
        profileImageUrl: profile_image_url,
        clerkId: user_id,
      },
    });
    console.log("Created user:", user);
    return user;
  } catch (error: any) {
    console.error("Error creating user:", error);
    throw new Error(error.message);
  } finally {
    await prisma.$disconnect();
  }
};