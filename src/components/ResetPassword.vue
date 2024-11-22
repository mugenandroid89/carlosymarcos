<script setup lang="ts">
import { ref } from 'vue'
import userData from '../data/users.json'

const email = ref('')
const message = ref('')
const messageType = ref('')

const resetPassword = () => {
  const user = userData.users.find(u => u.email === email.value)
  
  if (user) {
    message.value = 'Se han enviado las instrucciones a tu correo electrónico'
    messageType.value = 'success'
  } else {
    message.value = 'Correo electrónico no encontrado'
    messageType.value = 'danger'
  }
}
</script>

<template>
  <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow-lg" style="min-width: 320px; max-width: 400px;">
      <div class="card-header bg-primary text-white text-center py-3">
        <h4 class="mb-0">Restablecer Contraseña</h4>
      </div>
      <div class="card-body p-4">
        <form @submit.prevent="resetPassword">
          <div class="mb-3">
            <label for="reset-email" class="form-label">Correo electrónico</label>
            <input
              type="email"
              class="form-control"
              id="reset-email"
              v-model="email"
              required
              placeholder="ejemplo@email.com"
            >
          </div>
          <div class="alert" :class="'alert-' + messageType" v-if="message">
            {{ message }}
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-success">
              Enviar instrucciones
            </button>
            <router-link to="/" class="btn btn-link text-primary">
              Volver al inicio de sesión
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>