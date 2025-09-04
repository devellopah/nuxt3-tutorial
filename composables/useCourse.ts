import { type CourseOutline } from '~/types/course';

export default async () => useFetchWithCache<CourseOutline>(`/api/course/meta`)