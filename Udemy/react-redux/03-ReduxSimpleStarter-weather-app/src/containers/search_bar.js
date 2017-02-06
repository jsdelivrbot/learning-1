import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWeather } from '../actions'

export class SearchBar extends Component {
    constructor(props) {
        super(props)

        // This is COMPONENT state not APP state
        this.state = { term: '' }

        this.onInputChange = this.onInputChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

    onInputChange(event) {
        this.setState({ term: event.target.value })
    }

    onFormSubmit(event) {
        event.preventDefault()

        this.props.fetchWeather(this.state.term)

        // Clear form
        this.setState({ term: '' })
    }

    render() {
        return (
            <form onSubmit={ this.onFormSubmit } className="input-group">
                <input
                    placeholder="Get a five-day forecast in your favourite cities"
                    className="form-control"
                    value={ this.state.term }
                    onChange={ this.onInputChange }
                />
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">Submit</button>
                </span>
            </form>
        )
    }
}

// Maps the fetchWeather action creator to this.props.fetchWeather
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWeather }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)