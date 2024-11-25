import React, { useMemo, useState, useEffect, useContext, createContext } from "react";
import View360, { CylindricalProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faTimes } from '@fortawesome/free-solid-svg-icons';

import './landing.css';
import image1 from './assets/roomThumbnail/comp_lab_thumbnail.png';
import image2 from "./assets/roomThumbnail/dept_thumbnail.png";
import image3 from "./assets/roomThumbnail/maclab_thumbnail.png";
import image4 from "./assets/roomThumbnail/oracle_thumbnail.png";
import image5 from "./assets/roomThumbnail/lecture_thumbnail.png";
import logo from "./assets/CCSpark-logo.png";
import panorama1 from "./assets/cylindricalPhotos/comp_lab_smaller.png";
import panorama2 from "./assets/cylindricalPhotos/dept_smaller.png";
import panorama3 from "./assets/cylindricalPhotos/mac_lab_smaller.png";
import panorama4 from "./assets/cylindricalPhotos/oracle_room_smaller.png";
import panorama5 from "./assets/cylindricalPhotos/lecture_room_smaller.png";

const GOOGLE_TTS_API_KEY = 'AIzaSyBLZzGbZteoJBw5dlWpBozOsTxPf5MV8o4';

const FontSizeContext = createContext();

// Provider Component
const FontSizeProvider = ({ children }) => {
    const [fontSize, setFontSize] = useState("16px");

    const isMobileDevice = () => {
        return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent) ||
            ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    const applyFontSize = () => {
        const size = isMobileDevice() ? "14px" : "30px";
        setFontSize(size);
        document.documentElement.style.fontSize = size;
    };

    useEffect(() => {
        applyFontSize();

        const handleResize = () => applyFontSize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <FontSizeContext.Provider value={fontSize}>
            {children}
        </FontSizeContext.Provider>
    );
};

// Hook to use font size
const useFontSize = () => {
    return useContext(FontSizeContext);
};


function TopDiv() {
    const [isVisible, setIsVisible] = useState(false);

    const checkViewport = () => {
        if (window.innerHeight > window.innerWidth) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        checkViewport();
        window.addEventListener('resize', checkViewport);
        return () => {
            window.removeEventListener('resize', checkViewport);
        };
    }, []);

    return (
        <div>
            {isVisible && (
                <div className="top-div" id="topDiv">
                    <div className="landscape-warning">
                        Please rotate your screen to <b>Landscape</b> to view the Virtual Tour or go to chatbot
                        <ChatIcon />
                    </div>
                </div>
            )}
        </div>
    );
}

function RoomThumbnail({ thumbnailURL, changePanorama, roomname, divID, amIActive, isSpeaking }) {
    return (
        <>
            <div
                className={amIActive ? "col thumbnail active-thumbnail" : "col thumbnail hoverable"}
                style={{ backgroundImage: `url(${thumbnailURL})` }}
                onClick={changePanorama}
                id={divID}
            >
                <div className="thumbnail-desc">
                    {roomname}
                    {isSpeaking && (
                        <FontAwesomeIcon
                            icon={faVolumeUp}
                            className="speaker-icon ml-2"
                            style={{ marginLeft: '8px' }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}

function RoomGrid() {
    const roomnames = [
        <><strong>Computer Laboratory</strong></>,
        <><strong>CCS Department</strong></>,
        <><strong>MAC Laboratory</strong></>,
        <><strong>Oracle Laboratory</strong></>,
        <><strong>Lecture Room</strong></>
    ];

    const locations = [
        ["A205", "A206", "A207"],
        ["2nd Floor Arlegui Bldg."],
        ["A207"],
        ["A222", "A223"],
        ["A211", "A213", "A215"]
    ];

    const descriptions = [
        <>The computer laboratories used by the <strong>CCS Department</strong> at T.I.P Manila are equipped with <strong>40 Windows PCs</strong> for student use, along with one dedicated PC for the professor. Each workstation has <strong>two power sockets</strong> for added convenience. To ensure a comfortable learning environment, the lab features <strong>two air-conditioning units</strong>, <strong>four wall fans</strong>, and <strong>two ceiling fans</strong>. The room also includes a <strong>glass whiteboard</strong> for collaborative discussions, as well as a <strong>projector</strong> and <strong>projector screen</strong> for multimedia presentations, making it an ideal space for both lectures and hands-on learning.</>,
        <>The <strong>College of Computer Studies (CCS) Department</strong> at T.I.P Manila is located on the <strong>2nd floor of the Arlegui Building</strong>, right across from Room A-211. Here, students can find the Dean's Office, the Secretary, and faculty offices, where dedicated staff and instructors are available to assist. This department houses the Program Chairs for <strong>Computer Science (CS)</strong>, <strong>Information Technology (IT)</strong>, <strong>Information Systems (IS)</strong>, and <strong>Entertainment and Multimedia Computing (EMC)</strong>. The CCS Department is a hub for academic support and guidance, offering students resources and advising in their chosen fields.</>,
        <>The <strong>MAC Laboratory</strong> at <strong>T.I.P Manila</strong> is situated in Room <strong>A-207</strong> and is equipped with <strong>30 MAC PCs</strong> for student use, along with an additional <strong>MAC PC</strong> dedicated to the professor. The lab provides a comfortable learning environment with <strong>two window-type air conditioning units</strong> to ensure a cool atmosphere. It also features a <strong>projector</strong>, allowing instructors to share presentations and demonstrate software in real-time, making it an ideal space for interactive and hands-on learning in multimedia and design applications.</>,
        <>The <strong>Oracle Room</strong> at <strong>T.I.P Manila</strong> is a modern computer lab equipped with <strong>30 Windows PCs</strong> for students and a <strong>central PC</strong> dedicated to the professor for optimal visibility and interaction. The room is designed for a focused learning experience, featuring a <strong>glass whiteboard</strong> for collaborative discussions, a <strong>projector</strong>, and a <strong>projector screen</strong> for multimedia presentations. Depending on the specific Oracle Room, it is cooled by either <strong>one or two split-type air-conditioning units</strong>, ensuring a comfortable environment. Security is enhanced with a <strong>360-degree CCTV camera</strong>, providing comprehensive coverage of the room.</>,
        <>The <strong>Lecture Room</strong> is a <strong>well-equipped educational space</strong> designed for up to <strong>40 students</strong>, with additional <strong>auxiliary seating</strong> for special sessions. Each room includes a <strong>wall-mounted whiteboard</strong> and a <strong>ceiling-mounted projector screen</strong> for versatile instruction. Dual <strong>air-conditioning units</strong> ensure a comfortable environment during standard 2-hour sessions. To block sunlight from outside, windows are fitted with a <strong>tarpaulin cover</strong>. The <strong>organized seating</strong> provides clear sightlines, ideal for both traditional lectures and multimedia presentations.</>
    ];

    const [imageSource, setImageSource] = useState(panorama1);
    const [roomName, setRoomName] = useState(roomnames[0]);
    const [location, setLocation] = useState(locations[0]);
    const [description, setDescription] = useState(descriptions[0]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [audio, setAudio] = useState(null);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [isClosableVisible, setIsClosableVisible] = useState(true); // State for closable div

    useEffect(() => {
        const handleUserInteraction = () => {
            setHasUserInteracted(true);
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        };
    }, []);

    const stopCurrentAudio = () => {
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        setIsSpeaking(false);
    };

    const speakDescription = async (description) => {
        try {
            if (!hasUserInteracted) return;

            // Always stop the current audio first
            stopCurrentAudio();

            const plainText = description.props.children.map(child => {
                if (typeof child === 'string') return child;
                if (child.type === 'strong') return child.props.children;
                return '';
            }).join('');

            const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + GOOGLE_TTS_API_KEY, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: { text: plainText },
                    voice: {
                        languageCode: 'en-US',
                        name: 'en-US-Neural2-D'
                    },
                    audioConfig: {
                        audioEncoding: 'MP3',
                        pitch: 0,
                        speakingRate: 1
                    }
                })
            });

            const data = await response.json();
            const audioContent = data.audioContent;

            const audioBlob = new Blob(
                [Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))],
                { type: 'audio/mp3' }
            );
            const audioUrl = URL.createObjectURL(audioBlob);
            const audioElement = new Audio(audioUrl);

            setAudio(audioElement);

            audioElement.onended = () => {
                setIsSpeaking(false);
                URL.revokeObjectURL(audioUrl);
            };

            audioElement.play().then(() => {
                setIsSpeaking(true);
            }).catch((error) => {
                console.error('Audio playback error:', error);
                setIsSpeaking(false);
            });

        } catch (error) {
            console.error('TTS Error:', error);
            setIsSpeaking(false);
        }
    };

    useEffect(() => {
        return () => {
            stopCurrentAudio();
        };
    }, [audio]);

    const images = [image1, image2, image3, image4, image5];
    const panoramaImages = [panorama1, panorama2, panorama3, panorama4, panorama5];

    const handleRoomChange = async (index) => {
        if (index === activeIndex) {
            // If clicking the same room, toggle audio
            if (isSpeaking) {
                stopCurrentAudio();
            } else {
                await speakDescription(descriptions[index]);
            }
        } else {
            // If clicking a different room, update everything and start new audio
            setActiveIndex(index);
            setImageSource(panoramaImages[index]);
            setRoomName(roomnames[index]);
            setLocation(locations[index]);
            setDescription(descriptions[index]);
            activeThumbnailChange(index);
            await speakDescription(descriptions[index]);
        }
    };

    const closeClosableDiv = () => {
        setIsClosableVisible(false); // Hide the closable div
    };

    return (
        <>
            <div className="subdivider-left">
                <div className="logo-container">
                    <img className="logo" src={logo} alt="logo" />
                </div>
                <div className="row-container">
                    {images.map((thumbnailURL, index) => (
                        <div className="row" key={index}>
                            <RoomThumbnail
                                thumbnailURL={thumbnailURL}
                                changePanorama={() => handleRoomChange(index)}
                                roomname={roomnames[index]}
                                divID={index}
                                amIActive={activeIndex === index}
                                isSpeaking={isSpeaking && activeIndex === index}
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
                            {location.map((loc, index) => (
                                <li className="location-item" key={index}>{loc}</li>
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
                {isClosableVisible && (
                    <div className="closable-bg">
                        <div className="closable-div">
                            <div className="closable-title-div">
                                <span className="closable-text">
                                    <p className="closable-title">
                                        <strong>Welcome to CCSpark!</strong>
                                    </p>
                                </span>
                                <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={closeClosableDiv} />
                            </div>
                            <div className="closable-content-div">
                                <div className="closable-left">
                                    <p className="closable-content"><strong>At this side</strong>, you can pick which room you want to view by clicking the images</p>
                                </div>
                                <div className="closable-center">
                                    <p className="closable-content">This area has a <strong>panoramic image</strong>, you can drag the image to the left and right to view the room.</p>
                                </div>
                                <div className="closable-right">
                                    <p className="closable-content"><strong>At this side</strong>, you can see the descriptions of the room and a button to go to the chatbot if you have any questions.</p>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                )}
                <ChatIcon />
            </div >
        </>
    );
}

function activeThumbnailChange(id) {
    const thumbnail = document.getElementById(id);
    var otherThumbnails;

    for (let i = 0; i < 5; i++) {
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
    );
}

function ViewHandler({ imagesource }) {
    const projection = useMemo(() => new CylindricalProjection({
        src: imagesource,
        partial: true
    }), [imagesource]);

    return (
        <View360 className="is-5by3 fade-in" projection={projection} />
    );
}

function App() {
    return (
        <>
            <FontSizeProvider>
                <TopDiv />
                <div className="container-fluid container-height-adjustment">
                    <RoomGrid />
                </div>
            </FontSizeProvider>
        </>
    );
}

export default App;