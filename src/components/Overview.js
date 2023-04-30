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
        const getTopTracks = () => {
            getData('v1/me/following?type=artist', 'GET').then(async r => {
                const trackTemp = await r.json();
                // console.log(trackTemp.items)
                // setTimeout(() => console.log(trackTemp), 2000)

                const newState = [];
                for (const tempKey in trackTemp.artists.items) {
                    newState.push(trackTemp.artists.items[tempKey])
                }

                this.setState({
                    topTrackData: newState,
                })
            })
        }
        getTopTracks()
    }

    render() {
        return (<div className={'p-2'}>
            <h2 className={'h2 fw-bold'}>Overview</h2>

        </div>);
    }
}

export default Overview;
