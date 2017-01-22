import React from 'react'

const ToDoItem = (props) =>
    <li className="list-group-item" style={{ position: 'relative', minHeight: 50 }}>
        {props.toDoText}
        <button
            onClick={props.handleDelete}
            className="btn btn-secondary"
            style={{ position: 'absolute', right: 10, width: 82 }}>
                Done
        </button>
    </li>

export default ToDoItem