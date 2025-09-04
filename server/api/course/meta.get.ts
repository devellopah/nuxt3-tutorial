import { PrismaClient } from "@prisma/client";
import { courseSelect } from "~/types/course";

const prisma = new PrismaClient()

export default defineEventHandler(() =>
  prisma.course.findFirst(courseSelect)
)
