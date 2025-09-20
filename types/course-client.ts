// Client-safe types without Prisma dependencies
export type LessonOutline = {
  title: string
  slug: string
  number: number
  path: string
}

export type ChapterOutline = {
  title: string
  slug: string
  number: number
  lessons: LessonOutline[]
}

export type CourseOutline = {
  title: string
  chapters: ChapterOutline[]
}

export type LessonWithPath = {
  id: number
  title: string
  slug: string
  number: number
  downloadUrl: string
  videoId: number
  text: string
  sourceUrl?: string | null
  chapterId: number
  createdAt: Date
  updatedAt: Date
  path: string
}

export type ChapterProgress = {
  [key: string]: boolean;
}

export type CourseProgress = {
  [key: string]: ChapterProgress;
}
