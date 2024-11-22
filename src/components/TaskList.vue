<script setup lang="ts">
import { useTaskStore } from '../stores/tasks'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const taskStore = useTaskStore()

const formatDate = (dateStr: string) => {
  return format(new Date(dateStr), 'dd MMMM yyyy', { locale: es })
}
</script>

<template>
  <div class="task-list">
    <h3 class="mb-4 text-dark">Tareas Agendadas</h3>
    
    <div v-if="taskStore.getAllTasks().length === 0" 
         class="alert alert-info">
      No hay tareas agendadas
    </div>
    
    <div v-else class="list-group">
      <div v-for="task in taskStore.getAllTasks()" 
           :key="task.id" 
           class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <h5 class="mb-1 text-dark">{{ task.title }}</h5>
          <small class="text-muted">{{ formatDate(task.date) }}</small>
        </div>
        <p class="mb-1 text-dark">{{ task.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-list {
  color: #212529;
}
</style>