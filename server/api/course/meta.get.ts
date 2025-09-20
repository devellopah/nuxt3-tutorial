import { PrismaClient } from "@prisma/client";
import { courseSelect, type CourseOutlineServer, type ChapterOutlineServer, type LessonOutlineServer } from "~/types/course";

const prisma = new PrismaClient()

export default defineEventHandler(
  async (): Promise<CourseOutlineServer> => {
    const outline = await prisma.course.findFirst(courseSelect)

    if (!outline) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Course not found'
      })
    }

    const chapters = outline.chapters.map((chapter) => ({
      ...chapter,
      lessons: chapter.lessons.map((lesson) => ({
        ...lesson,
        path: `/course/chapter/${chapter.slug}/lesson/${lesson.slug}`
      })),
    }))

    return {
      ...outline,
      chapters
    }
  })
