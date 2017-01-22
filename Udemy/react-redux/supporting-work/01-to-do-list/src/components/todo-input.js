import React, { Component } from 'react'

class ToDoInput extends Component {
    constructor(props) {
        super(props)
        this.state = { currentToDo: '' }
    }

    onInputChange(text) {
        this.setState({ currentToDo: text })
    }

    createToDo() {
        this.state.currentToDo
        this.props.onSubmit(this.state.currentToDo)
        this.setState({ currentToDo: '' })
    }

    render() {
        return (
            <div 
                className="input-group"
                style={{ padding: '10px' }}>
                <input
                    style={{ marginRight: 10 }}
                    className="form-control" 
                    placeholder="Add todo"
                    value={ this.state.currentToDo }
                    onChange={ event => this.onInputChange(event.target.value) } />

                <button 
                    className="btn btn-outline-primary"
                    onClick={ () => this.createToDo() }>Create</button>
            </div>
        )
    }
}

export default ToDoInput