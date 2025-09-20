import { type Lesson, Prisma } from '@prisma/client'

const lessonSelect = Prisma.validator<Prisma.LessonDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
  }
})

export type LessonOutlineServer = Prisma.LessonGetPayload<typeof lessonSelect> & { path: string }

const chapterSelect = Prisma.validator<Prisma.ChapterDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonSelect
  }
})

export type ChapterOutlineServer = Omit<Prisma.ChapterGetPayload<typeof chapterSelect>, 'lessons'> & { lessons: LessonOutlineServer[] }

const courseSelect = Prisma.validator<Prisma.CourseDefaultArgs>()({
  select: {
    title: true,
    chapters: chapterSelect
  }
})

export type CourseOutlineServer = Omit<Prisma.CourseGetPayload<typeof courseSelect>, 'chapter'> & { chapters: ChapterOutlineServer[] }

// Export the selectors for use in server code
export { lessonSelect, chapterSelect, courseSelect }
