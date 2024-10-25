import React, { useMemo, useState, useEffect } from "react";
import Slider from 'react-slick';
import View360, { CylindricalProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './landing.css';
import image1 from './roomThumbnail/rm1.jpg';
import image2 from "./roomThumbnail/rm2.jpg";
import image3 from "./roomThumbnail/rm3.jpg";
import image4 from "./roomThumbnail/rm4.jpg";
import image5 from "./roomThumbnail/rm5.jpg";
import image6 from "./roomThumbnail/rm6.jpg";
import logo from "./mema-logo.png";
import panorama1 from "./cylindricalPhotos/panorama1.jpg";
import panorama2 from "./cylindricalPhotos/panorama2.jpg";
import panorama3 from "./cylindricalPhotos/panorama3.jpg";
import panorama4 from "./cylindricalPhotos/panorama4.jpg";
import panorama5 from "./cylindricalPhotos/panorama5.jpg";
import panorama6 from "./cylindricalPhotos/panorama6.jpg";

function TopDiv() {
    const [isVisible, setIsVisible] = useState(false);

    const checkViewport = () => {
        if (window.innerHeight > window.innerWidth) {
            setIsVisible(true); // Show the div
        } else {
            setIsVisible(false); // Hide the div
        }
    };

    useEffect(() => {
        // Check on initial render
        checkViewport();

        // Add event listener for window resize
        window.addEventListener('resize', checkViewport);

        // Cleanup event listener on component unmount
        return () => {
            window.removeEventListener('resize', checkViewport);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <div className="top-div" id="topDiv">
                    <div className="landscape-warning"> 
                        Please rotate your screen to <b> Landscape </b> to view the Virtual Tour or go to chatbot
                    </div>
                </div>
            )}
        </div>
    );
}

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

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // Adjust for larger screens
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 768, // Adjust for tablets
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480, // Adjust for mobile devices
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };

    const images = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6
    ];

    const panoramaImages = [
        panorama1,
        panorama2,
        panorama3,
        panorama4,
        panorama5,
        panorama6
    ]

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
                    Go To Chatbot
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
        // Landscape mobile ui
        <View360 className="is-16by9 fade-in" projection={projection} />
    );
}

function App() {
    return (
        <>
            <TopDiv/>
            <div className="container-fluid container-height-adjustment">
                <RoomGrid />
                <ChatIcon />
            </div>
        </>
    );
}

export default App;