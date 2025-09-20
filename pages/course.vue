<template>

  <div>
    <div class="mb-4 flex justify-between items-center w-full">
      <h1 class="text-3xl">
        <span class="font-medium">
          Course:
          <span class="font-bold">{{ course.title }}</span>
        </span>
      </h1>
      <UserCard />
    </div>
    <div class="flex flex-row justify-center flex-grow">
      <div
        class="prose mr-4 p-8 bg-white rounded-md min-w-[20ch] max-w-[30ch] flex flex-col">
        <h3>Chapters</h3>
        <!-- All the lessons for the course listed here -->
        <div class="space-y-1 mb-4 flex flex-col" v-for="(chapter, index) in course.chapters"
          :key="chapter.slug">
          <h4 class="flex justify-between items-center">
            {{ chapter.title }}
            <ClientOnly>
              <span
                v-if="percentageCompleted && user"
                class="text-emerald-500 text-sm"
              >
              {{ percentageCompleted.chapters[index] }}%
              </span>
            </ClientOnly>
          </h4>
          <NuxtLink v-for="(lesson, index) in chapter.lessons" :key="lesson.slug"
            class="flex flex-row space-x-1 no-underline prose-sm font-normal"
            :to="`/course/chapter/${chapter.slug}/lesson/${lesson.slug}`" :class="{
              'text-blue-500': `/course/chapter/${chapter.slug}/lesson/${lesson.slug}` === $route.fullPath,
              'text-grey-500': `/course/chapter/${chapter.slug}/lesson/${lesson.slug}` !== $route.fullPath,
            }">
            <span class="text-gray-500">{{ index + 1 }}.</span>
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
        <div
          v-if="percentageCompleted"
          class="mt-8 text-sm font-medium text-gray-500 flex justify-between"
        >
          Course completion:
          <ClientOnly>
            <span>
              {{ Number(percentageCompleted.course).toFixed(0) }}%
            </span>
          </ClientOnly>
        </div>
      </div>
      <div class="prose p-12 bg-white rounded-md w-[65ch]">
        <NuxtPage></NuxtPage>
      </div>
    </div>

  </div>

</template>

<script setup>

import { useCourseProgress } from '~/stores/courseProgress'
import { storeToRefs } from 'pinia';


const user = useSupabaseUser()
const course = await useCourse()
const store = useCourseProgress()

const { percentageCompleted } = storeToRefs(store)

store.initialize()
</script>