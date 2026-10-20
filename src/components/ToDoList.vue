<script setup lang="ts">
import {ref, computed} from 'vue';
import TodoInput from './TodoInput.vue';
import TodoItem from './TodoItem.vue';

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

type Filter = 'all' | 'active' | 'completed';

const todos = ref<Todo[]>([]);
const filter = ref<Filter>('all');
let nextId = 1;

const addTodo = (text: string) => {
    todos.value.push({
        id: nextId++,
        text,
        completed: false,
    });
};

const deleteTodo = (id: number) => {
    todos.value = todos.value.filter(todo => todo.id !== id);
};

const toggleTodo = (id: number) => {
    const todo = todos.value.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
    }
};

const clearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed);
};

const filteredTodos = computed(() => {
    if (filter.value === 'active') {
        return todos.value.filter(todo => !todo.completed);
    }
    if (filter.value === 'completed') {
        return todos.value.filter(todo => todo.completed);
    }
    return todos.value;
});

const activeCount = computed(() => {
    return todos.value.filter(todo => !todo.completed).length;
});

const hasCompletedTodos = computed(() => {
    return todos.value.some(todo => todo.completed);
});
</script>

<template>
    <div class="todo-list-container">
        <h1>Todo List</h1>

        <TodoInput @add-todo="addTodo" />

        <div v-if="todos.length === 0" class="empty-state" data-test="empty-state">
            <p>Geen todos nog. Voeg er een toe om te beginnen!</p>
        </div>

        <div v-else>
            <div class="filters" data-test="filters">
                <button
                    :class="{ active: filter === 'all' }"
                    @click="filter = 'all'"
                    data-test="filter-all"
                >
                    Alles ({{ todos.length }})
                </button>
                <button
                    :class="{ active: filter === 'active' }"
                    @click="filter = 'active'"
                    data-test="filter-active"
                >
                    Actief ({{ activeCount }})
                </button>
                <button
                    :class="{ active: filter === 'completed' }"
                    @click="filter = 'completed'"
                    data-test="filter-completed"
                >
                    Voltooid ({{ todos.length - activeCount }})
                </button>
            </div>

            <ul v-if="filteredTodos.length > 0" class="todo-list" data-test="todo-list">
                <TodoItem
                    v-for="todo in filteredTodos"
                    :key="todo.id"
                    :todo="todo"
                    @toggle="toggleTodo"
                    @delete="deleteTodo"
                />
            </ul>

            <div v-else class="no-results" data-test="no-results">
                <p>Geen todos in dit filter</p>
            </div>

            <div class="footer">
                <span data-test="active-count">
                    {{ activeCount }} {{ activeCount === 1 ? 'taak' : 'taken' }} over
                </span>
                <button
                    v-if="hasCompletedTodos"
                    @click="clearCompleted"
                    data-test="clear-completed"
                    class="clear-button"
                >
                    Verwijder voltooide
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.todo-list-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 20px;
}

h1 {
    text-align: center;
    color: #343a40;
    margin-bottom: 32px;
    font-size: 48px;
    font-weight: 300;
}

.empty-state,
.no-results {
    text-align: center;
    padding: 40px 20px;
    color: #868e96;
    font-size: 18px;
}

.filters {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    padding: 0 16px;
}

.filters button {
    flex: 1;
    padding: 10px 16px;
    background-color: white;
    border: 2px solid #dee2e6;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    color: #495057;
    cursor: pointer;
    transition: all 0.2s;
}

.filters button:hover {
    border-color: #4a90e2;
    color: #4a90e2;
}

.filters button.active {
    background-color: #4a90e2;
    border-color: #4a90e2;
    color: white;
}

.todo-list {
    list-style: none;
    padding: 0 16px;
    margin: 0;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    margin-top: 20px;
    border-top: 2px solid #e9ecef;
    font-size: 14px;
    color: #868e96;
}

.clear-button {
    padding: 8px 16px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
}

.clear-button:hover {
    background-color: #c82333;
}
</style>