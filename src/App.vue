<template>
  <div id="app">
    <h1>To-Do List</h1>
    <form @submit.prevent="addOrUpdateTodo">
      <div class="task-input">
        <textarea v-model="newTodo" :placeholder="editingIndex === null ? 'Add a new task' : 'Edit task'" class="main-input"></textarea>
        <button type="submit" class="action-btn">Add</button>
      </div>
    </form>

    <div class="filter-buttons">
      <button @click="filterTasks('all')" class="filter-btn">All</button>
      <button @click="filterTasks('open')" class="filter-btn">Open</button>
      <button @click="filterTasks('completed')" class="filter-btn">Completed</button>
      <button @click="clearAllTasks" class="action-btn clear-all-btn">Clear All</button>
    </div>

    <input v-model="searchQuery" placeholder="Search tasks" class="search-input" />

    <ul>
      <li v-for="(task, index) of filteredTasks" :key="task.id">
        <div :class="{ 'completed': task.completed }" class="task-item">
          <div class="task-content-box">
            <div class="task-content">
              <input type="checkbox" v-model="task.completed">
              <span v-if="!task.completed" class="task-text">{{ task.name }}</span>
              <span v-else class="task-text">{{ task.name }} - Completed</span>
            </div>
            <div class="task-metadata">
              <p class="task-date">{{ formatDateTime(task.createdAt) }}</p>
            </div>
          </div>
          <div class="task-buttons-box">
            <div class="task-buttons">
              <button @click="editTask(index)" class="action-btn edit-btn">{{ editingIndex === index ? 'Cancel' : 'Edit' }}</button>
              <button @click="deleteTask(task.id)" class="action-btn delete-btn">Delete</button>
              <button v-if="editingIndex === index" @click="updateTask(index)" class="action-btn">{{ editingIndex === null ? 'Add' : 'Update' }}</button>
              <button v-if="!task.completed && editingIndex !== index" @click="markAsCompleted(task)" class="action-btn mark-btn">Mark Completed</button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  name: "App",
  data() {
    return {
      newTodo: "",
      tasks: [],
      editingIndex: null,
      filter: "all",
      searchQuery: ""
    };
  },
  created() {
    this.fetchTasksFromLocalStorage();
  },
  computed: {
    filteredTasks() {
      let filtered = this.tasks;
      if (this.filter === "open") {
        filtered = filtered.filter(task => !task.completed);
      } else if (this.filter === "completed") {
        filtered = filtered.filter(task => task.completed);
      }
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(task => task.name.toLowerCase().includes(query));
      }
      return filtered;
    }
  },
  methods: {
    addOrUpdateTodo() {
      if (this.editingIndex === null) {
        this.addTask();
      } else {
        this.updateTask();
      }
    },
    addTask() {
      const { newTodo } = this;
      if (!newTodo.trim()) return;
      const task = {
        id: uuidv4(),
        name: newTodo,
        createdAt: new Date(),
        completed: false
      };
      this.tasks.push(task);
      this.newTodo = "";
      this.saveTasksToLocalStorage();
    },
    updateTask() {
      const task = this.tasks[this.editingIndex];
      if (!this.newTodo.trim()) return;
      task.name = this.newTodo;
      this.newTodo = "";
      this.editingIndex = null;
      this.saveTasksToLocalStorage();
    },
    editTask(index) {
      if (this.editingIndex === index) {
        this.cancelEdit();
      } else {
        this.editingIndex = index;
        this.newTodo = this.tasks[index].name;
      }
    },
    cancelEdit() {
      this.newTodo = "";
      this.editingIndex = null;
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.saveTasksToLocalStorage();
    },
    markAsCompleted(task) {
      task.completed = true;
      this.saveTasksToLocalStorage();
    },
    clearAllTasks() {
      this.tasks = [];
      this.saveTasksToLocalStorage();
    },
    formatDateTime(datetime) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(datetime).toLocaleString(undefined, options);
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    fetchTasksFromLocalStorage() {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        this.tasks = JSON.parse(savedTasks);
      }
    },
    filterTasks(filter) {
      this.filter = filter;
    }
  }
};
</script>

<style>
/* Main container */
#app {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  font-family: cursive;
}

/* Header */
h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 28px;
}

/* Form */
form {
  margin-bottom: 20px;
}

.task-input {
  display: flex;
  align-items: center;
}

.main-input {
  flex: 1; 
  resize: vertical; 
  min-height: 50px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  overflow-y: auto; 
}

.main-input:focus {
  outline: none;
  border-color: #66afe9;
}

/* Buttons */
button.action-btn {
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-left: 5px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button.action-btn:hover {
  background-color: #45a049;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Task items */
.task-item {
  margin-bottom: 10px;
  background-color: #fff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column; 
}

.task-item:hover {
  background-color: #f0f0f0;
}

.completed span {
  text-decoration: line-through;
  color: #888;
}

.task-content-box {
  flex: 1;
  margin-bottom: 10px; 
}

.task-content {
  display: flex;
  align-items: center;
}

.task-text {
  word-wrap: break-word; 
  overflow-y: auto; 
  resize: vertical; 
  min-height: 50px; 
}

.task-buttons-box {
  flex-shrink: 0;
}

.task-buttons {
  display: flex;
  align-items: center;
  justify-content: center; 
}

/* Filter buttons */
.filter-buttons {
  margin-bottom: 20px;
}

.filter-btn {
  background-color: #008CBA;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 5px;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-btn:hover {
  background-color: #005f75;
}

/* Search input */
.search-input {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
}

.search-input:focus {
  outline: none;
  border-color: #66afe9;
}

/* Responsive */
@media only screen and (max-width: 600px) {
  .main-input,
  .search-input,
  .filter-btn,
  button.action-btn {
    width: calc(50% - 5px);
    margin-right: 5px;
    margin-bottom: 10px;
  }

  .filter-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
