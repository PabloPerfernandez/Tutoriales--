<template>
  <div>
    <h1>Todo List</h1>
    <input v-model="newTodo" placeholder="Add a new task" />
    <button @click="addTodo">Add</button>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <TodoItem :todo="todo" @delete-todo="deleteTodo" @toggle-complete="toggleComplete" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '../axios'; // Importa desde el archivo axios.js en la carpeta src
import TodoItem from './TodoItem.vue';

export default {
  data() {
    return {
      todos: [],
      newTodo: ''
    };
  },
  components: {
    TodoItem
  },
  methods: {
    fetchTodos() {
      axios.get('/TodoItems')
        .then(response => {
          this.todos = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the todos!", error);
        });
    },
    addTodo() {
      if (this.newTodo.trim() === '') return;
      axios.post('/TodoItems', { name: this.newTodo, isComplete: false })
        .then(response => {
          this.todos.push(response.data);
          this.newTodo = '';
        })
        .catch(error => {
          console.error("There was an error adding the todo!", error);
        });
    },
    deleteTodo(id) {
      axios.delete(`/TodoItems/${id}`)
        .then(() => {
          this.todos = this.todos.filter(todo => todo.id !== id);
        })
        .catch(error => {
          console.error("There was an error deleting the todo!", error);
        });
    },
    toggleComplete(todo) {
      axios.put(`/TodoItems/${todo.id}`, { ...todo, isComplete: !todo.isComplete })
        .then(response => {
          const index = this.todos.findIndex(t => t.id === todo.id);
          this.todos.splice(index, 1, response.data);
        })
        .catch(error => {
          console.error("There was an error updating the todo!", error);
        });
    }
  },
  mounted() {
    this.fetchTodos();
  }
}
</script>