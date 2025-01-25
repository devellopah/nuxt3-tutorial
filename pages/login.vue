<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ title }}</h1>
    <button
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      @click="login"
    >
      Log in with Github
    </button>
  </div>
</template>

<script setup lang="ts">

const firstLesson = useFirstLesson()
const { title } = useCourse()
const { query, redirectedFrom } = useRoute();
const { auth } = useSupabaseClient();
const user = useSupabaseUser();

watch(
  user,
  () => {
    if (user.value) {
      // const to = (query.redirectTo as string) ?? firstLesson.path;
      const to = redirectedFrom ?? firstLesson.path;
      console.log('login: to', to)

      return navigateTo(to, {
        replace: true,
      });
    }
  },
  { immediate: true }
);

const login = async () => {
  const redirectTo = `${window.location.origin}/confirm`;

  const { data, error } = await auth.signInWithOAuth({
    provider: 'github',
    options: { redirectTo },
  });

  if (error) {
    console.error(error);
  }
};
</script>