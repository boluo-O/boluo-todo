import { useState, FC, ChangeEvent, ReactElement, KeyboardEvent } from 'react'
import { Todo } from '../interface'
import './style.less'

interface NewTodoProps {
    addTodo: (todo: Todo) => void
}

const NewTodo: FC<NewTodoProps> = (props): ReactElement => {
    const {
        addTodo,
    } = props

    const [inputValue, setInputValue] = useState<string>('')

    const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value)
    }

    const onAddTodo = (): void => {
        const value = inputValue.trim()
        if (addTodo && value) {
            addTodo({
                id: new Date().getTime(),
                content: value,
                completed: false,
            })
            setInputValue('')
        }
    }

    const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddTodo()
        }
    }

    return (
        <div className='todo-input'>
            <input type="text" className='nes-input' value={inputValue} onChange={onInputChange} onKeyDown={onKeyDown} />
            <button className='nes-btn is-primary' onClick={onAddTodo} >添加TODO</button>
        </div>
    )
}

export default NewTodo