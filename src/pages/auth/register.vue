<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <div class="text-body-1 font-weight-light mb-n1">{{ $t('registration.welcome') }}</div>
      <h1 class="text-h4 font-weight-bold">CodeCraft</h1>

      <v-row class="content d-flex align-center justify-center">
        <v-card max-width="800" min-width="400" elevation="4">
          <v-card-title class="text-h6 font-weight-regular justify-space-between">
            <span>{{ currentTitle }}</span>
            <v-avatar color="primary" size="24">{{ currentStep }}</v-avatar>
          </v-card-title>

          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text>
                <v-text-field
                  v-model="state.fullname"
                  :rules="fullnameRules"
                  label="Full name"
                  placeholder="Janis Zarins"
                  :error-messages="v$.fullname?.$errors?.map(e => e.$message) || []"
                  :success="!v$.fullname?.$pending && v$.fullname?.$dirty"
                ></v-text-field>
                <v-text-field
                  v-model="state.username"
                  label="Username"
                  placeholder="Janiszarins3"
                ></v-text-field>
                <v-text-field
                  v-model="state.email"
                  :rules="emailRules"
                  label="E-Mail"
                  placeholder="john@google.com"
                  :error-messages="v$.email?.$errors?.map(e => e.$message) || []"
                  :success="!v$.email?.$pending && v$.email?.$dirty"
                ></v-text-field>
                <span class="text-caption text-grey-darken-1">
                  {{ $t('registration.email-info') }}
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-text-field
                  v-model="state.password"
                  :rules="passwordRules"
                  label="Password"
                  type="password"
                  :error-messages="v$.password?.$errors?.map(e => e.$message) || []"
                  :success="!v$.password?.$pending && v$.password?.$dirty"
                ></v-text-field>
                <v-text-field
                  v-model="state.confirmPassword"
                  :rules="confirmPasswordRules"
                  label="Confirm Password"
                  type="password"
                  :error-messages="v$.confirmPassword?.$errors?.map(e => e.$message) || []"
                  :success="!v$.confirmPassword?.$pending && v$.confirmPassword?.$dirty"
                ></v-text-field>
                <span class="text-caption text-grey-darken-1">
                  {{ $t('registration.password-enter') }}
                </span>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="3">
              <div class="pa-4 text-center">
                <v-img
                  class="mb-4"
                  height="128"
                  src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                  contain
                ></v-img>
                <h3 class="text-h6 font-weight-light mb-2">
                  {{ $t('registration.welcome') }} CodeCraft
                </h3>
                <span class="text-caption text-grey">
                  {{ $t('registration.thanks-signup') }}
                </span>
              </div>
            </v-window-item>
          </v-window>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn v-if="currentStep > 1" variant="text" @click="decreaseStep">
              {{ $t('registration.back') }}
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              v-if="currentStep < 3 && !loading"
              color="primary"
              variant="flat"
              @click="increaseStep"
            >
              {{ currentStep === 2 ? $t('registration.register') : $t('registration.next') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { email, minLength, required, sameAs } from '@vuelidate/validators';
import axios from 'axios';

const step = ref(1);
const loading = ref(false);
const error = ref(null);

const initialState = reactive({
  email: '',
  password: '',
  confirmPassword: '',
  fullname: '',
  username: '',
  checkbox: null,
});

const state = reactive({ ...initialState });

const rulesStep1 = {
  email: { required, email },
  fullname: { required, minLength: minLength(3) },
};

const rulesStep2 = {
  password: { required, minLength: minLength(8) },
  confirmPassword: { required, sameAs: sameAs(computed(()=> state.password)) },
};

const rules = computed(() => {
  if (step.value === 1) return rulesStep1;
  if (step.value === 2) return rulesStep2;
  return {};
});

const v$ = useVuelidate(rules, state);

const fullnameRules = [
  value => !!value || 'Full name is required',
  value => value.length >= 3 || 'Full name must be at least 3 characters long',
];

const emailRules = [
  value => !!value || 'E-mail is required',
  value => /.+@.+\..+/.test(value) || 'E-mail must be valid',
];

const passwordRules = [
  value => !!value || 'Password is required',
  value => value.length >= 8 || 'Password must be at least 8 characters long',
];

const confirmPasswordRules = [
  value => !!value || 'Confirm Password is required',
  value => value == state.password || 'Passwords do not match.'
];

const currentTitle = computed(() => {
  switch (step.value) {
    case 1:
      return 'Sign-up';
    case 2:
      return 'Create a password';
    default:
      return 'Account created';
  }
});

const currentStep = computed(() => step.value);

async function registerUser() {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.post('http://localhost:8008/api/auth/register', {
      email: state.email,
      password: state.password,
      fullname: state.fullname,
      username: state.username,
    });

    if (response.status === 200) {
      step.value = 3;
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Registration failed";
  } finally {
    loading.value = false;
  }
}

function increaseStep() {
  v$.value.$touch();
  if (v$.value.$invalid) {
    console.log("Form is invalid");
    return;
  }
  if (currentStep.value === 2) {
    registerUser();
  } else {
    step.value++;
  }
}

function decreaseStep() {
  step.value--;
}

watch(step, () => {
  v$.value.$reset();
  v$.value.$touch();
});
</script>
