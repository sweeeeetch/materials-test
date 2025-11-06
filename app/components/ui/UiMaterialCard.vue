<script setup lang="ts">
import { defineProps } from "vue";
import CalendarIcon from "~/assets/icons/calendar.svg?component";

type Props = {
  date: string;
  title: string;
  description: string;
};

defineProps<Props>();
</script>

<template>
  <article
    class="flex flex-col items-start gap-2 md:gap-5 relative bg-white rounded-2xl md:rounded-3xl w-full md:max-w-md p-6 md:py-8 md:px-6 transition-shadow duration-300 hover:shadow-card-custom cursor-pointer">
    <header class="flex items-center gap-2 w-full">
      <CalendarIcon
        class="w-4 h-4 md:w-5 md:h-5 shrink-0"
        aria-hidden="true" />
      <time
        :dateTime="date"
        class="font-normal text-light-gray text-sm md:text-base leading-none">
        {{ formateTime(date) }}
      </time>
    </header>

    <div class="flex flex-col items-start gap-3 md:gap-5 w-full">
      <h2 class="text-black font-bold font-second text-xl md:text-2xl leading-snug md:leading-tight line-clamp-3 w-full">
        {{ title }}
      </h2>

      <p class="text-gray-600 text-sm md:text-base leading-relaxed md:leading-normal line-clamp-4 w-full">
        {{ description }}
      </p>
    </div>
  </article>
</template>
