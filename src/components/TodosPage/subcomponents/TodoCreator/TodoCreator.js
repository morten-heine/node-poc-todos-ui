import React, { useState } from 'react';
import '../../../../App.css';

const TodoCreator = (props) => {
    const [input, setInput] = useState("");

    const handleInputChange = (event) => {
        setInput(event.target.value);
    }

    const handleAddTodo = async () => {
        props.onAddTodo(input);
        setInput("");
    }

    return (
        <div className="input-button-wrapper">
            <input type="text" onChange={handleInputChange} value={input} id="addText" aria-label="Add Todo"/>
            <button onClick={handleAddTodo} id="addButton" className="button">Add Todo</button>
        </div>
    );
}

export default TodoCreator;
