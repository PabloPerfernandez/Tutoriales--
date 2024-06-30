<template>
    <div>
      <span :class="{ completed: todo.isComplete }">{{ todo.name }}</span>
      <button @click="deleteTodo">Eliminar</button>
      <button @click="toggleComplete">Completada</button>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  // Props
  const props = defineProps({
    todo: {
      type: Object,
      required: true
    }
  });
  
  // Emit
  const emit = defineEmits(['delete-todo', 'toggle-complete']);
  
  // Methods
  const deleteTodo = () => {
    emit('delete-todo', props.todo.id);
  };
  
  const toggleComplete = () => {
    emit('toggle-complete', props.todo);
  };
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
    color: #6c757d;
  }
  </style>