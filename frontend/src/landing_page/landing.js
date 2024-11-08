import React, { useMemo, useState, useEffect } from "react";
import View360, { CylindricalProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";

import './landing.css';
import image1 from './assets/roomThumbnail/rm1.jpg';
import image2 from "./assets/roomThumbnail/rm2.jpg";
import image3 from "./assets/roomThumbnail/rm3.jpg";
import image4 from "./assets/roomThumbnail/rm4.jpg";
import image5 from "./assets/roomThumbnail/rm5.jpg";
import image6 from "./assets/roomThumbnail/rm6.jpg";
import logo from "./assets/CCSpark-logo.png";
import panorama1 from "./assets/cylindricalPhotos/comp_lab_smaller.png";
import panorama2 from "./assets/cylindricalPhotos/dept_smaller.png";
import panorama3 from "./assets/cylindricalPhotos/mac_lab_smaller.png";
import panorama4 from "./assets/cylindricalPhotos/oracle_room_smaller.png";
import panorama5 from "./assets/cylindricalPhotos/panorama5.jpg";
import panorama6 from "./assets/cylindricalPhotos/panorama6.jpg";

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
                        <ChatIcon/>
                    </div>
                </div>
            )}
        </div>
    );
}

function RoomThumbnail({ thumbnailURL, changePanorama, roomname, divID, amIActive }) {

    return (
        <>
            <div
                className={amIActive ? "col thumbnail active-thumbnail" : "col thumbnail hoverable"}
                style={{ backgroundImage: 'url(' + thumbnailURL + ')' }}
                onClick={changePanorama}
                id={divID}
            >
                <div className="thumbnail-desc">
                    {roomname}
                </div>
            </div>
        </>
    )
}

function RoomGrid() {
    const roomnames = [
        <><strong>Computer Laboratory</strong></>,
        <><strong>CCS Department</strong></>,
        <><strong>MAC Laboratory</strong></>,
        <><strong>Oracle Laboratory</strong></>,
        <><strong>Lecture Room</strong></>,
        <><strong>ITSO</strong></>
    ];

    const locations = [
        ["A205", "A206", "A207"],
        ["2nd Floor Arlegui Bldg."],
        ["A207"],
        ["A222", "A223"],
        ["A211", "A213", "A215"],
        ["2nd Floor ARlegui Bldg. (near A225???)"]
    ];

    const descriptions = [
        <>This is the <strong>computer laboratory</strong></>,
        <>This is the <strong>CCS Department</strong>. Faculty is here.</>,
        <>This is the <strong>MAC Laboratory</strong> which has been recently renovated</>,
        <>This is the <strong>Oracle Laboratory</strong> where softwares made by the company Oracle can be used.</>,
        <>The <strong>Lecture Room</strong> is a well-equipped educational space designed to accommodate up to 40 students, with additional auxiliary seating available for special sessions. Each room is furnished with essential teaching tools including a wall-mounted whiteboard and a ceiling-mounted retractable projector screen for versatile instruction methods. To maintain a comfortable learning environment during the standard 2-hour lecture periods, the room is equipped with dual air-conditioning units that ensure consistent temperature control. The organized seating arrangement provides clear sightlines to both the whiteboard and projection screen, creating an optimal setting for both traditional lectures and multimedia presentations.</>,
        <>The ITSO Room is where you can go to to address any technical concern such as:<br></br> <ul> <li>installation of apps,</li> <li>lack of internet connection</li> </ul></>
    ];

    const [imageSource, setImageSource] = useState(panorama1);
    const [roomName, setRoomName] = useState(roomnames[0]);
    const [location, setLocation] = useState(locations[0]);
    const [description, setDescription] = useState(descriptions[0]);
    const [activeIndex, setActiveIndex] = useState(0);

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
    ];

    return (
        <>
            <div className="subdivider-left">
                <div className="logo-container">
                    <img className="logo" src={logo}>
                    </img>
                </div>
                <div className="row-container">
                    {images.map((thumbnailURL, index) => (
                        <div className="row" key={index}>
                            <RoomThumbnail
                                thumbnailURL={thumbnailURL}
                                changePanorama={() => {
                                    setActiveIndex(index);
                                    setImageSource(panoramaImages[index]);
                                    setRoomName(roomnames[index]);
                                    setLocation(locations[index]);
                                    setDescription(descriptions[index]);
                                    activeThumbnailChange(index);
                                }}
                                roomname={roomnames[index]}
                                divID={index}
                                amIActive={activeIndex === index}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="subdivider-center">
                <ViewHandler imagesource={imageSource} />
            </div>
            <div className="subdivider-right">
                <div className="room-title">
                    {roomName}
                </div>
                <div className="location-contents">
                    <div className="location-title">
                        Location:
                    </div>
                    <div className="location-list-container">
                        <ul className="location-list">
                            {location.map((location, index) => (
                                <li className="location-item" key={index}>{location}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="description-container">
                    <div className="description-content">
                        <p className="description">
                        {description}
                        </p>
                    </div>
                </div>
                <ChatIcon />
            </div>
        </>
    );
}

function activeThumbnailChange(id) {
    const thumbnail = document.getElementById(id);
    var otherThumbnails;

    for (let i = 0; i < 6; i++) {
        otherThumbnails = document.getElementById(i);
        otherThumbnails.classList.remove("active-thumbnail");
        otherThumbnails.classList.add("hoverable")
    }
    thumbnail.classList.remove("hoverable");
    thumbnail.classList.add("active-thumbnail");
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
        <View360 className="is-5by3 fade-in" projection={projection} />
    );
}

function App() {
    return (
        <>
            <TopDiv />
            <div className="container-fluid container-height-adjustment">
                <RoomGrid />
                
            </div>
        </>
    );
}

export default App;