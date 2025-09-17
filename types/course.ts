import { type Lesson, Prisma } from '@prisma/client'

const lessonSelect = Prisma.validator<Prisma.LessonDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
  }
})

export type LessonOutline = Prisma.LessonGetPayload<typeof lessonSelect> & { path: string }

const chapterSelect = Prisma.validator<Prisma.ChapterDefaultArgs>()({
  select: {
    title: true,
    slug: true,
    number: true,
    lessons: lessonSelect
  }
})

export type ChapterOutline = Omit<Prisma.ChapterGetPayload<typeof chapterSelect>, 'lessons'> & { lessons: LessonOutline[] }

const courseSelect = Prisma.validator<Prisma.CourseDefaultArgs>()({
  select: {
    title: true,
    chapters: chapterSelect
  }
})

export type CourseOutline = Omit<Prisma.CourseGetPayload<typeof courseSelect>, 'chapter'> & { chapters: ChapterOutline[] }

export type LessonWithPath = Lesson & {
  path: string,
}

export type ChapterProgress = {
  [key: string]: boolean;
}

export type CourseProgress = {
  [key: string]: ChapterProgress;
}

// Export the selectors for use in server code
export { lessonSelect, chapterSelect, courseSelect }
