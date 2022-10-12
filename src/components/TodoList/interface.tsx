export interface Todo {
    id: number;
    content: string;
    completed: boolean;
}

export interface Store {
    todoList: Todo[];
}

export interface Action {
    type: ACTION_TYPE;
    payload?: Todo | number
}

export type ACTION_TYPE = 'getTodo' | 'addTodo' | 'deleteTodo' | 'toggleTodoCompleted' | 'updateTodo'