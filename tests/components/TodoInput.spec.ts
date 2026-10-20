import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import TodoInput from '@/components/TodoInput.vue';

describe('TodoInput', () => {
    it('renders the form, input and submit button', () => {
        // Arrange
        const wrapper = shallowMount(TodoInput);

        // Act
        const form = wrapper.find('[data-test="todo-form"]');
        const input = wrapper.find('[data-test="todo-input"]');
        const button = wrapper.find('[data-test="add-button"]');

        // Assert
        expect(form.exists()).toBe(true);
        expect(input.exists()).toBe(true);
        expect(button.exists()).toBe(true);
    });

    it('emits add-todo with the trimmed text when the form is submitted', async () => {
        // Arrange
        const wrapper = shallowMount(TodoInput);
        const input = wrapper.find('[data-test="todo-input"]');
        const form = wrapper.find('[data-test="todo-form"]');

        // Act
        await input.setValue('  Buy milk  ');
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('add-todo')).toEqual([['Buy milk']]);
    });

    it('clears the input after a successful submit', async () => {
        // Arrange
        const wrapper = shallowMount(TodoInput);
        const input = wrapper.find('[data-test="todo-input"]');
        const form = wrapper.find('[data-test="todo-form"]');

        // Act
        await input.setValue('Buy milk');
        await form.trigger('submit');

        // Assert
        expect(input.element.value).toBe('');
    });

    it('does not emit when the input is empty or whitespace-only', async () => {
        // Arrange
        const wrapper = shallowMount(TodoInput);
        const input = wrapper.find('[data-test="todo-input"]');
        const form = wrapper.find('[data-test="todo-form"]');

        // Act
        await form.trigger('submit');
        await input.setValue('   ');
        await form.trigger('submit');

        // Assert
        expect(wrapper.emitted('add-todo')).toBeUndefined();
    });

    it('disables the submit button when the input is empty and enables it when filled', async () => {
        // Arrange
        const wrapper = shallowMount(TodoInput);
        const input = wrapper.find('[data-test="todo-input"]');
        const button = wrapper.find('[data-test="add-button"]');

        // Act
        // Assert
        expect(button.element.disabled).toBe(true);

        // Act
        await input.setValue('Buy milk');

        // Assert
        expect(button.element.disabled).toBe(false);
    });
});
