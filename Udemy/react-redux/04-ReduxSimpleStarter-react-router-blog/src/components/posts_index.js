import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { fetchPosts } from '../actions'

export class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts()
    }
    render() {
        return (
            <div>
                <div className="text-xs-right">
                    <Link to="posts/new" className="btn btn-primary">
                        Add a Post
                    </Link>
                </div>
                <div>List of posts</div>
            </div>
        )
    }
}

// A shortcut for connecting component with the action creator
export default connect(null, { fetchPosts })(PostsIndex)