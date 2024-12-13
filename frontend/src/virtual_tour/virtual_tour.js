import React, { useMemo, useState, useEffect, useContext, createContext } from "react";
import View360, { CylindricalProjection } from "@egjs/react-view360";
import "@egjs/react-view360/css/view360.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FaMobileAlt, FaArrowRight } from 'react-icons/fa';
import { MdScreenRotation } from 'react-icons/md';
import { API_PANORAMICS } from "../config.js";

import './virtual_tour.css';
import logo from "./assets/CCSpark-logo.png";
import panorama1 from "./assets/cylindricalPhotos/comp_lab_smaller.png";

const GOOGLE_TTS_API_KEY = '';

//  const API_PANORAMICS = "http://ec2-13-238-141-127.ap-southeast-2.compute.amazonaws.com/api/panoramics/";

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
                <div className="fixed inset-0 orientation-modal z-50 flex items-center justify-center">
                    <div className="max-w-md p-8 rounded-xl bg-midnight-blue/30 backdrop-blur-md border border-accent-light/20 text-center space-y-6">
                        <div className="flex justify-center mb-4">
                            <div className="relative">
                                <FaMobileAlt className="text-6xl text-accent-light rotate-0" />
                                <MdScreenRotation className="absolute -right-8 -bottom-4 text-4xl text-accent-light animate-pulse" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-text-color">
                            This is the Virtual Tour Page
                        </h2>
                        <div className="flex items-center justify-center space-x-4 text-text-muted">
                            <div className="transform rotate-0">
                                <FaMobileAlt className="text-3xl" />
                            </div>
                            <FaArrowRight className="text-xl animate-bounce" />
                            <div className="transform rotate-90">
                                <FaMobileAlt className="text-3xl" />
                            </div>
                        </div>

                        <p className="text-lg text-text-color">
                            For the best experience, please switch to <span className="font-bold text-accent-light">landscape mode</span>
                        </p>

                        <div className="pt-4">
                            <p className="text-sm text-text-muted">or</p>
                            <button
                                onClick={() => window.location.href = '/chatbot'}
                                className="mt-4 px-6 py-3 bg-accent-light text-text-color font-medium
                                    rounded-lg shadow-lg hover:shadow-xl
                                    transform hover:-translate-y-0.5 hover:scale-105
                                    transition-all duration-300 ease-out
                                    border border-accent-light/20
                                    active:transform active:translate-y-0.5
                                    cursor-pointer
                                    relative
                                    after:absolute after:inset-0 after:rounded-lg
                                    after:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    Go to Chatbot
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function RoomThumbnail({ thumbnailURL, changePanorama, roomname, divID, amIActive, isSpeaking }) {
    // console.log(`Thumbnail URL for ${roomname}:`, thumbnailURL); // Debug log
    return (

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
    );
}

function RoomGrid() {

    // const [roomName, setRoomName] = useState(roomnames[0]); // Remove this after determining that it works
    const [location, setLocation] = useState([]);
    const [description, setDescription] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [audio, setAudio] = useState(null);
    const [hasUserInteracted, setHasUserInteracted] = useState(false);
    const [isClosableVisible, setIsClosableVisible] = useState(true); // State for closable div
    const [panoramicsDb, setPanoramicsDb] = useState([]);
    const [thumbnailsDb, setThumbnailsDb] = useState([]);
    const [roomNamesDb, setRoomNamesDb] = useState([]);
    const [locationDb, setLocationDb] = useState([]);
    const [descriptionDb, setDescriptionDb] = useState([]);
    const [panoramicImages, setPanoramicImages] = useState([]);
    const [imageSource, setImageSource] = useState(panorama1);


    const fetchPanoramics = async () => {
        try {
            const response = await fetch(API_PANORAMICS);
            const data = await response.json();
            console.log('Fetched data:', data); // Debug log
            setPanoramicsDb(data);

            // Extract room names, thumbnails, descriptions, and locations from the fetched data
            const fetchedRoomNames = [...new Set(data.map(group => group.groupname))];
            const fetchedThumbnails = data.filter(group => group.category === 'thumbnail').map(group => group.s3url);
            console.log('Fetched thumbnails:', fetchedThumbnails); // Debug log
            const fetchedDescriptions = data.filter(group => group.category === 'thumbnail').map(group => group.description);
            console.log('Fetched ddescription:', fetchedDescriptions); // Debug log
            const fetchedLocations = data.filter(group => group.category === 'thumbnail').map(group => group.location);
            const fetchedPanoramicImages = data.filter(group => group.category === 'panoramic').map(group => group.s3url);
            console.log('Fetched panoramic images:', fetchedPanoramicImages); // Debug log

            setRoomNamesDb(fetchedRoomNames);
            setThumbnailsDb(fetchedThumbnails);
            setDescriptionDb(fetchedDescriptions);
            setLocationDb(fetchedLocations);
            setPanoramicImages(fetchedPanoramicImages);

            // Set the initial image source to the first panoramic image
            if (fetchedPanoramicImages.length > 0) {
                setImageSource(fetchedPanoramicImages[0]);
            }
        } catch (error) {
            console.error('Error fetching panoramics:', error);
        }
    };

    useEffect(() => {
        fetchPanoramics();
    }, []);

    // Convert the String description to JSX description
    const convertToJSX = (description) => {
        const parts = description.split(/(<strong>|<\/strong>)/g);
        return (
            <>
                {parts.map((part, index) => {
                    if (part === '<strong>') {
                        return <strong key={index}>{parts[index + 1]}</strong>;
                    } else if (part === '</strong>') {
                        return null;
                    } else if (parts[index - 1] === '<strong>') {
                        return null;
                    } else {
                        return part;
                    }
                })}
            </>
        );
    };

    const jsxDescriptions = descriptionDb.map(convertToJSX);


    // _________________________________________________________________________________________



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

            if (!description || !description.props || !description.props.children) {
                console.error('Invalid description format:', description);
                return;
            }

            const plainText = description.props.children.map(child => {
                if (child === null || child === undefined) return ''; // Add a check for null or undefined
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

    const roomnames = Array.isArray(roomNamesDb) ? roomNamesDb.map(name => <><strong>{name}</strong></>) : [];

    const handleRoomChange = async (index) => {
        console.log('Changing room to index:', index); // Debug log
        if (index === activeIndex) {
            // If clicking the same room, toggle audio
            if (isSpeaking) {
                stopCurrentAudio();
            } else {
                await speakDescription(jsxDescriptions[index]);
            }
        } else {
            // If clicking a different room, update everything and start new audio
            setActiveIndex(index);
            setImageSource(panoramicImages[index]);
            setRoomNamesDb(roomNamesDb); // Ensure this line correctly sets the room name
            setLocationDb(locationDb);
            setDescription(jsxDescriptions[index]);
            activeThumbnailChange(index);
            await speakDescription(jsxDescriptions[index]);
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
                    {thumbnailsDb.map((thumbnailURL, index) => (
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
            </div>
            <div className="subdivider-center">
                <ViewHandler imagesource={imageSource} />
            </div>
            <div className="subdivider-right">
                <div className="py-2">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full px-4 py-2 
            bg-gradient-to-r from-deep-sea to-ocean-blue text-white text-sm font-medium
            rounded-lg shadow-lg transform hover:-translate-y-0.5 hover:shadow-xl
            transition-all duration-300 ease-out border border-accent-light/20
            flex items-center justify-center gap-2"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Go to Overview
                    </button>
                </div>
                <div className="room-title">
                    {roomNamesDb[activeIndex]}
                </div>
                <div className="location-contents">
                    <div className="location-title">
                        Location:
                    </div>
                    <div className="location-list-container">
                        <ul className="location-list">
                            {locationDb[activeIndex] && (
                                <li className="location-item">{locationDb[activeIndex]}</li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="description-container">
                    <div className="description-content">
                        <p className="description">
                            {jsxDescriptions[activeIndex]}
                        </p>
                    </div>
                </div>
                <ChatIcon />
            </div >
        </>
    );
}

function activeThumbnailChange(id) {
    const thumbnail = document.getElementById(id);
    if (!thumbnail) return; // Add a check to ensure the element exists

    for (let i = 0; i < 5; i++) {
        const otherThumbnails = document.getElementById(i);
        if (otherThumbnails) { // Add a check to ensure the element exists
            otherThumbnails.classList.remove("active-thumbnail");
            otherThumbnails.classList.add("hoverable");
        }
    }
    thumbnail.classList.remove("hoverable");
    thumbnail.classList.add("active-thumbnail");
}

function ChatIcon() {
    return (
        <>
            <button
                onClick={() => window.location.href = '/chatbot'}
                className="px-2 py-1 bg-gradient-to-r from-deep-sea to-ocean-blue font-medium
        rounded-lg shadow-lg hover:shadow-xl
        transform hover:-translate-y-0.5 hover:scale-105
        transition-all duration-300 ease-out
        border border-accent-light/20
        group
        backdrop-filter backdrop-blur-sm chatbot-btn-right-sub"
            >
                <span className="flex items-center gap-2">
                    Go To Chatbot
                    <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                </span>
            </button>
        </>
    );
}

function ViewHandler({ imagesource }) {
    const projection = useMemo(() => new CylindricalProjection({
        src: imagesource,
        partial: false
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