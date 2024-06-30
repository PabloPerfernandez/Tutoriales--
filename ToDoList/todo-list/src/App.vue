<template>
  <div id="app">
    <TodoList />
  </div>
</template>

<script>
import TodoList from './components/NewTodoList.vue';

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>