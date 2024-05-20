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
  let score = 0
  if (props.quiz.correctAnswer === answerIndex) {
    score++
  }
  emit('quizPass', props.quiz.id)
}
</script>

<template>
  <div style="padding: 10px">
    <q-card class="my-card">
      <q-card-section class="bg-purple text-white">
        <div class="text-h6">{{ props.quiz.question }}</div>
      </q-card-section>

      <q-card-actions vertical  >
        <q-btn v-for="(answer, index) in props.quiz.answers" :key="index" @click="passQuiz(index)"
               size="xl"
               style="margin: 20px"
        >
          {{ answer }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style scoped>

</style>
