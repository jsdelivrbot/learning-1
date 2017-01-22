import React, { Component } from 'react'
import ToDoItem from './todo-item'

class ToDoContainer extends Component {
    constructor(props) {
        super(props)
    }

    handleDelete(idx) {
        this.props.handleDelete(idx)
    }

    render() {
        const toDoItems = this.props.toDos.map((toDo, idx) => {
            return <ToDoItem key={idx} handleDelete={this.handleDelete.bind(this, idx)} toDoText={toDo} />
        })

        return (
            <ul className="list-group" style={{ maxHeight: 342, overflow: scroll}}>
                { toDoItems }
            </ul>
        )
    }
}

export default ToDoContainer