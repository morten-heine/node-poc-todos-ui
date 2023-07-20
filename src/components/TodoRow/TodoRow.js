import React from 'react';
import { Link } from 'react-router-dom';
import './TodoRow.css';
import '../../App.css';

class TodoRow extends React.Component {
    render() {
        const { todo, markTodoDone, markTodoUndone } = this.props;
        const isDone = todo.done;

        return (
            <div className={`todo-row ${isDone ? 'done' : ''}`}>
                <input
                    type="checkbox"
                    checked={isDone}
                    onChange={isDone ? () => markTodoUndone(todo.id) : () => markTodoDone(todo.id)}
                    id={todo.id}
                />
                {todo.name}
                <Link to={`/todos/${todo.id}/comments`} className="button">Comments</Link>
            </div>
        );
    }
}

export default TodoRow;
