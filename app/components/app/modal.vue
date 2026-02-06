<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id: string;
    title?: string;
    closeLabel?: string;
  }>(),
  {
    title: "Modal Title",
    closeLabel: "Close",
  },
);

const dialogRef = ref<HTMLDialogElement | null>(null);

function openModal() {
  dialogRef.value?.showModal();
}

function closeModal() {
  dialogRef.value?.close();
}
</script>

<template>
  <!-- Wrapper with @click so clicking the trigger (slot content) opens the modal -->
  <div
    v-if="$slots.trigger"
    class="inline-block"
    @click="openModal"
  >
    <slot name="trigger" />
  </div>

  <dialog
    :id="props.id"
    ref="dialogRef"
    class="modal"
  >
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold">
        {{ props.title }}
      </h3>
      <slot name="content" />
      <div class="modal-action">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-outline btn-error" @click="closeModal()">
          {{ props.closeLabel }}
        </button>
      </div>
    </div>
  </dialog>
</template>
