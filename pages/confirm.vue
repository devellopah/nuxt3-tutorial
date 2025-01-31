<template>
  <div>Waiting for login...</div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
// const { query } = useRoute();
const cookieName = useRuntimeConfig().public.supabase.cookieName
const redirectPath = useCookie(`${cookieName}-redirect-path`).value
const firstLesson = useFirstLesson();


watch(user, () => {
  if (user.value) {
      // Clear cookie
      useCookie(`${cookieName}-redirect-path`).value = null
      // Redirect to path
      return navigateTo(redirectPath || firstLesson.path);
  }
}, { immediate: true })

// watch(
//   user,
//   () => {
//     if (user.value) {
//       const to = (query.redirectTo as string) ?? firstLesson.path;
//       console.log('confirm: to', to)

//       return navigateTo(to, {
//         replace: true,
//       });
//     }
//   },
//   { immediate: true }
// );
</script>