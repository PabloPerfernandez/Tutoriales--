<template>
    <div>
      <span :class="{ completed: todo.isComplete }">{{ todo.name }}</span>
      <button @click="deleteTodo">Delete</button>
      <button @click="toggleComplete">Toggle Complete</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      todo: Object
    },
    methods: {
      deleteTodo() {
        this.$emit('delete-todo', this.todo.id);
      },
      toggleComplete() {
        this.$emit('toggle-complete', this.todo);
      }
    }
  }
  </script>
  
  <style scoped>
  .completed {
    text-decoration: line-through;
  }
  </style>