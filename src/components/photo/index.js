import React, { Component } from 'react';
import WaterFlow from '../common/waterFlow';
import photos from '../../lib/photos'
export default class Photo extends Component {

    state = {
        list: photos.slice(0,50)
    }

    pullMore = (cb) => {
        let total = photos.length;
        let { list } = this.state;
        let ml = [];
        if(list.length < total) {
            ml = photos.slice(list.length, list.length+50);
            this.setState({ list: list.concat(ml) }, () => {
                cb && cb()
            })
        }
    }

    render() {
        let { list } = this.state;
        return (
            <div>
                <WaterFlow list={list || []} itemWidth="250" pullMore={this.pullMore} />
            </div>
        )
    }
}
