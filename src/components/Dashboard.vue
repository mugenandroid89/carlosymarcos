<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Calendar from './Calendar.vue'
import TaskList from './TaskList.vue'

const route = useRoute()
const router = useRouter()
const userName = route.query.name as string
const showTaskList = ref(false)

if (!userName) {
  router.push('/')
}

const toggleView = () => {
  showTaskList.value = !showTaskList.value
}
</script>

<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 class="mb-0">Bienvenido a CET 15, {{ userName }}</h4>
        <div>
          <button @click="toggleView" class="btn btn-light me-2">
            {{ showTaskList ? 'Ver Calendario' : 'Ver Tareas' }}
          </button>
          <router-link to="/" class="btn btn-success">
            Cerrar sesión
          </router-link>
        </div>
      </div>
      <div class="card-body">
        <Transition name="fade" mode="out-in">
          <Calendar v-if="!showTaskList" />
          <TaskList v-else />
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>