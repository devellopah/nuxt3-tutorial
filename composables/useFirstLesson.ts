import type { LessonWithPath } from "~/types/course"


export default () => {
  const { chapters } = useCourse();
  return chapters[0].lessons[0] as LessonWithPath;
};