import { Store, Action, Todo } from './interface';
import api from '@s/index'


export const todoReducer = (store: Store, action: Action) => {
    const { type, payload } = action

    switch (type) {
        case 'getTodo':
            break
        case 'addTodo':
            api.todo.add(payload as Todo)
            break
        case 'deleteTodo':
            api.todo.delete(payload as number)
            break
        case 'toggleTodoCompleted':
            api.todo.toggleCompleted(payload as number)
            break
        case 'updateTodo':
            api.todo.update(payload as Todo)
            break
        default:
            throw new Error('未知的type类型')
    }

    const todoList: Todo[] = api.todo.get()
    return {
        ...store,
        todoList,
    }
}

