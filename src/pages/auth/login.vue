<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <div class="text-body-1 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h4 font-weight-bold">CodeCraft</h1>

      <v-row class="content d-flex align-center justify-center">
        <v-card max-width="800" min-width="400" elevation="4">
          <v-card-title
            class="text-h6 font-weight-regular justify-space-between"
          >
            <span>Login</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="state.email"
              label="E-Mail"
              placeholder="john@google.com"
            ></v-text-field>
            <v-text-field
              v-model="state.password"
              label="Password"
              placeholder="Password"
              type="password"
            ></v-text-field>
          </v-card-text>
          <v-divider />

          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" variant="flat" @click="login()">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
      <v-btn class="mt-5" variant="text" to="/auth/register">
        Don't have an account?
      </v-btn>
    </v-responsive>
  </v-container>
</template>

<style scoped>
.content {
  margin-top: 1rem;
}
</style>

<script setup>
import { ref, reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';

const initialState = {
  email: '',
  password: '',
  checkbox: null,
};

const state = reactive({
  ...initialState,
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, state);

const login = async () => {
  v$.value.$touch(); // Trigger validation for all fields

  if (!v$.value.$error) {
    // Check if there are no validation errors
    try {
      console.log(state);
    } catch (error) {
      console.error('Authentication error:', error);
    }
  }
};
</script>
