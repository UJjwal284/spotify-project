import React, {Component} from "react";
import {getData} from "../api/Api";

class FollowedArtists extends Component {
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
            <h2 className={'h2 fw-bold'}>Followed Artists</h2>
            {/*{console.log(this.state.topTrackData)}*/}
            {/*{setTimeout(() => console.log(this.state.topTrackData), 2000)}*/}
            <div
                className='my-2 text-center w-100'>
                {this.state.topTrackData.map(item => <a className={'mx-2 position-relative align-text-bottom'}
                                                        target="_blank"
                                                        href={item.external_urls.spotify} rel="noreferrer"
                                                        key={item.name}>
                    <img src={item.images[0].url} width={200} height={200} className={'overflow-hidden'}
                         alt={item.name}/>
                    <p className={'artistName text-white fw-bold'}>{item.name}</p>
                </a>)}
            </div>
        </div>);
    }
}

export default FollowedArtists;
