<script setup lang="ts">
import SendIcon from "~/assets/icons/send.svg?component";

const submitHandler = ref<(() => void) | null>(null);

const registerSubmitHandler = (handler: () => void) => {
  submitHandler.value = handler;
};

const handleSaveClick = () => {
  if (submitHandler.value) {
    submitHandler.value();
  }
};

provide("registerSubmitHandler", registerSubmitHandler);
</script>

<template>
  <div class="h-dvh overflow-y-auto">
    <UiHeader
      button-label="Сохранить"
      :button-icon="SendIcon"
      :on-button-click="handleSaveClick" />
    <div class="py-5 md:py-12 container mx-auto">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
