<script setup lang="ts">
import type { Component } from "vue";
import LogoIcon from "~/assets/icons/logo.svg?component";
import AddIcon from "~/assets/icons/add.svg?component";
import SendIcon from "~/assets/icons/send.svg?component";

const router = useRouter();

const props = withDefaults(
  defineProps<{
    buttonLabel?: string;
    buttonIcon?: Component;
    onButtonClick?: () => void;
  }>(),
  {
    buttonLabel: "Создать материал",
    buttonIcon: () => AddIcon,
    onButtonClick: undefined,
  }
);

const handleButtonClick = () => {
  if (props.onButtonClick) {
    props.onButtonClick();
  } else {
    router.push("/materials/create");
  }
};
</script>

<template>
  <header class="w-full bg-white">
    <div class="container mx-auto flex justify-between py-5 items-center">
      <NuxtLink to="/">
        <LogoIcon class="cursor-pointer" />
      </NuxtLink>
      <UiButton
        :label="props.buttonLabel"
        :mobile-icon="props.buttonIcon"
        @click="handleButtonClick"></UiButton>
    </div>
  </header>
</template>

<style scoped lang="scss"></style>
