<template>
  <span class="editable" contenteditable spellcheck="false" @keyup="update" @blur="saveEdit">{{ editable || 'Type here' }}</span>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
  props: {
    modelValue: {
      type: String
    }
  },
  emits: ['update:modelValue', 'saveEdit'],
  setup(props, { emit }) {
    const editable = ref('')
    watchEffect(() => {
      editable.value = props.modelValue.toString()
    })
    return {
      editable,
      update(evt) {
        editable.value = evt.target.innerText
        emit('update:modelValue', editable.value)
      },
      saveEdit() {
        emit('saveEdit')
      }
    }
  }
}
</script>

<style scoped>
.editable:focus {
  background-color: rgb(238, 234, 234);
}
.editable:hover {
  outline: 1px dashed blue;
}
</style>
