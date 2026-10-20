<script setup lang="ts">
import {ref} from 'vue';

const emit = defineEmits<{
    'add-todo': [text: string];
}>();

const newTodo = ref('');

const handleSubmit = () => {
    const trimmed = newTodo.value.trim();

    if (trimmed === '') {
        return;
    }

    emit('add-todo', trimmed);
    newTodo.value = '';
};
</script>

<template>
    <form @submit.prevent="handleSubmit" data-test="todo-form">
        <input
            v-model="newTodo"
            type="text"
            placeholder="Wat moet er gedaan worden?"
            data-test="todo-input"
        />
        <button
            type="submit"
            data-test="add-button"
            :disabled="newTodo.trim() === ''"
        >
            Toevoegen
        </button>
    </form>
</template>

<style scoped>
form {
    display: flex;
    gap: 12px;
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 20px;
}

input {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #dee2e6;
    border-radius: 6px;
    font-size: 16px;
    transition: border-color 0.2s;
}

input:focus {
    outline: none;
    border-color: #4a90e2;
}

button {
    padding: 12px 24px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, opacity 0.2s;
}

button:hover:not(:disabled) {
    background-color: #357abd;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>