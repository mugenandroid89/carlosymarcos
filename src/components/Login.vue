<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import userData from '../data/users.json'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const login = () => {
  const user = userData.users.find(
    u => u.email === email.value && u.password === password.value
  )
  
  if (user) {
    router.push({
      path: '/dashboard',
      query: { name: user.name }
    })
  } else {
    errorMessage.value = 'Credenciales inválidas'
  }
}
</script>

<template>
  <div class="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow-lg" style="min-width: 320px; max-width: 400px;">
      <div class="card-header bg-primary text-white text-center py-3">
        <h4 class="mb-0">CET 15</h4>
      </div>
      <div class="card-body p-4">
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Correo electrónico</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              required
              placeholder="ejemplo@email.com"
            >
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              required
              placeholder="Ingrese su contraseña"
            >
          </div>
          <div class="alert alert-danger" v-if="errorMessage">
            {{ errorMessage }}
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-success">
              Iniciar sesión
            </button>
            <router-link to="/reset-password" class="btn btn-link text-primary">
              ¿Olvidaste tu contraseña?
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>