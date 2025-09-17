import protectRoute from '~/server/utils/protectRoute';
import { PrismaClient } from "@prisma/client";
import type { ChapterOutline, ChapterProgress, CourseProgress, LessonOutline } from '~/types/course';

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  protectRoute(event)

  const {
    user: { email: userEmail },
  } = event.context

  const userProgress = await prisma.lessonProgress.findMany(
    {
      where: {
        userEmail,
        lesson: {
          chapter: {
            course: {
              id: 1,
            },
          },
        },
      },
      select: {
        completed: true,
        lesson: {
          select: {
            slug: true,
            chapter: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    }
  )

  const courseOutline = await $fetch('/api/course/meta')

  if (!courseOutline) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Course outline not found'
    })
  }

  return courseOutline.chapters.reduce((
    courseProgress: CourseProgress,
    chapter: ChapterOutline
  ) => {
    courseProgress[chapter.slug] = chapter.lessons.reduce((
      chapterProgress: ChapterProgress,
      lesson: LessonOutline
    ) => {
      chapterProgress[lesson.slug] = userProgress.find((progress) =>
        progress.lesson.slug === lesson.slug &&
        progress.lesson.chapter.slug === chapter.slug)?.completed || false

      return chapterProgress
    }, {})

    return courseProgress
  }, {})
})