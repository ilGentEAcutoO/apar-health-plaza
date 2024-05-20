<script setup lang="ts">
import { useQuasar } from 'quasar'

const props = defineProps({
  quiz: {
    type: Object,
    required: true
  }
})

const $q = useQuasar()

const emit = defineEmits(['quizPass'])

function passQuiz (answerIndex: number) {
  const score = $q.sessionStorage.getItem('currentScore') || '0'
  if (props.quiz.correctAnswerIndex === answerIndex) {
    $q.sessionStorage.set('currentScore', parseInt(score) + 1)
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
