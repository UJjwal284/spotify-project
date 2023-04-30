import React, {Component} from "react";
import {getData} from "../api/Api";
import {createTheme} from '@material-ui/core/styles'
import $ from 'jquery'

class TopTracks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topTrackData: [], playerURL: "", trackRecommendationData: []
        }
        this.handleClickPlay = this.handleClickPlay.bind(this)
        this.handleClickGetRecommendation = this.handleClickGetRecommendation.bind(this)
    }

    handleClickPlay(url) {
        this.setState({playerURL: url})
    }

    async handleClickGetRecommendation(id) {
        getData('v1/recommendations?limit=10&seed_tracks=' + id, 'GET').then(async r => {
            const trackTemp = await r.json();
            // console.log(trackTemp)
            let newState = [];
            for (const tempKey in trackTemp.tracks) {
                newState.push(trackTemp.tracks[tempKey])
            }
            console.log(newState)
            this.setState({
                trackRecommendationData: newState
            })
        })

        $('#' + id).animate({width: 'fit-content'}, "slow");
        $('#' + id + ' .artistsDiv').hide();
        $('#' + id + ' .trackFeatureDiv').hide()
        $('#' + id + ' .btnGroup').hide()
    }

    componentDidMount() {
        const getTopTracks = (range, limit) => {
            getData('v1/me/top/tracks?time_range=' + range + '&limit=' + limit, 'GET').then(async r => {
                const trackTemp = await r.json();
                // console.log(trackTemp.items)
                let newState = [];
                for (const tempKey in trackTemp.items) {
                    const trackData = trackTemp.items[tempKey]
                    await getData('v1/audio-features/' + trackTemp.items[tempKey].id, 'GET').then(async value => {
                        const trackAudioFeatureData = await value.json();
                        newState.push({trackData, trackAudioFeatureData})
                    })
                }
                // console.log("hi")
                this.setState({
                    topTrackData: newState
                })
            })
        }
        getTopTracks(this.props.range, this.props.limit)
    }

    render() {
        const muiTheme = createTheme({});
        return (<div className={'p-2'}>
            <h2 className={'h2 fw-bold'}>Top Tracks</h2>
            {/*{console.log(this.state.topTrackData)}*/}
            {/*{setTimeout(() => console.log(this.state.trackAudioFeatureData), 2000)}*/}
            {this.state.topTrackData.map((item, key) => <div
                className='my-2' id={item.trackData.id} key={item.trackData.name}>
                <div className={'d-flex cust-card'}>
                    {/*<iframe style={{borderRadius: "10px"}}*/}
                    {/*        src={`https://open.spotify.com/embed/track/${item.trackData.id}?utm_source=generator&theme=0`}*/}
                    {/*        width="50%" height="152" frameBorder="0" allowFullScreen=""*/}
                    {/*        loading="lazy"></iframe>*/}
                    <div className={'albumArtDiv'}>
                        <img className={'position-absolute playOverlay p-4'} src={'/play.png'}
                             style={{background: '#bebebe', zIndex: 2}} width={120} alt={item.trackData.name}
                             onClick={() => this.handleClickPlay(item.trackData.preview_url)}/>
                        <img style={{zIndex: 1}} src={item.trackData.album.images[0].url}
                             width={120} className={'albumArtImg'}
                             alt={item.trackData.name}/>
                    </div>
                    <div style={{width: "250px"}}>
                        <p className={'fs-4'}>{item.trackData.name}</p>
                        <a href={item.trackData.album.external_urls.spotify} className={'lh-1'} target="_blank"
                           rel="noreferrer">
                            <p style={{width: "fit-content", margin: 0}}>{item.trackData.album.name}</p>
                        </a>
                    </div>
                    <div className={'w-25 artistsDiv'}>
                        {item.trackData.artists.map(u => <a href={u.external_urls.spotify} target="_blank"
                                                            className={'d-inline-flex'} rel="noreferrer" key={u.name}>
                            <p className={'border border-light rounded-4 px-2 artistNameP'}>{u.name}</p>
                        </a>)}
                    </div>
                    <div className={'w-25 trackFeatureDiv'}>
                        <p className={'m-0'}>Popularity</p>
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar"
                                 style={{width: item.trackData.popularity + "%"}}
                            ></div>
                        </div>
                        <div className={'d-flex'}>
                            <div style={{width: "45%"}} className={'me-3'}>
                                <p className={'m-0'} style={{fontSize: 10}}>Acousticness</p>
                                <div className="progress" style={{height: 5}}>
                                    <div className="progress-bar" role="progressbar"
                                         style={{
                                             width: item.trackAudioFeatureData.acousticness * 100 + "%",
                                             backgroundColor: "#87a1c5"
                                         }}
                                    ></div>
                                </div>
                                <p className={'m-0'} style={{fontSize: 10}}>Danceability</p>
                                <div className="progress" style={{height: 5}}>
                                    <div className="progress-bar" role="progressbar"
                                         style={{
                                             width: item.trackAudioFeatureData.danceability * 100 + "%",
                                             backgroundColor: "#c1a94b"
                                         }}
                                    ></div>
                                </div>
                                <p className={'m-0'} style={{fontSize: 10}}>Energy</p>
                                <div className="progress" style={{height: 5}}>
                                    <div className="progress-bar" role="progressbar"
                                         style={{
                                             width: item.trackAudioFeatureData.energy * 100 + "%",
                                             backgroundColor: "#4d20ae"
                                         }}
                                    ></div>
                                </div>
                            </div>
                            <div style={{width: "45%"}}>
                                <p className={'m-0'} style={{fontSize: 10}}>Instrumentalness</p>
                                <div className="progress" style={{height: 5}}>
                                    <div className="progress-bar" role="progressbar"
                                         style={{
                                             width: item.trackAudioFeatureData.instrumentalness * 100 + "%",
                                             backgroundColor: "#c80505"
                                         }}
                                    ></div>
                                </div>
                                <p className={'m-0'} style={{fontSize: 10}}>Liveness</p>
                                <div className="progress" style={{height: 5}}>
                                    <div className="progress-bar" role="progressbar"
                                         style={{
                                             width: item.trackAudioFeatureData.liveness * 100 + "%",
                                             backgroundColor: "#d957e6"
                                         }}
                                    ></div>
                                </div>
                                <p className={'m-0'} style={{fontSize: 10}}>Speechiness</p>
                                <div className="progress" style={{height: 5}}>
                                    <div className="progress-bar" role="progressbar"
                                         style={{
                                             width: item.trackAudioFeatureData.speechiness * 100 + "%",
                                             backgroundColor: "#628612"
                                         }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={'bg-warning ms-auto me-0 btnGroup'}>
                        <p className={'bg-danger h-50 m-0 d-flex align-items-center text-white px-3'}
                           onClick={() => this.handleClickGetRecommendation(item.trackData.id)}>Get
                            Recommendations</p>

                        <a href={item.trackData.external_urls.spotify} target={"_blank"} rel="noreferrer">
                            <p className={'bg-info h-50 m-0 d-flex align-items-center text-white px-3'}>
                                <img
                                    src={"/spotify.png"}
                                    width={30} height={30}
                                    className={'spotifyImg me-2'}
                                    alt={"Spotify Image"}/>
                                Open in Spotify</p>
                        </a>
                    </div>
                    <div>
                        {this.state.trackRecommendationData.map(value => <div>
                            <p>{value.name}</p>
                        </div>)}
                    </div>
                </div>
            </div>)}
            {/*<ThemeProvider theme={muiTheme}>*/}
            {/*    <AudioPlayer src={this.state.playerURL}/>*/}
            {/*</ThemeProvider>*/}
        </div>);
    }
}

export default TopTracks;
