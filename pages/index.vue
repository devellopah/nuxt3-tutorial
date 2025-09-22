<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Hero Section -->
      <div class="mb-12">
        <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to the
          <span class="text-indigo-600">Nuxt 3 Tutorial Course</span>
        </h1>
        <p class="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          Master Nuxt 3 with hands-on lessons, from basics to advanced concepts.
          Build modern web applications with Vue.js and Nuxt's powerful features.
        </p>
        <NuxtLink
          :to="firstLesson.path"
          class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Start Your Journey
        </NuxtLink>
      </div>

      <!-- Features Section -->
      <div class="grid md:grid-cols-3 gap-8 mt-16">
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-4xl mb-4">🚀</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Fast Development</h3>
          <p class="text-gray-600">Learn to build applications quickly with Nuxt's conventions and auto-imports.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-4xl mb-4">📚</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Comprehensive Lessons</h3>
          <p class="text-gray-600">Step-by-step tutorials covering routing, state management, and server-side rendering.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div class="text-4xl mb-4">💡</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Real-World Projects</h3>
          <p class="text-gray-600">Apply your knowledge by building practical applications and components.</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-16 text-gray-500">
        <p>Ready to become a Nuxt expert? Let's get started!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const firstLesson = await useFirstLesson();
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
