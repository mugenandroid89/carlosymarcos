<script setup lang="ts">
import { ref, computed } from 'vue'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'
import { es } from 'date-fns/locale'
import { useTaskStore } from '../stores/tasks'
import TaskModal from './TaskModal.vue'

const currentDate = ref(new Date())
const taskStore = useTaskStore()
const showTaskModal = ref(false)
const selectedDate = ref('')

const daysInMonth = computed(() => {
  const start = startOfMonth(currentDate.value)
  const end = endOfMonth(currentDate.value)
  return eachDayOfInterval({ start, end })
})

const hasTasksForDate = (date: Date) => {
  const formattedDate = format(date, 'yyyy-MM-dd')
  return taskStore.getTasksByDate(formattedDate).length > 0
}

const openTaskModal = (date: Date) => {
  selectedDate.value = format(date, 'yyyy-MM-dd')
  showTaskModal.value = true
}

const getDayClasses = (date: Date) => {
  return {
    'bg-primary text-white': isToday(date),
    'text-muted': !isSameMonth(date, currentDate.value),
    'has-tasks': hasTasksForDate(date)
  }
}
</script>

<template>
  <div class="calendar-container">
    <div class="calendar-header mb-4">
      <h3 class="text-center text-dark">
        {{ format(currentDate, 'MMMM yyyy', { locale: es }) }}
      </h3>
    </div>
    
    <div class="calendar-grid">
      <div class="calendar-weekdays">
        <div v-for="weekday in ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']" 
             :key="weekday" 
             class="weekday">
          {{ weekday }}
        </div>
      </div>
      
      <div class="calendar-days">
        <div v-for="date in daysInMonth" 
             :key="date.toISOString()" 
             class="day"
             :class="getDayClasses(date)"
             @click="openTaskModal(date)">
          {{ format(date, 'd') }}
          <div v-if="hasTasksForDate(date)" class="task-indicator"></div>
        </div>
      </div>
    </div>

    <TaskModal 
      v-if="showTaskModal"
      v-model="showTaskModal"
      :date="selectedDate"
    />
  </div>
</template>

<style scoped>
.calendar-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.calendar-grid {
  display: grid;
  gap: 1px;
  background: #e9ecef;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: #f8f9fa;
  font-weight: bold;
  color: #212529;
}

.weekday {
  padding: 10px;
  text-align: center;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day {
  padding: 15px;
  text-align: center;
  background: white;
  cursor: pointer;
  position: relative;
  color: #212529;
}

.day:hover {
  background: #f8f9fa;
}

.task-indicator {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--bs-primary);
}

.has-tasks {
  font-weight: bold;
}

.text-dark {
  color: #212529 !important;
}
</style>