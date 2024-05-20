<template>
  <q-page class="row items-center justify-evenly">
    <leader-board />
  </q-page>
</template>

<script setup lang="ts">
import LeaderBoard from 'components/LeaderBoard.vue'

defineOptions({
  name: 'IndexPage'
})
</script>
