<template>
  <div>
    <h1 class="header">
      <video ref="headerVideo" src="@/assets/Rosa.mp4" v-show="!TodoVideoDelete && !TodoVideoComplete" width="400" autoplay loop muted></video>
      <video ref="deleteVideo" src="@/assets/Rojo.mp4" v-show="TodoVideoDelete" @ended="onDeleteVideoEnded" width="400" muted></video>
      <video ref="completeVideo" src="@/assets/Verde.mp4" v-show="TodoVideoComplete" @ended="onCompleteVideoEnded" width="400" muted></video>
    </h1>
    <div class="tareas">
      <input v-model="newTodo" placeholder="Añade una nueva tarea" />
      <button @click="addTodo">Añadir</button>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <TodoItem :todo="todo" @delete-todo="deleteTodo" @toggle-complete="toggleComplete" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import todoApi from '../Api/TodoApi';
import TodoItem from './TodoItem.vue';

// Refs de los videos
const headerVideo = ref(null);
const deleteVideo = ref(null);
const completeVideo = ref(null);

// Variables de estado
const todos = ref([]);
const newTodo = ref('');
const TodoVideoDelete = ref(false);
const TodoVideoComplete = ref(false);

// Eventos videos
const onDeleteVideoEnded = () => {
  TodoVideoDelete.value = false;
  if (headerVideo.value) {
    headerVideo.value.play();
  }
};

const onCompleteVideoEnded = () => {
  TodoVideoComplete.value = false;
  if (headerVideo.value) {
    headerVideo.value.play();
  }
};

// Fetch todos de la API
const fetchTodos = () => {
  todoApi.getToDo()
    .then((response) => {
      todos.value = response.data;
    })
    .catch((error) => {
      console.error('There was an error fetching the todos!', error);
    });
};

// Funciones para los todos
const addTodo = () => {
  if (newTodo.value.trim() === '') return;
  const todo = { name: newTodo.value, isComplete: false };
  todoApi.addToDo(todo)
    .then((response) => {
      todos.value.push(response.data);
      newTodo.value = '';
    })
    .catch((error) => {
      console.error('There was an error adding the todo!', error);
    });
};

const deleteTodo = (id) => {
  todoApi.deleteToDo(id)
    .then(() => {
      todos.value = todos.value.filter((todo) => todo.id !== id);
      playDeleteVideo(); // Video de eliminación
    })
    .catch((error) => {
      console.error('There was an error deleting the todo!', error);
    });
};

const toggleComplete = (todo) => {
  const updatedTodo = { ...todo, isComplete: !todo.isComplete };

  todoApi.updateToDo(todo.id, updatedTodo)
    .then(() => {
      const index = todos.value.findIndex((t) => t.id === todo.id);
      todos.value.splice(index, 1, updatedTodo);
      playCompleteVideo(); // Video de completado
    })
    .catch((error) => {
      console.error('There was an error updating the todo!', error);
    });
};

const playDeleteVideo = () => {
  resetVideos();
  TodoVideoDelete.value = true;
  if (deleteVideo.value) {
    deleteVideo.value.play();
  }
};

const playCompleteVideo = () => {
  resetVideos();
  TodoVideoComplete.value = true;
  if (completeVideo.value) {
    completeVideo.value.play();
  }
};

const resetVideos = () => {
  if (deleteVideo.value) {
    deleteVideo.value.pause();
    deleteVideo.value.currentTime = 0;
  }
  if (completeVideo.value) {
    completeVideo.value.pause();
    completeVideo.value.currentTime = 0;
  }
  TodoVideoDelete.value = false;
  TodoVideoComplete.value = false;
};

// Fetch los todos en el mounted
onMounted(fetchTodos);
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #000000;
  color: #e0e0e0;
}

body, html {
  height: 100%;
  font-family: Arial, sans-serif;
}

.header {
  margin: auto;
  width: 50%;
  padding: 10px;
  text-align: center;
  margin-top: 8%;
}
.header video {
  scale: 100%;
  width: 100%;
  border-radius: 10px 10px 0 0;
}

.tareas {
  margin-top: 20px;
  margin-left: 30%;
  margin-right: 30%;
}

.tareas input {
  width: calc(100% - 70px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.tareas button {
  background-size: cover;
  width: 60px;
  padding: 10px;
  background-color: #544a79;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
}

.tareas span {
  width: 60px;
  padding: 10px;
  background-color: #544a79;
  color: lightsteelblue;
  border: none;
  transition: background-color 0.3s ease;
}

.tareas button:hover {
  color: #755d92;
}

.tareas ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

.tareas li {
  background: #544a79;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.todo-item {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.todo-item.completed {
  text-decoration: line-through;
  color: #6c757d;
}

.todo-item button {
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: #dc3545;
  transition: color 0.3s ease;
}

.todo-item button:hover {
  color: #c82333;
}
</style>