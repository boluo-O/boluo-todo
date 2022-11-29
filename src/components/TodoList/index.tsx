import { useReducer, FC, ReactElement, useEffect } from 'react'
import { Todo, Store } from './interface'
import { todoReducer } from './reducer'
import NewTodo from './NewTodo'
import TodoItem from './TodoItem'
import './style.less'

const demoTodoList: Todo[] = [
	{
		id: 4,
		content: '等待十分钟',
		completed: false,
	},
	{
		id: 3,
		content: '关上冰箱门',
		completed: false,
	},
	{
		id: 2,
		content: '把大象放进去',
		completed: false,
	},
	{
		id: 1,
		content: '打开冰箱门',
		completed: true,
	},
]

const TodoList: FC = (): ReactElement => {
	const initStore: Store = { todoList: [] }
	const [store, dispatch] = useReducer(todoReducer, initStore)
	const todoList = store.todoList
	const totalTodoNum = todoList.length
	const completedTodoNum = todoList.filter(
		(todo: Todo) => todo.completed
	).length
	const uncompletedTodoNum = todoList.filter(
		(todo: Todo) => !todo.completed
	).length

	// 第一次没有todo时会加载默认的demoTodoList
	const initTodoList = (): void => {
		const isFirstTime: boolean = localStorage.getItem('todoList') === null
		if (isFirstTime) {
			localStorage.setItem('todoList', JSON.stringify(demoTodoList))
		}
		dispatch({ type: 'getTodo' })
	}

	const addTodo = (todo: Todo): void => {
		dispatch({ type: 'addTodo', payload: todo })
	}

	const deleteTodo = (id: number): void => {
		dispatch({ type: 'deleteTodo', payload: id })
	}

	const toggleTodoCompleted = (id: number): void => {
		dispatch({ type: 'toggleTodoCompleted', payload: id })
	}

	const updateTodo = (todo: Todo): void => {
		dispatch({ type: 'updateTodo', payload: todo })
	}

	useEffect(() => {
		initTodoList()
	}, [])

	return (
		<div className="todo-box nes-container with-title">
			<h3 className="title">TODO</h3>
			<NewTodo addTodo={addTodo} />
			<div className="todo-list">
				<ul className="nes-list is-disc">
					{todoList.map((todo: Todo) => {
						return (
							<li key={todo.id}>
								<TodoItem
									todo={todo}
									toggleTodoCompleted={toggleTodoCompleted}
									updateTodo={updateTodo}
									deleteTodo={deleteTodo}
								/>
							</li>
						)
					})}
				</ul>
			</div>
			<div className="statistics">
				<span>总计：{totalTodoNum}</span>
				<span>已完成：{completedTodoNum}</span>
				<span>未完成：{uncompletedTodoNum}</span>
			</div>
		</div>
	)
}

export default TodoList
