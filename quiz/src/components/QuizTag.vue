<script setup lang="ts">
import { onMounted } from 'vue'

const props = defineProps({
  quiz: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['quizPass'])

function passQuiz (answerIndex: number) {
  if (props.quiz.correctAnswer === answerIndex) {
    console.log('correct')
  } else {
    console.log('incorrect')
  }
  emit('quizPass', props.quiz.id)
}
</script>

<template>
  <div>
    <div>{{ props.quiz.question }}</div>
    <div v-for="(answer, index) in props.quiz.answers" :key="index"  @click="passQuiz(index)"> {{ answer }}</div>
  </div>
</template>

<style scoped>

</style>
