import React, {Component} from "react";
import {getData} from "../api/Api";

class TopArtists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topTrackData: [],
        }
    }

    componentDidMount() {
        const getTopTracks = (range, limit) => {
            getData('v1/me/top/artists?time_range=' + range + '&limit=' + limit, 'GET').then(async r => {
                const trackTemp = await r.json();
                // console.log(trackTemp.items)
                const newState = [];
                for (const tempKey in trackTemp.items) {
                    newState.push(trackTemp.items[tempKey])
                }

                this.setState({
                    topTrackData: newState,
                })
            })
        }
        getTopTracks(this.props.range, this.props.limit)
    }

    render() {
        return (<div className={'p-2'}>
            <h2 className={'h2 fw-bold'}>Top Artists</h2>
            {/*{console.log(this.state.topTrackData)}*/}
            {/*{setTimeout(() => console.log(this.state.topAlbumData), 1000)}*/}
            <div
                className='my-2 text-center w-100 px-1'>
                {this.state.topTrackData.map(item => <a className={'me-2 position-relative align-text-bottom'}
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

export default TopArtists;