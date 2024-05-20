<script setup lang='ts'>
import QuizTag from 'components/QuizTag.vue'
import { computed, onMounted, ref } from 'vue'

const quiz = ref([
  {
    id: 1,
    question: 'What is Doraemon\'s main color?',
    answers: ['Red', 'Blue', 'Light-Blue', 'Yellow'],
    correctAnswerIndex: 2
  },
  {
    id: 2,
    question: 'What year was Doraemon first introduced?',
    answers: ['1970', '1969', '1980', '1973'],
    correctAnswerIndex: 1
  },
  {
    id: 3,
    question: 'Who created the Doraemon series?',
    answers: ['Osamu Tezuka', 'Akira Toriyama', 'Fujiko F. Fujio', 'Hayao Miyazaki'],
    correctAnswerIndex: 2
  },
  {
    id: 4,
    question: 'What is the name of Doraemon\'s best friend?',
    answers: ['Suneo', 'Nobita', 'Gian', 'Shizuka'],
    correctAnswerIndex: 1
  },
  {
    id: 5,
    question: 'From which century did Doraemon come?',
    answers: ['20th Century', '21st Century', '22nd Century', '23rd Century'],
    correctAnswerIndex: 2
  },
  {
    id: 6,
    question: 'What kind of gadget is the "Takecopter"?',
    answers: ['Flying Gadget', 'Time Travel Gadget', 'Healing Gadget', 'Invisibility Gadget'],
    correctAnswerIndex: 0
  },
  {
    id: 7,
    question: 'What is the name of Doraemon\'s sister?',
    answers: ['Mii-chan', 'Nobiko', 'Dorami', 'Lola'],
    correctAnswerIndex: 2
  },
  {
    id: 8,
    question: 'Who is Nobita\'s love interest?',
    answers: ['Dorami', 'Shizuka', 'Jaiko', 'Haruna'],
    correctAnswerIndex: 1
  },
  {
    id: 9,
    question: 'What is the color of Doraemon\'s sister, Dorami?',
    answers: ['Blue', 'Yellow', 'Pink', 'Green'],
    correctAnswerIndex: 1
  },
  {
    id: 10,
    question: 'What tool does Doraemon use to enter different locations instantly?',
    answers: ['Anywhere Door', 'Bamboo Copter', 'Time Machine', 'Translation Jelly'],
    correctAnswerIndex: 0
  },
  {
    id: 11,
    question: 'Where is Doraemon originally from?',
    answers: ['A factory in the future', 'A magical forest', 'A parallel universe', 'Junkyard'],
    correctAnswerIndex: 0
  },
  {
    id: 12,
    question: 'What is Nobita\'s key personality trait?',
    answers: ['Brave', 'Lazy', 'Intelligent', 'Aggressive'],
    correctAnswerIndex: 1
  },
  {
    id: 13,
    question: 'What is Gian\'s real name?',
    answers: ['Takeshi Gouda', 'Hidetoshi Dekisugi', 'Suneo Honekawa', 'Tsuneo Gouda'],
    correctAnswerIndex: 0
  },
  {
    id: 14,
    question: 'Which gadget allows Nobita to fly?',
    answers: ['Anywhere Door', 'Takecopter', 'Time Machine', 'Tiny Light'],
    correctAnswerIndex: 1
  },
  {
    id: 15,
    question: 'What is the primary theme of Doraemon?',
    answers: ['Space Exploration', 'Magical Adventure', 'Science Fiction', 'Historical Events'],
    correctAnswerIndex: 2
  },
  {
    id: 16,
    question: 'What shape is Doraemon\'s Pocket?',
    answers: ['Round', 'Square', 'Rectangular', 'Oval'],
    correctAnswerIndex: 0
  },
  {
    id: 17,
    question: 'What is Doraemon\'s favorite food?',
    answers: ['Takoyaki', 'Onigiri', 'Dorayaki', 'Taiyaki'],
    correctAnswerIndex: 2
  },
  {
    id: 18,
    question: 'Which character is known for bullying Nobita?',
    answers: ['Suneo', 'Gian', 'Dorami', 'Shizuka'],
    correctAnswerIndex: 1
  },
  {
    id: 19,
    question: 'What does Doraemon use to communicate with his friends from the future?',
    answers: ['Future Phone', 'Telepathic Device', 'Time Telegram', 'Translation Jelly'],
    correctAnswerIndex: 0
  },
  {
    id: 20,
    question: 'What is Doraemon afraid of?',
    answers: ['Spiders', 'Dogs', 'Mice', 'Ghosts'],
    correctAnswerIndex: 2
  }
])
const quizNumber = ref(0)
const playerName = ref('')
const playerScore = ref(0)

const selectQuiz = computed(() => {
  return quiz.value.slice(0, 1)[0]
})

function quizPass (quizId: number, score: number) {
  quizNumber.value++
  playerScore.value = playerScore.value + score
  const index = quiz.value.findIndex(quiz => quiz.id === quizId)
  quiz.value.splice(index, 1)
  console.log('player score :' + playerScore.value)
}

function toLeaderboard () {

}

onMounted(() => {
  quiz.value.sort(() => Math.random() - 0.5)
})
</script>

<template>
  <div class="row">
    <div class="col-12 text-center text-h4" v-if="quiz.length > 0">Quiz {{ quizNumber }}</div>
    <quiz-tag class="col-12" v-if="quiz.length > 0" :quiz="selectQuiz" @quizPass="quizPass"/>
    <div class="col-12 row justify-center items-center"   v-else>
      <div class="text-h6 text-center col-12" style="padding: 5px">Enter Your Name To See Score</div>
      <q-input class="col-10" outlined v-model="playerName" label="Player Name" />
      <q-btn class="col-10" outlined style="padding: 5px 10px; margin-top: 10px" @click="">Submit</q-btn>
    </div>
  </div>
</template>

<style scoped>

</style>
