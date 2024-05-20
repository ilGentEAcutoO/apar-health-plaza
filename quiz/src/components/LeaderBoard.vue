<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const leaderboard = ref()
const router = useRouter()

onMounted(() => {
  const tempBoard = $q.localStorage.getItem('leaderboard')
  if (tempBoard === null) {
    $q.localStorage.setItem('leaderboard', [])
  } else {
    leaderboard.value = tempBoard
  }
})
</script>

<template>
  <div v-if="typeof leaderboard === 'object'" class="row">
    <q-banner class="bg-primary text-white q-ma-md" v-if="leaderboard.length === 0">
      Unfortunately, there are no leaderboard entries. Play a game to see your score.
      <template v-slot:action>
        <q-btn flat color="white" @click="router.push('/')" label="Play Game"/>
      </template>
    </q-banner>

    <div class="q-pa-md col-12 row" v-else>
      <q-toolbar class="bg-primary text-white shadow-2 col-12">
        <q-toolbar-title>Leader Board</q-toolbar-title>
      </q-toolbar>

      <q-list bordered class="col-12">
        <q-item v-for="(person, index) in leaderboard" :key="index" class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ person.name.slice(0, 1) }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ person.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label> {{ person.score }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <div class="row justify-center flex items-center" style="margin: auto; padding-top: 20px">
        <q-btn size="lg" class="col-12 justify-center items-center" color="primary" @click="router.push('/')"
               label="Play New Game"/>

      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
