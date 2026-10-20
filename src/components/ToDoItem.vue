<script setup lang="ts">
type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

defineProps<{
    todo: Todo;
}>();

const emit = defineEmits<{
    toggle: [id: number];
    delete: [id: number];
}>();
</script>

<template>
    <li class="todo-item" data-test="todo-item">
        <label class="checkbox-wrapper">
            <input
                type="checkbox"
                :checked="todo.completed"
                @change="emit('toggle', todo.id)"
                data-test="todo-checkbox"
            />
            <span
                class="todo-text"
                :class="{ completed: todo.completed }"
                data-test="todo-text"
            >
                {{ todo.text }}
            </span>
        </label>
        <button
            class="delete-button"
            @click="emit('delete', todo.id)"
            data-test="delete-button"
        >
            ✕
        </button>
    </li>
</template>

<style scoped>
.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: white;
    border: 1px solid #e9ecef;
    border-radius: 6px;
    margin-bottom: 8px;
    transition: box-shadow 0.2s;
}

.todo-item:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.checkbox-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    cursor: pointer;
}

input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.todo-text {
    font-size: 16px;
    transition: color 0.2s;
}

.todo-text.completed {
    text-decoration: line-through;
    color: #868e96;
}

.delete-button {
    padding: 6px 12px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
}

.delete-button:hover {
    background-color: #c82333;
}
</style>