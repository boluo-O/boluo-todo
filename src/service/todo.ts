import { Todo, ACTION_TYPE } from '../components/TodoList/interface';

const todo = {
    get: (): Todo[] => {
        const todoList: Todo[] = JSON.parse(localStorage.getItem('todoList') || '[]')
        const _todoList = [
            ...todoList.filter((todo: Todo) => todo.completed === false),
            ...todoList.filter((todo: Todo) => todo.completed === true),
        ]
        return _todoList
    },
    add: (todo: Todo): void => {
        const todoList: Todo[] = JSON.parse(localStorage.getItem('todoList') || '[]')
        todoList.push(todo)
        localStorage.setItem('todoList', JSON.stringify(todoList))
    },
    delete: (id: number): void => {
        let todoList: Todo[] = JSON.parse(localStorage.getItem('todoList') || '[]')
        todoList = todoList.filter((todo: Todo) => todo.id !== id)
        localStorage.setItem('todoList', JSON.stringify(todoList))
    },
    toggleCompleted: (id: number): void => {
        let todoList: Todo[] = JSON.parse(localStorage.getItem('todoList') || '[]')
        todoList = todoList.map((todo: Todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed
            }
            return todo
        })
        localStorage.setItem('todoList', JSON.stringify(todoList))
    },
    update: (todo: Todo): void => {
        let todoList: Todo[] = JSON.parse(localStorage.getItem('todoList') || '[]')
        todoList = todoList.map((_todo: Todo) => {
            if (todo.id === _todo.id) {
                return todo
            }
            return _todo
        })
        localStorage.setItem('todoList', JSON.stringify(todoList))
    },
}
export default todo