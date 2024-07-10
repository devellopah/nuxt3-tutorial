<template>
  <h2>chapter {{ chapter.title}}</h2>
  <h3>lesson {{ lesson.title }}</h3>
  <p>This is a lesson text</p>
</template>

<script setup>
const course = useCourse()
const route = useRoute()
console.log(course)

const chapter = computed(() => {
  return course.chapters.find(
    chapter => chapter.slug === route.params.chapterSlug
  )
})

const lesson = computed(() => {
  return chapter.value.lessons.find(
    lesson => lesson.slug === route.params.lessonSlug
  )
})
</script>