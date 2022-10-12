import { FC, ReactElement, useState, Fragment, KeyboardEvent, ChangeEvent } from 'react';
import { Todo } from '../interface'
import './style.less'

interface TodoItemProps {
    todo: Todo;
    toggleTodoCompleted: (id: number) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (todo: Todo) => void;
}

const TodoItem: FC<TodoItemProps> = (props): ReactElement => {
    const {
        todo,
        toggleTodoCompleted,
        deleteTodo,
        updateTodo,
    } = props
    const { id, content } = todo
    const [isEditingTodo, setIsEditingTodo] = useState<boolean>(false)
    const [inputVlaue, setInputVlaue] = useState<string>(content)

    const onUpdateTodo = (): void => {
        setIsEditingTodo(false)
        updateTodo({
            ...todo,
            content: inputVlaue
        })
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onUpdateTodo()
        }
    }

    return (
        <div className={`todo-item ${todo.completed ? 'todo-item-completed' : ''}`} >
            {
                isEditingTodo
                    ? <Fragment>
                        <input
                            className='nes-input input-edit'
                            type="text"
                            autoFocus={true}
                            value={inputVlaue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setInputVlaue(e.target.value)}
                            onKeyDown={onKeyDown}
                            onBlur={onUpdateTodo} />
                    </Fragment>
                    : <Fragment>
                        <div className='todo-item-content'>{content}</div>
                        <button className='nes-btn is-warning' onClick={() => setIsEditingTodo(true)}>编辑</button>
                        <button className='nes-btn is-success' onClick={() => toggleTodoCompleted(id)}>完成</button>
                        <button className='nes-btn is-error' onClick={() => deleteTodo(id)}>删除</button>
                    </Fragment>
            }
        </div>
    )
}

export default TodoItem