<template>
  <div class="tiptap-editor">
    <!-- Toolbar -->
    <div class="toolbar border border-gray-300 rounded-t-lg bg-linear-to-r from-gray-50 to-gray-100 p-3 flex gap-2 flex-wrap shadow-sm">
      <button
        type="button"
        @click="editor?.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor?.isActive('paragraph') }"
        class="toolbar-btn"
        title="Paragraph">
        <svg
          class="w-4 h-4 mr-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        Параграф
      </button>
      <button
        type="button"
        @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor?.isActive('heading', { level: 1 }) }"
        class="toolbar-btn"
        title="Heading 1">
        H1
      </button>
      <button
        type="button"
        @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor?.isActive('heading', { level: 2 }) }"
        class="toolbar-btn"
        title="Heading 2">
        H2
      </button>
      <button
        type="button"
        @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor?.isActive('heading', { level: 3 }) }"
        class="toolbar-btn"
        title="Heading 3">
        H3
      </button>
      <button
        type="button"
        @click="editor?.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor?.isActive('blockquote') }"
        class="toolbar-btn"
        title="Quote">
        <svg
          class="w-4 h-4 mr-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        Цитата
      </button>
    </div>

    <!-- Editor Content -->
    <EditorContent
      :editor="editor"
      class="editor-content border border-t-0 border-gray-300 rounded-b-lg p-5 min-h-[300px] bg-white hover:border-gray-400 transition-colors" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import { onBeforeUnmount } from "vue";

const props = defineProps<{
  modelValue?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const editor = useEditor({
  content: props.modelValue || "",
  extensions: [
    StarterKit.configure({
      heading: false, // Disable default heading to use custom configuration
    }),
    Heading.configure({
      levels: [1, 2, 3],
    }),
  ],
  onUpdate: ({ editor }) => {
    emit("update:modelValue", editor.getHTML());
  },
  editorProps: {
    attributes: {
      class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none max-w-none",
    },
  },
});

// Method to get HTML content
const getHTML = (): string => {
  return editor.value?.getHTML() || "";
};

// Method to get JSON content
const getJSON = (): any => {
  return editor.value?.getJSON() || null;
};

// Expose methods to parent component
defineExpose({
  getHTML,
  getJSON,
});

onBeforeUnmount(() => {
  editor.value?.destroy();
});
</script>

<style scoped>
@reference "tailwindcss";

.toolbar-btn {
  @apply px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all text-sm font-semibold shadow-sm inline-flex items-center;
}

.toolbar-btn.is-active {
  background-color: var(--color-primary-600);
  color: white;
  border-color: var(--color-primary-600);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.toolbar-btn.is-active:hover {
  background-color: var(--color-primary-700);
}

.editor-content :deep(.ProseMirror) {
  min-height: 300px;
  outline: none;
  font-size: 1rem;
  line-height: 1.75;
}

.editor-content :deep(.ProseMirror h1) {
  @apply text-3xl font-bold mb-4 mt-6 text-gray-900;
}

.editor-content :deep(.ProseMirror h2) {
  @apply text-2xl font-bold mb-3 mt-5 text-gray-900;
}

.editor-content :deep(.ProseMirror h3) {
  @apply text-xl font-bold mb-2 mt-4 text-gray-900;
}

.editor-content :deep(.ProseMirror blockquote) {
  border-left: 4px solid var(--color-primary-500);
  background-color: rgb(249 250 251);
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-style: italic;
  margin-top: 1rem;
  margin-bottom: 1rem;
  color: rgb(55 65 81);
  border-radius: 0 0.25rem 0.25rem 0;
}

.editor-content :deep(.ProseMirror p) {
  @apply mb-3 text-gray-700;
}

.editor-content :deep(.ProseMirror:focus) {
  outline: none;
}

/* Placeholder styling */
.editor-content :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  float: left;
  color: #9ca3af;
  pointer-events: none;
  height: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .toolbar {
    @apply p-2;
  }

  .toolbar-btn {
    @apply px-2.5 py-1.5 text-xs;
  }

  .toolbar-btn svg {
    @apply w-3 h-3 mr-1;
  }

  .editor-content {
    @apply p-4 min-h-[250px];
  }
}
</style>
