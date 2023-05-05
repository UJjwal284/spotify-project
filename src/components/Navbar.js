import React, {Component} from "react";
import {getData} from "../api/Api";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topTrackData: []
        }
    }

    componentDidMount() {
        const getTopTracks = async () => {
            await getData('v1/me', 'GET').then(async r => {
                const trackTemp = await r.json();
                console.log(trackTemp)

                this.setState({
                    topTrackData: trackTemp,
                })
            })
        }
        getTopTracks()
    }

    render() {
        return (<nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <p className={'ms-auto'}>Hello, {this.state.topTrackData.display_name}</p>
                <img src={'/spotify.png'} width={30}/>
            </div>
        </nav>);
    }
}

export default Navbar;
