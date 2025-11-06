<script setup lang="ts">
import type { MaterialFormData, ValidationErrors } from "@@/types/material";
import { useMaterialsStore } from "~/stores/materials";
import LeftArrIcon from "~/assets/icons/left-arr.svg?component";

definePageMeta({
  layout: "create",
});

const materialsStore = useMaterialsStore();

const formData = ref({
  title: "",
  short_description: "",
  datetime: "",
});

const errors = ref<ValidationErrors>({});
const isSubmitting = ref(false);
const submitError = ref<string | null>(null);
const editorRef = ref<any>(null);

const MAX_TITLE_LENGTH = 80;
const MAX_DESCRIPTION_LENGTH = 255;

const validateForm = (): boolean => {
  const newErrors: ValidationErrors = {};

  if (!formData.value.title.trim()) {
    newErrors.title = "Заголовок обязателен";
  } else if (formData.value.title.length > MAX_TITLE_LENGTH) {
    newErrors.title = `Заголовок не должен превышать ${MAX_TITLE_LENGTH} символов`;
  }

  if (!formData.value.short_description.trim()) {
    newErrors.short_description = "Краткое описание обязательно";
  } else if (formData.value.short_description.length > MAX_DESCRIPTION_LENGTH) {
    newErrors.short_description = `Описание не должно превышать ${MAX_DESCRIPTION_LENGTH} символов`;
  }

  if (!formData.value.datetime) {
    newErrors.datetime = "Дата и время обязательны";
  }

  const editorHTML = editorRef.value?.getHTML() || "";
  if (!editorHTML || editorHTML === "<p></p>" || editorHTML.trim() === "") {
    newErrors.description = "Содержимое материала обязательно";
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  submitError.value = null;

  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    const payload: MaterialFormData = {
      title: formData.value.title.trim(),
      short_description: formData.value.short_description.trim(),
      datetime: new Date().toISOString(),
      description_html: editorRef.value?.getHTML() || "",
      description_json: editorRef.value?.getJSON() || null,
    };

    await $fetch("/api/test/materials/sinyakov/save", {
      method: "POST",
      body: payload,
    });

    materialsStore.clearCache();
    await navigateTo("/");
  } catch (error: any) {
    console.error("Failed to create material:", error);
    submitError.value = error.data?.message || error.message || "Не удалось создать материал. Попробуйте снова.";
  } finally {
    isSubmitting.value = false;
  }
};

const registerSubmitHandler = inject<(handler: () => void) => void>("registerSubmitHandler");
onMounted(() => {
  if (registerSubmitHandler) {
    registerSubmitHandler(handleSubmit);
  }
});
</script>

<template>
  <div class="container mx-auto px-6 lg:px-12">
    <div class="hidden sm:flex items-center gap-3 mb-9 md:mb-12">
      <NuxtLink
        to="/"
        class="flex items-center gap-3 text-black font-medium">
        <LeftArrIcon />
        Назад
      </NuxtLink>
    </div>

    <div class="flex items-center justify-between mb-9 md:mb-12">
      <h1 class="font-second text-2xl md:text-4xl font-bold">Создать материал</h1>
    </div>

    <div class="bg-white rounded-2xl md:rounded-3xl shadow-card p-6 md:p-12 border border-gray-100">
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <input
            v-model="formData.title"
            type="text"
            :maxlength="MAX_TITLE_LENGTH"
            class="w-full text-2xl md:text-3xl font-bold font-second text-gray-900 placeholder-gray-300 border-none focus:outline-none focus:ring-0 p-0 bg-transparent"
            placeholder="Введите заголовок"
            @input="errors.title = undefined" />
          <p
            v-if="errors.title"
            class="text-sm text-red-600 mt-2">
            {{ errors.title }}
          </p>
        </div>

        <div class="mb-2">
          <textarea
            v-model="formData.short_description"
            :maxlength="MAX_DESCRIPTION_LENGTH"
            rows="2"
            class="w-full text-lg md:text-xl text-gray-600 placeholder-gray-300 border-none focus:outline-none focus:ring-0 p-0 bg-transparent resize-none"
            placeholder="Введите краткое описание..."
            @input="errors.short_description = undefined"></textarea>
          <p
            v-if="errors.short_description"
            class="text-sm text-red-600 mt-2">
            {{ errors.short_description }}
          </p>
        </div>

        <div class="mb-8">
          <TipTapEditor
            ref="editorRef"
            @update:modelValue="
              () => {
                if (errors.description) errors.description = undefined;
              }
            " />
          <p
            v-if="errors.description"
            class="text-sm text-red-600 mt-2">
            {{ errors.description }}
          </p>
        </div>

        <input
          v-model="formData.datetime"
          type="hidden" />

        <div
          v-if="submitError"
          class="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-sm text-red-700">{{ submitError }}</p>
        </div>
      </form>
    </div>
  </div>
</template>
