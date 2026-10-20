import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import TodoItem from '@/components/TodoItem.vue';

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
    id: 1,
    text: 'Buy milk',
    completed: false,
    ...overrides,
});

describe('TodoItem', () => {
    it('renders the todo text', () => {
        // Arrange
        const wrapper = shallowMount(TodoItem, {
            props: { todo: makeTodo({ text: 'Buy milk' }) },
        });

        // Act
        const text = wrapper.find('[data-test="todo-text"]');

        // Assert
        expect(text.text()).toBe('Buy milk');
    });

    it('checks the checkbox when the todo is completed and leaves it unchecked otherwise', () => {
        // Arrange
        const completed = shallowMount(TodoItem, {
            props: { todo: makeTodo({ completed: true }) },
        });
        const active = shallowMount(TodoItem, {
            props: { todo: makeTodo({ completed: false }) },
        });

        // Act
        const completedCheckbox = completed.find('[data-test="todo-checkbox"]');
        const activeCheckbox = active.find('[data-test="todo-checkbox"]');

        // Assert
        expect(completedCheckbox.element.checked).toBe(true);
        expect(activeCheckbox.element.checked).toBe(false);
    });

    it('adds the completed class to the text when the todo is completed', () => {
        // Arrange
        const completed = shallowMount(TodoItem, {
            props: { todo: makeTodo({ completed: true }) },
        });
        const active = shallowMount(TodoItem, {
            props: { todo: makeTodo({ completed: false }) },
        });

        // Act
        const completedText = completed.find('[data-test="todo-text"]');
        const activeText = active.find('[data-test="todo-text"]');

        // Assert
        expect(completedText.classes()).toContain('completed');
        expect(activeText.classes()).not.toContain('completed');
    });

    it('emits toggle with the todo id when the checkbox changes', async () => {
        // Arrange
        const wrapper = shallowMount(TodoItem, {
            props: { todo: makeTodo({ id: 7 }) },
        });
        const checkbox = wrapper.find('[data-test="todo-checkbox"]');

        // Act
        await checkbox.setValue(true);

        // Assert
        expect(wrapper.emitted('toggle')).toEqual([[7]]);
    });

    it('emits delete with the todo id when the delete button is clicked', async () => {
        // Arrange
        const wrapper = shallowMount(TodoItem, {
            props: { todo: makeTodo({ id: 7 }) },
        });
        const button = wrapper.find('[data-test="delete-button"]');

        // Act
        await button.trigger('click');

        // Assert
        expect(wrapper.emitted('delete')).toEqual([[7]]);
    });
});
