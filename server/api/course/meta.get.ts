// import type { OutlineLesson, Chapter, OutlineChapter, CourseMeta } from "~/types/course"
// import course from '~/server/courseData'

// export default defineEventHandler((event): CourseMeta => {
//   const outline: OutlineChapter[] = course.chapters.reduce(
//     (prev: OutlineChapter[], next: Chapter) => {
//       const lessons: OutlineLesson[] = next.lessons.map(
//         (lesson) => ({
//           title: lesson.title,
//           slug: lesson.slug,
//           number: lesson.number,
//           path: `/course/chapter/${next.slug}/lesson/${lesson.slug}`,
//         })
//       )

//       const chapter: OutlineChapter = {
//         title: next.title,
//         slug: next.slug,
//         number: next.number,
//         lessons,
//       }

//       return [...prev, chapter]
//     },
//     []
//   )

//   return {
//     title: course.title,
//     chapters: outline
//   }

// })

import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

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

export default defineEventHandler(() =>
  prisma.course.findFirst(courseSelect)
)
