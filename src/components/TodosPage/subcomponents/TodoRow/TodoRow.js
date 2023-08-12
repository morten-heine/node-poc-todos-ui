import React from 'react';
import { Link } from 'react-router-dom';
import './TodoRow.css';
import '../../../../App.css';

const TodoRow = (props) => {
    const { todo, markTodoDone, markTodoUndone } = props;

    return (
        <div className={`todo-row ${todo.id ? 'done' : ''}`}>
            <input
                type="checkbox"
                checked={todo.done}
                onChange={todo.done ? () => markTodoUndone(todo.id) : () => markTodoDone(todo.id)}
                id={todo.id}
                aria-label="Mark todo done"
            />
            {todo.name}
            <Link to={`/todos/${todo.id}/comments`} className="button">Comments</Link>
        </div>
    );
}

export default TodoRow;
