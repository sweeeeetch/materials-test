import { defineStore } from "pinia";
import type { Material } from "@@/types/material";

export const useMaterialsStore = defineStore("materials", () => {
  // State
  const materials = ref<Material[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const lastFetch = ref<number | null>(null);

  const CACHE_DURATION = 5 * 60 * 1000;

  // Getters
  const sortedMaterials = computed(() => {
    return [...materials.value].sort((a, b) => {
      return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
    });
  });

  const getMaterialById = computed(() => {
    return (id: string | number) => {
      return materials.value.find(m => String(m.id) === String(id)) || null;
    };
  });

  const isCacheValid = computed(() => {
    if (!lastFetch.value) return false;
    return Date.now() - lastFetch.value < CACHE_DURATION;
  });

  // Actions
  const fetchMaterials = async (force = false) => {
    if (!force && isCacheValid.value && materials.value.length > 0) {
      return materials.value;
    }

    loading.value = true;
    error.value = null;

    try {
      const data = await $fetch<Material[]>("/api/test/materials/sinyakov/");
      materials.value = data;
      lastFetch.value = Date.now();
      return data;
    } catch (e: any) {
      error.value = e;
      throw e;
    } finally {
      loading.value = false;
    }
  };

  const clearCache = () => {
    materials.value = [];
    lastFetch.value = null;
    error.value = null;
  };

  return {
    // State
    materials,
    loading,
    error,
    lastFetch,

    // Getters
    sortedMaterials,
    getMaterialById,
    isCacheValid,

    // Actions
    fetchMaterials,
    clearCache,
  };
});
