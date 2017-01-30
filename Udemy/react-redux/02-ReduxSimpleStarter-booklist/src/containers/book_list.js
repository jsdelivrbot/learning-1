import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectBook } from '../actions/index'
import { bindActionCreators } from 'redux'

class BookList extends Component {
    renderList() {
        return this.props.books.map((book) => {
            return (
                <li 
                    onClick={() => this.props.selectBook(book)} 
                    key={book.title} 
                    className="list-group-item">
                        {book.title}
                </li>
            );
        });
    }

    render() {
        return (
            <ul className="list-group col-sm-4">
                { this.renderList() }
            </ul>
        )
    }
}

function mapStateToProps(state) {
    // Whatever is returned will show up as props inside BookList
    return {
        books: state.books
    }
}

// Anything returned from this function will end up as props on the bookList container
function mapDispatchToProps(dispatch) {
    // Whenever selectBook is called, the result should be passed to ALL reducers
    return bindActionCreators({ selectBook: selectBook }, dispatch)
}

// This CONNECTS react to redux and makes BookList a CONTAINER
// (able to access application state)
export default connect(mapStateToProps, mapDispatchToProps)(BookList)

// As state updates, BookList will re-render