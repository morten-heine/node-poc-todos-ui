import React from 'react';
import '../../App.css';

class TodoCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: ""
        };
    }

    handleInputChange = (event) => {
        this.setState({ input: event.target.value });
    }


    handleAddTodo = async () => {
        this.props.onAddTodo(this.state.input);
        this.setState({ input: "" });
    }

    render() {
        return (
            <div className="input-button-wrapper">
                <input type="text" onChange={this.handleInputChange} value={this.state.input} id="addText"/>
                <button onClick={this.handleAddTodo} id="addButton" className="button">Add</button>
            </div>
        );
    }
}

export default TodoCreator;
