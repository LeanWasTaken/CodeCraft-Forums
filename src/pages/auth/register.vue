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
            <span>{{ currentTitle }}</span>
            <v-avatar color="primary" size="24" text="currentStep"></v-avatar>
          </v-card-title>

          <v-window>
            <v-window-item v-if="currentStep <= 1">
              <v-card-text>
                <v-text-field
                  v-model="state.fullname"
                  label="Full name"
                  placeholder="Janis Zarins"
                ></v-text-field>
                <v-text-field
                  v-model="state.email"
                  label="E-Mail"
                  placeholder="john@google.com"
                ></v-text-field>
                <span class="text-caption text-grey-darken-1">
                  This is the email you will use to login to your CodeCraft
                  account
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item v-if="currentStep == 2">
              <v-card-text>
                <v-text-field
                  v-model="state.password"
                  label="Password"
                  type="password"
                ></v-text-field>
                <v-text-field
                  v-model="state.confirmPassword"
                  label="Confirm Password"
                  type="password"
                ></v-text-field>
                <span class="text-caption text-grey-darken-1">
                  Please enter a password for your account
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item v-if="currentStep >= 3">
              <div class="pa-4 text-center">
                <v-img
                  class="mb-4"
                  height="128"
                  src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                  contain
                ></v-img>
                <h3 class="text-h6 font-weight-light mb-2">
                  Welcome to CodeCraft
                </h3>
                <span class="text-caption text-grey"
                  >Thanks for signing up!</span
                >
              </div>
            </v-window-item>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn v-if="currentStep > 1" variant="text" @click="decreaseStep">
              Back
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="currentStep < 2 && !loading"
              color="primary"
              variant="flat"
              @click="increaseStep"
            >
              Next
            </v-btn>
            <v-btn
              v-if="currentStep == 2 && !loading"
              color="primary"
              variant="flat"
              @click="registerUser"
            >
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<style scoped>
.container {
  height: 100vh;
}
.content {
  margin-top: 1rem;
}
</style>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, minLength, required, sameAs } from '@vuelidate/validators';
import axios from 'axios';

let step = ref(1);
let loading = ref(false);
const error = ref(null);

const initialState = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  fullname: '',
  checkbox: null,
});

const currentTitle = computed(() => {
  switch (step.value) {
    case 1:
      return 'Sign-up ';
    case 2:
      return 'Create a password ';
    default:
      return 'Account created ';
  }
});

async function registerUser() {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.post(
      'http://localhost:8008/api/auth/register',
      state,
    );
    alert(response.data);
  } catch (err) {
    error.value = err.response.data.message;
  } finally {
    loading.value = false;
  }
}

const currentStep = computed(() => step.value);

function increaseStep() {
  if (
    currentStep.value === 2 &&
    !error.value &&
    state.value.fullname &&
    state.value.email
  ) {
    registerUser();
  } else if (
    currentStep.value === 1 &&
    !error.value &&
    state.value.password &&
    state.value.confirmPassword
  ) {
    step.value++;
  } else {
    step.value++;
  }
}

function decreaseStep() {
  step.value--;
}

const state = ref({ ...initialState });

const rules = {
  email: { required, email },
  fullname: { required, minLength: minLength(10) },
  password: { required, minLength: minLength(8) },
  confirmPassword: { required, sameAs: sameAs('password') },
};

const v$ = useVuelidate(rules, state.value);
</script>
