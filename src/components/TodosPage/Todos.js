import React, { useState, useEffect, useContext } from 'react';
import TodoCreator from './subcomponents/TodoCreator/TodoCreator';
import TodoRow from './subcomponents/TodoRow/TodoRow';
import './Todos.css';
import { getApiBaseUrl } from '../../utils/config.js';
import { AppContext } from '../../App';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const { showCompleted, setShowCompleted } = useContext(AppContext);
    const baseUrl = getApiBaseUrl();

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(`${baseUrl}/todos`);
                const todos = await response.json();
                setTodos(todos);
            } catch(error) {
                console.error("Failed to fetch todos:", error);
                setTodos([]);
            }
        }
        fetchTodos();
    }, []);

    const undoneTodos = todos.filter(todo => !todo.done);
    const doneTodos = todos.filter(todo => todo.done);

    const addTodo = async (newText) => {
        const response = await fetch(`${baseUrl}/todos/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newText, done:false })
        });
        const newTodo = await response.json();
        setTodos(prevTodos => [...prevTodos, newTodo]);
    }

    const markTodoDone = async (id) => {
        await fetch(`${baseUrl}/todos/${id}/done`, { method: 'POST' });
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, done: true } : todo
            )
        );
    }

    const markTodoUndone = async (id) => {
        await fetch(`${baseUrl}/todos/${id}/undone`, { method: 'POST' });
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === id ? { ...todo, done: false } : todo
            )
        );
    }

    const toggleShowCompleted = () => {
        setShowCompleted(!showCompleted);
    }

    return (
        <div className="header">
            <h1>Todo List: {undoneTodos.length} items left</h1>
            <TodoCreator onAddTodo={addTodo} />
            <div className="display-completed">
                <label>
                    <input type="checkbox" checked={showCompleted} onChange={toggleShowCompleted} id="displayCompletedCheckbox"/> Display completed items
                </label>
            </div>
            <div className="todo-list">
                <h2>Undone</h2>
                {undoneTodos.map(todo => (
                    <TodoRow
                        key={todo.id}
                        todo={todo}
                        markTodoDone={markTodoDone}
                        markTodoUndone={markTodoUndone}
                    />
                ))}
                {showCompleted && (
                    <>
                        <h2>Done</h2>
                        {doneTodos.map(todo => (
                            <TodoRow
                                key={todo.id}
                                todo={todo}
                                markTodoDone={markTodoDone}
                                markTodoUndone={markTodoUndone}
                            />
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}

export default Todos;
