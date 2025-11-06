<script setup lang="ts">
import { useMaterialsStore } from "~/stores/materials";

const materialsStore = useMaterialsStore();

const pending = ref(true);
const error = ref<Error | null>(null);

try {
  await materialsStore.fetchMaterials();
} catch (e: any) {
  error.value = e;
} finally {
  pending.value = false;
}

const sortedMaterials = computed(() => materialsStore.sortedMaterials);

const refresh = async () => {
  pending.value = true;
  error.value = null;
  try {
    await materialsStore.fetchMaterials(true);
  } catch (e: any) {
    error.value = e;
  } finally {
    pending.value = false;
  }
};
</script>

<template>
  <div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-9 md:mb-12">
      <h1 class="font-second text-2xl md:text-4xl font-bold">Материалы</h1>
    </div>

    <div
      v-if="pending"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      <div
        v-for="i in 8"
        :key="i"
        class="bg-white rounded-2xl md:rounded-3xl p-6 md:py-8 md:px-6 animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-24 mb-4"></div>
        <div class="h-6 bg-gray-200 rounded mb-3"></div>
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
      <svg
        class="w-12 h-12 text-red-600 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="text-lg font-bold text-red-900 mb-2">Failed to load materials</h3>
      <p class="text-red-700 mb-4">{{ error.message || "An error occurred" }}</p>
      <button
        @click="() => refresh()"
        class="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
        Try Again
      </button>
    </div>

    <div
      v-else-if="!sortedMaterials.length"
      class="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
      <svg
        class="w-16 h-16 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="text-xl font-bold text-gray-900 mb-2">No materials yet</h3>
      <p class="text-gray-600 mb-6">Get started by creating your first material</p>
      <NuxtLink
        to="/materials/create"
        class="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all">
        <svg
          class="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4" />
        </svg>
        Create Material
      </NuxtLink>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      <NuxtLink
        v-for="material in sortedMaterials"
        :key="material.id"
        :to="`/materials/${material.id}`">
        <UiMaterialCard
          :date="material.datetime"
          :title="material.title"
          :description="material.short_description" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
