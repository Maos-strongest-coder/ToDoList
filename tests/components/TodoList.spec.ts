import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import TodoList from '@/components/TodoList.vue';
import TodoInput from '@/components/TodoInput.vue';
import TodoItem from '@/components/TodoItem.vue';

type Wrapper = ReturnType<typeof shallowMount>;

const mountList = () => shallowMount(TodoList);

const addTodo = async (wrapper: Wrapper, text: string) => {
    wrapper.findComponent(TodoInput).vm.$emit('add-todo', text);
    await wrapper.vm.$nextTick();
};

const emitTodoEvent = async (wrapper: Wrapper, index: number, event: string, id: number) => {
    wrapper.findAllComponents(TodoItem)[index].vm.$emit(event, id);
    await wrapper.vm.$nextTick();
};

describe('TodoList', () => {
    it('shows the empty state when there are no todos', () => {
        // Arrange
        const wrapper = mountList();

        // Act
        const emptyState = wrapper.find('[data-test="empty-state"]');

        // Assert
        expect(emptyState.exists()).toBe(true);
        expect(wrapper.find('[data-test="todo-list"]').exists()).toBe(false);
        expect(wrapper.find('[data-test="filters"]').exists()).toBe(false);
    });

    it('adds a todo and hides the empty state', async () => {
        // Arrange
        const wrapper = mountList();

        // Act
        await addTodo(wrapper, 'Buy milk');

        // Assert
        expect(wrapper.find('[data-test="empty-state"]').exists()).toBe(false);
        const items = wrapper.findAllComponents(TodoItem);
        expect(items).toHaveLength(1);
        expect(items[0].props('todo')).toEqual({ id: 1, text: 'Buy milk', completed: false });
    });

    it('deletes a todo and shows the empty state again when none remain', async () => {
        // Arrange
        const wrapper = mountList();
        await addTodo(wrapper, 'Buy milk');

        // Act
        await emitTodoEvent(wrapper, 0, 'delete', 1);

        // Assert
        expect(wrapper.findAllComponents(TodoItem)).toHaveLength(0);
        expect(wrapper.find('[data-test="empty-state"]').exists()).toBe(true);
    });

    it('toggles a todo to completed', async () => {
        // Arrange
        const wrapper = mountList();
        await addTodo(wrapper, 'Buy milk');

        // Act
        await emitTodoEvent(wrapper, 0, 'toggle', 1);

        // Assert
        expect(wrapper.findAllComponents(TodoItem)[0].props('todo').completed).toBe(true);
    });

    it('ignores toggling a todo that does not exist', async () => {
        // Arrange
        const wrapper = mountList();
        await addTodo(wrapper, 'Buy milk');

        // Act
        await emitTodoEvent(wrapper, 0, 'toggle', 999);

        // Assert
        expect(wrapper.findAllComponents(TodoItem)[0].props('todo').completed).toBe(false);
    });

    it('shows all todos and the correct counts in the all filter', async () => {
        // Arrange
        const wrapper = mountList();
        await addTodo(wrapper, 'Buy milk');
        await addTodo(wrapper, 'Walk dog');

        // Act
        await wrapper.find('[data-test="filter-all"]').trigger('click');

        // Assert
        expect(wrapper.findAllComponents(TodoItem)).toHaveLength(2);
        expect(wrapper.find('[data-test="filter-all"]').text()).toContain('Alles (2)');
        expect(wrapper.find('[data-test="filter-active"]').text()).toContain('Actief (2)');
        expect(wrapper.find('[data-test="filter-completed"]').text()).toContain('Voltooid (0)');
    });

    it('shows only active todos in the active filter', async () => {
        // Arrange
        const wrapper = mountList();
        await addTodo(wrapper, 'Buy milk');
        await addTodo(wrapper, 'Walk dog');
        await emitTodoEvent(wrapper, 0, 'toggle', 1);

        // Act
        await wrapper.find('[data-test="filter-active"]').trigger('click');

        // Assert
        expect(wrapper.findAllComponents(TodoItem)).toHaveLength(1);
        expect(wrapper.findAllComponents(TodoItem)[0].props('todo').text).toBe('Walk dog');
        expect(wrapper.find('[data-test="filter-active"]').text()).toContain('Actief (1)');
    });

    it('shows only completed todos in the completed filter', async () => {
        // Arrange
        const wrapper = mountList();
        await addTodo(wrapper, 'Buy milk');
        await addTodo(wrapper, 'Walk dog');
        await emitTodoEvent(wrapper, 0, 'toggle', 1);

        // Act
        await wrapper.find('[data-test="filter-completed"]').trigger('click');

        // Assert
        expect(wrapper.findAllComponents(TodoItem)).toHaveLength(1);
        expect(wrapper.findAllComponents(TodoItem)[0].props('todo').text).toBe('Buy milk');
        expect(wrapper.find('[data-test="filter-completed"]').text()).toContain('Voltooid (1)');
    });

    it('shows the no-results message when a filter has no matching todos', async () => {
        // Arrange
        const wrapper = mountList();
        await addTodo(wrapper, 'Buy milk');
        await emitTodoEvent(wrapper, 0, 'toggle', 1);

        // Act
        await wrapper.find('[data-test="filter-active"]').trigger('click');

        // Assert
        expect(wrapper.find('[data-test="no-results"]').exists()).toBe(true);
        expect(wrapper.find('[data-test="todo-list"]').exists()).toBe(false);
    });

    it('uses the singular taak for one active todo and the plural taken for more', async () => {
        // Arrange
        const wrapper = mountList();

        // Act
        await addTodo(wrapper, 'Buy milk');

        // Assert
        expect(wrapper.find('[data-test="active-count"]').text()).toContain('1 taak over');

        // Act
        await addTodo(wrapper, 'Walk dog');

        // Assert
        expect(wrapper.find('[data-test="active-count"]').text()).toContain('2 taken over');
    });

    it('hides the clear-completed button when there are no completed todos', async () => {
        // Arrange
        const wrapper = mountList();
        await addTodo(wrapper, 'Buy milk');

        // Act
        const clearButton = wrapper.find('[data-test="clear-completed"]');

        // Assert
        expect(clearButton.exists()).toBe(false);
    });

    it('removes completed todos when clear-completed is clicked', async () => {
        // Arrange
        const wrapper = mountList();
        await addTodo(wrapper, 'Buy milk');
        await addTodo(wrapper, 'Walk dog');
        await emitTodoEvent(wrapper, 0, 'toggle', 1);

        // Act
        await wrapper.find('[data-test="clear-completed"]').trigger('click');

        // Assert
        expect(wrapper.findAllComponents(TodoItem)).toHaveLength(1);
        expect(wrapper.findAllComponents(TodoItem)[0].props('todo').text).toBe('Walk dog');
        expect(wrapper.find('[data-test="clear-completed"]').exists()).toBe(false);
    });
});
