<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{
  error: NuxtError;
}>();

const handleError = () => clearError({ redirect: "/" });

const errorInfo = computed(() => {
  const statusCode = props.error.statusCode || 500;

  switch (statusCode) {
    case 404:
      return {
        title: "Страница не найдена",
      };
    case 500:
      return {
        title: "Ошибка сервера",
      };
    default:
      return {
        title: "Что-то пошло не так",
      };
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div class="max-w-2xl w-full">
      <div class="bg-white rounded-2xl md:rounded-3xl shadow-card p-8 md:p-12 border border-gray-100 text-center">
        <div class="text-6xl md:text-8xl font-bold font-second text-gray-200 mb-4">
          {{ error.statusCode || 500 }}
        </div>

        <h1 class="text-2xl md:text-4xl font-bold font-second text-gray-900 mb-4">
          {{ errorInfo.title }}
        </h1>

        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            @click="handleError"
            class="px-8 py-3 rounded-xl bg-light-colorslight-blue text-bright-colorsblue font-semibold transition-all hover:opacity-90">
            Вернуться на главную
          </button>
          <button
            @click="() => $router.back()"
            class="px-8 py-3 border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all">
            Назад
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
