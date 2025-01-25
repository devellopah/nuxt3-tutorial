<template>
  <div>Waiting for login...</div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const { query, redirectedFrom } = useRoute();
const firstLesson = useFirstLesson();

watch(
  user,
  () => {
    if (user.value) {
      // const to = (query.redirectTo as string) ?? firstLesson.path;
      const to = redirectedFrom ?? firstLesson.path;
      console.log('confirm: to', to)

      return navigateTo(to, {
        replace: true,
      });
    }
  },
  { immediate: true }
);
</script>