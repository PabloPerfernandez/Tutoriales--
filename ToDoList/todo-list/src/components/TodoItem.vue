<template>
  <div>
    <span :class="{ completed: todo.isComplete }">{{ todo.name }}</span>
    <button @click="deleteTodo">Eliminar</button>
    <button @click="toggleComplete">Completada</button>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
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
  color: #6c757d;
}
</style>