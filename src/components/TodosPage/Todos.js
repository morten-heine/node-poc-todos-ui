import React from 'react';
import TodoCreator from './subcomponents/TodoCreator/TodoCreator';
import TodoRow from './subcomponents/TodoRow/TodoRow';
import './Todos.css';
import { getApiBaseUrl } from '../../utils/config.js';

class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            showCompleted: false
        };
        this.baseUrl = getApiBaseUrl();
    }

    componentDidMount = async () => {
        try {
            const response = await fetch(`${this.baseUrl}/todos`);
            const todos = await response.json();
            this.setState({ todos:todos });

        } catch(error) {
            console.error("Failed to fetch todos:", error);
            this.setState({ todos: [] });
        }
    }

    addTodo = async (newText) => {
        const response = await fetch(`${this.baseUrl}/todos/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newText, done:false })
        });
        const newTodo = await response.json();
        this.setState({
            todos: [...this.state.todos, newTodo]
        });
    }

    markTodoDone = async (id) => {
        await fetch(`${this.baseUrl}/todos/${id}/done`, { method: 'POST' });
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        done: true
                    };
                }
                return todo;
            })
        });
    }

    markTodoUndone = async (id) => {
        await fetch(`${this.baseUrl}/todos/${id}/undone`, { method: 'POST' });
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        done: false
                    };
                }
                return todo;
            })
        });
    }

    toggleShowCompleted = () => {
        this.setState({ showCompleted: !this.state.showCompleted });
    }

    render() {
        const undoneTodos = Array.isArray(this.state.todos) ? this.state.todos.filter(todo => !todo.done) : [];
        const doneTodos = Array.isArray(this.state.todos) ? this.state.todos.filter(todo => todo.done) : [];

        return (
            <div className="header">
                <h1>Todo List: {undoneTodos.length} items left</h1>
                <TodoCreator onAddTodo={this.addTodo} />
                <div className="display-completed">
                    <label>
                        <input type="checkbox" onChange={this.toggleShowCompleted} id="displayCompletedCheckbox"/> Display completed items
                    </label>
                </div>
                <div className="todo-list">
                    <h2>Undone</h2>
                    {undoneTodos.map(todo => (
                        <TodoRow
                            key={todo.id}
                            todo={todo}
                            markTodoDone={this.markTodoDone}
                            markTodoUndone={this.markTodoUndone}
                        />
                    ))}
                    {this.state.showCompleted && (
                        <>
                            <h2>Done</h2>
                            {doneTodos.map(todo => (
                                <TodoRow
                                    key={todo.id}
                                    todo={todo}
                                    markTodoDone={this.markTodoDone}
                                    markTodoUndone={this.markTodoUndone}
                                />
                            ))}
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default Todos;
