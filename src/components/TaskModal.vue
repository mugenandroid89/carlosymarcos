<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../stores/tasks'

const props = defineProps<{
  modelValue: boolean
  date: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const taskStore = useTaskStore()
const title = ref('')
const description = ref('')

const closeModal = () => {
  emit('update:modelValue', false)
  title.value = ''
  description.value = ''
}

const saveTask = () => {
  if (title.value.trim()) {
    taskStore.addTask({
      id: Date.now().toString(),
      date: props.date,
      title: title.value,
      description: description.value
    })
    closeModal()
  }
}
</script>

<template>
  <div class="modal fade show" 
       style="display: block" 
       tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Nueva Tarea - {{ date }}</h5>
          <button type="button" 
                  class="btn-close" 
                  @click="closeModal">
          </button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">Título</label>
            <input type="text" 
                   class="form-control" 
                   v-model="title" 
                   placeholder="Título de la tarea">
          </div>
          <div class="mb-3">
            <label class="form-label">Descripción</label>
            <textarea class="form-control" 
                      v-model="description" 
                      rows="3" 
                      placeholder="Descripción de la tarea">
            </textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" 
                  class="btn btn-secondary" 
                  @click="closeModal">
            Cancelar
          </button>
          <button type="button" 
                  class="btn btn-success" 
                  @click="saveTask">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal-backdrop fade show"></div>
</template>