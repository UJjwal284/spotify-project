import React, {Component} from "react";
import {getData} from "../api/Api";

class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topTrackData: []
        }
    }

    componentDidMount() {
        const getTopTracks = async (range, limit) => {
            await getData('v1/me/top/tracks?time_range=' + range + '&limit=' + limit, 'GET').then(async r => {
                const trackTemp = await r.json();
                // console.log(trackTemp.items)
                // let newState = [];
                // for (const tempKey in trackTemp.items) {
                //     newState.push(trackTemp.items.artists.map(value => value.name))
                // }
                // this.setState({
                //     topTrackData: newState
                // })
            })
        }
        getTopTracks(this.props.range, this.props.limit)
    }

    render() {
        return (<div className={'p-2'}>
            <h2 className={'h2 fw-bold'}>Overview</h2>

        </div>);
    }
}

export default Overview;
