import React, { Component } from 'react';

export default class GoogleMap extends Component {
    componentDidMount() {
        new google.maps.Map(this.refs.map, {
            zoom: 12,
            center: {
                lat: this.props.lat,
                lng: this.props.lon
            }
        })
    }

    render() {
        return (
            // Ref creates a direct reference to the HTML DOM element
            // accessed by this.refs.XYZ
            <div ref="map" />
        );
    }
}