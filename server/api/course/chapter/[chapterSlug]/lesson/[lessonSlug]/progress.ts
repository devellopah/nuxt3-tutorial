import { PrismaClient } from "@prisma/client";
import protectRoute from '~/server/utils/protectRoute';

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  assertMethod(event, ['POST', 'PUT', 'PATCH'])
  protectRoute(event)

  const { chapterSlug, lessonSlug } = event.context.params as {
    chapterSlug: string,
    lessonSlug: string,
  }

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      chapter: {
        slug: chapterSlug
      }
    }
  })

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Lesson not found'
    })
  }

  const { completed } = await readBody(event)

  const { user: { email: userEmail } } = event.context

  return prisma.lessonProgress.upsert({
    where: {
      lessonId_userEmail: {
        lessonId: lesson.id,
        userEmail,
      },
    },
    update: {
      completed,
    },
    create: {
      completed,
      userEmail,
      lesson: {
        connect: {
          id: lesson.id,
        },
      },
    },
  })
})