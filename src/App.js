import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import TopArtists from "./components/TopArtists";
import FollowedArtists from "./components/FollowedArtists";
import TopTracks from "./components/TopTracks";
import Overview from "./components/Overview";
import Navbar from "./components/Navbar";

function App() {
    const range = "short_term"
    const limit = 10
    return (<div className={'main'}>
        <Navbar/>
        <Overview range={range} limit={limit}/>
        <TopTracks range={range} limit={limit}/>
        <TopArtists range={range} limit={limit}/>
        <FollowedArtists/>
    </div>);
}

export default App;
