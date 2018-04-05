import React, { Component } from 'react';
import WaterFlow from '../common/waterFlow';

var list = [
    { src: './bg1.jpg' },
    { src: './bg2.jpg' },
    { src: './bg3.jpg' },
    { src: './bg4.jpg' },
    { src: './bg5.jpg' },
    { src: './bg6.jpg' },
    { src: './bg7.jpg' },
    { src: './bg8.jpg' },
    { src: './bg9.jpg' },
    { src: './bg10.jpg' },
    { src: './bg11.jpg' },
    { src: './bg12.jpg' },
    { src: './bg13.jpg' },
    { src: './bg14.jpg' },
    { src: './bg15.jpg' },
    { src: './bg16.jpg' },
    { src: './bg17.jpg' },
    { src: './bg18.jpg' },
    { src: './bg19.jpg' },
    { src: './bg20.jpg' },
    { src: './bg21.jpg' },
    { src: './bg22.jpg' },
    { src: './bg23.jpg' },
    { src: './bg24.jpg' },
    { src: './bg25.jpg' },
    { src: './bg26.jpg' },
    { src: './bg27.jpg' },
    { src: './bg28.jpg' }
]
export default class Photo extends Component {

    pullMore = () => {

    }

    render() {
        return (
            <div>
                <WaterFlow list={list || []} itemWidth="250" pullMore={this.pullMore}/>
            </div>
        )
    }
}
