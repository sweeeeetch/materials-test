<script setup lang="ts">
import type { Component } from "vue";

type ButtonType = "button" | "submit" | "reset";

const props = defineProps<{
  label: string;
  type?: ButtonType;
  disabled?: boolean;
  mobileIcon: Component;
}>();

const emit = defineEmits<{
  (e: "click", ev: MouseEvent): void;
}>();

const onClick = (ev: MouseEvent) => {
  if (!props.disabled) emit("click", ev);
};
</script>

<template>
  <button
    :type="props.type ?? 'button'"
    :disabled="props.disabled ?? false"
    :aria-label="props.label"
    @click="onClick"
    class="group inline-flex items-center justify-center rounded-xl bg-light-colorslight-blue text-bright-colorsblue font-medium leading-none transition-all duration-200 ease-out active:translate-y-0 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-light-colorslight-blue/60 disabled:opacity-50 disabled:cursor-not-allowed h-12 w-12 p-0 sm:h-11 sm:w-auto sm:px-6 sm:py-3">
    <component
      :is="props.mobileIcon"
      class="w-7 h-7 -mx-1 sm:hidden transition-transform duration-200 ease-out group-active:scale-95"
      aria-hidden="true" />

    <span class="hidden sm:inline text-sm sm:text-lg transition-transform duration-200 ease-out">
      {{ props.label }}
    </span>
  </button>
</template>
