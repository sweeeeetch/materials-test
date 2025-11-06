<script setup lang="ts">
import LeftArrIcon from "~/assets/icons/left-arr.svg?component";
import CalendarIcon from "~/assets/icons/calendar.svg";
import { useMaterialsStore } from "~/stores/materials";

definePageMeta({
  layout: "details",
});

const route = useRoute();
const materialId = route.params.id;

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

const material = computed(() => {
  if (!materialId || Array.isArray(materialId)) return null;
  return materialsStore.getMaterialById(materialId);
});

const notFound = computed(() => {
  return !pending.value && !error.value && !material.value;
});
</script>

<template>
  <div class="sm:container sm:mx-auto sm:px-12 lg:px-16">
    <div class="ml-5 sm:ml-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-9 md:mb-12">
      <NuxtLink
        to="/"
        class="flex items-center gap-3 text-black font-medium">
        <LeftArrIcon />
        Назад
      </NuxtLink>
    </div>
    <div
      v-if="pending"
      class="bg-white rounded-xl shadow-card p-8 sm:p-10 lg:p-12 animate-pulse border border-gray-100">
      <div class="h-10 bg-gray-200 rounded-lg mb-6"></div>
      <div class="h-4 bg-gray-200 rounded-lg mb-3 w-1/4"></div>
      <div class="h-5 bg-gray-200 rounded-lg mb-8 w-3/4"></div>
      <div class="space-y-4 pt-6 border-t border-gray-200">
        <div class="h-4 bg-gray-200 rounded-lg"></div>
        <div class="h-4 bg-gray-200 rounded-lg"></div>
        <div class="h-4 bg-gray-200 rounded-lg w-5/6"></div>
      </div>
    </div>

    <div
      v-if="notFound"
      class="text-center text-black mb-2">
      <h3 class="text-lg sm:text-xl font-bold mb-3">Материал не найден</h3>
    </div>

    <article
      v-else-if="material"
      class="flex flex-col w-full items-start gap-6 relative bg-white rounded-2xl md:rounded-3xl px-4 py-6 md:py-8 md:px-6">
      <header class="flex items-center gap-2 w-full">
        <CalendarIcon
          class="w-4 h-4 md:w-5 md:h-5 shrink-0"
          aria-hidden="true" />
        <time
          :dateTime="material.datetime"
          class="font-normal text-light-gray text-sm md:text-base leading-none">
          {{ formateTime(material.datetime) }}
        </time>
      </header>

      <div class="flex flex-col items-start gap-6 w-full">
        <h1 class="text-black font-bold font-second text-2xl leading-snug md:leading-tight line-clamp-3 w-full">
          {{ material.title }}
        </h1>

        <p class="text-lg text-black font-normal tracking-wide">
          {{ material.short_description }}
        </p>

        <div
          v-if="material.description_html"
          class="sm-titles mt-4 prose prose-base sm:prose-lg lg:prose-xl max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-blockquote:border-primary-500 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:text-gray-700"
          v-html="material.description_html" />
      </div>
    </article>
  </div>
</template>

<style lang="scss">
.sm-titles {
  h1 {
    font-size: 22px !important;
  }
  h2 {
    font-size: 20px !important;
  }
  h3 {
    font-size: 18px !important;
  }
}
</style>
