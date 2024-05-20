<template>
  <q-page class="row items-center justify-evenly">
    <quiz-list/>
  </q-page>
</template>

<script setup lang="ts">
import QuizList from 'components/QuizList.vue'

defineOptions({
  name: 'IndexPage'
})
</script>
