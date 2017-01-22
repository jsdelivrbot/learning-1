import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// Components
import ToDoInput from './components/todo-input'
import ToDoContainer from './components/todo-container'

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            toDos: []
        }
    }

    handleCreateToDo(currentToDo) {
        this.setState({ toDos: this.state.toDos.concat(currentToDo)})
    }

    handleDelete(idx) {
        var updatedToDos = this.state.toDos.filter((toDo) => toDo !== this.state.toDos[idx])
        this.setState({ toDos: updatedToDos })
    }

    render() {
        var containerStyle = {
            width: 400,
            height: 403,
            border: '1px solid rgba(0, 0, 0, 0.15)',
            borderRadius: 5,
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }
        return (
            <div style={containerStyle}>
                <ToDoInput onSubmit={ this.handleCreateToDo.bind(this) } />
                <ToDoContainer handleDelete={ this.handleDelete.bind(this) } toDos={ this.state.toDos } />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('container'))