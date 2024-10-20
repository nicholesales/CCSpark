import React, { useMemo, useState } from "react";
import View360, { CylindricalProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

import './landing.css';
import image1 from './roomThumbnail/rm1.jpg';
import image2 from "./roomThumbnail/rm2.jpg";
import image3 from "./roomThumbnail/rm3.jpg";
import image4 from "./roomThumbnail/rm4.jpg";
import image5 from "./roomThumbnail/rm5.jpg";
import image6 from "./roomThumbnail/rm6.jpg";
import logo from "./chat.png";
import panorama1 from "./cylindricalPhotos/panorama1.jpg";
import panorama2 from "./cylindricalPhotos/panorama2.jpg";
import panorama3 from "./cylindricalPhotos/panorama3.jpg";
import panorama4 from "./cylindricalPhotos/panorama4.jpg";
import panorama5 from "./cylindricalPhotos/panorama5.jpg";
import panorama6 from "./cylindricalPhotos/panorama6.jpg";



function RoomThumbnail({ thumbnailURL, changePanorama }) {
    return (
        <div
            className="col thumbnail"
            style={{ backgroundImage: 'url(' + thumbnailURL + ')' }}
            onClick={changePanorama}
        >
        </div>
    )
}

function RoomGrid() {

    const [imageSource, setImageSource] = useState(panorama1);

    return (
        <>
            <div className="subdivider-left">
                <div className="logo-container">
                    <img className="logo" src={logo}>
                    </img>
                </div>
                <div className="row-container">
                    <div className="row">
                        <RoomThumbnail thumbnailURL={image1} changePanorama={() => setImageSource(panorama1)} />
                    </div>
                    <div className="row">
                        <RoomThumbnail thumbnailURL={image2} changePanorama={() => setImageSource(panorama2)} />
                    </div>
                    <div className="row">
                        <RoomThumbnail thumbnailURL={image3} changePanorama={() => setImageSource(panorama3)} />
                    </div>
                    <div className="row">
                        <RoomThumbnail thumbnailURL={image4} changePanorama={() => setImageSource(panorama4)} />
                    </div>
                    <div className="row">
                        <RoomThumbnail thumbnailURL={image5} changePanorama={() => setImageSource(panorama5)} />
                    </div>
                    <div className="row">
                        <RoomThumbnail thumbnailURL={image6} changePanorama={() => setImageSource(panorama6)} />
                    </div>
                </div>
            </div>
            <div className="subdivider-right">
                <ViewHandler imagesource={imageSource} />
            </div>
        </>
    );
}

function ChatIcon() {
    return (
        <>
            <a className="go-to-chatbot" href="/chatbot">
                <div className="chaticon">
                    Go To Chatbot -&gt;
                </div>
            </a>
        </>
    )
}

function ViewHandler({ imagesource }) {
    const projection = useMemo(() => new CylindricalProjection({
        src: imagesource,
        partial: true
    }), [imagesource]);

    return (
        <View360 className="is-16by9 fade-in" projection={projection} />
        // Landscape mobile ui
    );
}

function App() {
    return (
        <>
            <div className="container-fluid container-height-adjustment">
                <RoomGrid />
                <ChatIcon />
            </div>
        </>
    );
}

export default App;
