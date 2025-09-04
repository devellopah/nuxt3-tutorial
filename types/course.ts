import { type Lesson, Prisma } from '@prisma/client'

const lessonSelect = Prisma.validator<Prisma.LessonDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
  }
})

export type LessonOutline = Prisma.LessonGetPayload<typeof lessonSelect>

const chapterSelect = Prisma.validator<Prisma.ChapterDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonSelect
  }
})

export type ChapterOutline = Prisma.ChapterGetPayload<typeof chapterSelect>

const courseSelect = Prisma.validator<Prisma.CourseDefaultArgs>()({
  select: {
    title: true,
    chapters: chapterSelect
  }
})

export type CourseOutline = Prisma.CourseGetPayload<typeof courseSelect>

export type LessonWithPath = Lesson & {
  path: string,
}

// Export the selectors for use in server code
export { lessonSelect, chapterSelect, courseSelect }
