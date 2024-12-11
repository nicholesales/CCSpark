// LandingPage.js
import React, { useState, useEffect } from 'react';
import './landing.css';
import ITImage from './assets/it_image.jpg';
import CSImage from './assets/cs_image.jpg';
import EMCImage from './assets/emc_image.jpeg';
import ISImage from './assets/is_image.jpg';
import DSAImage from './assets/dsa_image.jpg';
import { FaAward, FaCertificate, FaGlobe, FaUniversity, FaMedal, FaUserTie, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';

const AccreditationSection = () => {
    const accreditations = [
        {
            title: "ABET Accreditation",
            subtitle: "(www.abet.org)",
            content: ["Computer Science", "Information Systems", "Information Technology"],
            icon: <FaAward className="w-12 h-12 mb-4 text-accent-light" />
        },
        {
            title: "PICAB Accreditation",
            content: ["Computer Science", "Information Systems", "Information Technology"],
            icon: <FaCertificate className="w-12 h-12 mb-4 text-accent-light" />
        },
        {
            title: "Seoul Accord",
            content: ["Computer Science", "Information Systems", "Information Technology"],
            icon: <FaGlobe className="w-12 h-12 mb-4 text-accent-light" />
        },
        {
            title: "CHED Recognitions",
            subtitle: "Center of Excellence (COE) in Information Technology Education (ITE)",
            content: ["Computer Science", "Information Systems", "Information Technology"],
            icon: <FaUniversity className="w-12 h-12 mb-4 text-accent-light" />
        },
        {
            title: "PACUCOA Accreditation Levels",
            content: [
                "Level IV First Reaccredited in Information Technology",
                "Level III First Reaccredited Status in Computer Science"
            ],
            icon: <FaMedal className="w-12 h-12 mb-4 text-accent-light" />
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accreditations.map((accreditation, index) => (
                <div
                    key={index}
                    className="relative bg-gradient-to-br from-faculty-card to-deep-sea p-6 rounded-xl shadow-xl 
                            hover:shadow-2xl hover:-translate-y-1 transition-all duration-300
                            border border-accent-light/20"
                >
                    <div className="flex flex-col items-center text-center mb-4">
                        {accreditation.icon}
                        <h3 className="text-2xl font-bold text-text-color mb-2 tracking-wide">
                            {accreditation.title}
                        </h3>
                        {accreditation.subtitle && (
                            <p className="text-accent-light mb-4 text-sm italic">
                                {accreditation.subtitle}
                            </p>
                        )}
                    </div>
                    <ul className="list-none space-y-2 text-sm">
                        {accreditation.content.map((item, i) => (
                            <li
                                key={i}
                                className="text-text-color flex items-center before:content-['•'] before:mr-2 before:text-accent-light"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-accent-light/5 rounded-bl-full -z-1"></div>
                </div>
            ))}
        </div>
    );
};

const LandingPage = () => {
    return (
        <div className="min-h-screen landing-main">
            <header className="header p-4">
                <h1 className="text-3xl font-bold text-center">CCS Department</h1>
            </header>
            <nav className="navbar p-4 sticky top-0">
                <ul className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                        <li><a href="#programs" className="hover:underline">Programs Offered</a></li>
                        <li className="mx-4 text-accent-light">|</li>
                        <li><a href="#faculty" className="hover:underline">Faculty Members</a></li>
                        <li className="mx-4 text-accent-light">|</li>
                        <li><a href="#accreditations" className="hover:underline">Accreditations</a></li>
                    </div>
                    <li className="ml-auto">
                        <div className="flex space-x-4">
                            <button
                                className="chatbot-btn px-4 py-2 rounded"
                                onClick={() => window.location.href = '/chatbot'}
                            >
                                Go To Chatbot
                            </button>
                            <button
                                className="virtual-tour-btn px-4 py-2 rounded"
                                onClick={() => window.location.href = '/virtual-tour'}
                            >
                                Visit Virtual Tour
                            </button>
                        </div>
                    </li>
                </ul>
            </nav>
            <main className="p-4">
                <section id="programs" className="mb-8 section">
                    <h2 className="text-4xl font-bold mb-8 text-text-color border-b-4 border-ocean-blue pb-4 text-center tracking-wide uppercase">
                        Programs Offered
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-faculty-card to-deep-sea rounded-xl shadow-xl overflow-hidden flex flex-col">
                            <img src={CSImage} alt="Computer Science" className="w-full h-48 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-text-color mb-3">Computer Science</h3>
                                <p className="text-text-muted mb-4 flex-grow">
                                    The Bachelor of Science in Computer Science program prepares students for the digital future through rigorous training in programming, algorithms, artificial intelligence, and software development. Students learn to solve complex problems using computational thinking and cutting-edge technologies.
                                </p>
                                <a
                                    href="/cs-courses"
                                    className="inline-block w-full text-center px-4 py-2 bg-accent-light/20 rounded-lg 
                        hover:bg-accent-light/30 transition-all duration-300 text-text-color 
                        border border-accent-light/30 mt-auto"
                                >
                                    View Courses and Prerequisites
                                </a>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-faculty-card to-deep-sea rounded-xl shadow-xl overflow-hidden flex flex-col">
                            <img src={ITImage} alt="Information Technology" className="w-full h-48 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-text-color mb-3">Information Technology</h3>
                                <p className="text-text-muted mb-4 flex-grow">
                                    The Bachelor of Science in Information Technology program equips students with practical skills in network administration, database management, web development, and IT infrastructure. Students learn to implement, maintain, and secure technology solutions for modern business needs.
                                </p>
                                <a
                                    href="/it-courses"
                                    className="inline-block w-full text-center px-4 py-2 bg-accent-light/20 rounded-lg 
                        hover:bg-accent-light/30 transition-all duration-300 text-text-color 
                        border border-accent-light/30 mt-auto"
                                >
                                    View Courses and Prerequisites
                                </a>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-faculty-card to-deep-sea rounded-xl shadow-xl overflow-hidden flex flex-col">
                            <img src={EMCImage} alt="Entertainment and Multimedia Computing" className="w-full h-48 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-text-color mb-3">Entertainment and Multimedia Computing</h3>
                                <p className="text-text-muted mb-4 flex-grow">
                                    The Bachelor of Science in Entertainment and Multimedia Computing program focuses on digital content creation, game development, animation, and interactive media. Students develop creative and technical skills in designing engaging digital experiences while learning industry-standard tools and technologies.
                                </p>
                                <a
                                    href="/emc-courses"
                                    className="inline-block w-full text-center px-4 py-2 bg-accent-light/20 rounded-lg 
                        hover:bg-accent-light/30 transition-all duration-300 text-text-color 
                        border border-accent-light/30 mt-auto"
                                >
                                    View Courses and Prerequisites
                                </a>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-faculty-card to-deep-sea rounded-xl shadow-xl overflow-hidden flex flex-col">
                            <img src={ISImage} alt="Information Systems" className="w-full h-48 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-text-color mb-3">Information Systems</h3>
                                <p className="text-text-muted mb-4 flex-grow">
                                    The Bachelor of Science in Information Systems program combines business and technology, focusing on how information technology supports organizational strategy and operations. Students learn to analyze business needs, design technology solutions, and manage information systems that drive organizational success.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-faculty-card to-deep-sea rounded-xl shadow-xl overflow-hidden flex flex-col">
                            <img src={DSAImage} alt="Data Science and Analytics" className="w-full h-48 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-text-color mb-3">Data Science and Analytics</h3>
                                <p className="text-text-muted mb-4 flex-grow">
                                    The Bachelor of Science in Data Science and Analytics program prepares students to extract insights from complex data sets using statistical analysis, machine learning, and visualization techniques. Students develop expertise in data mining, predictive modeling, and business intelligence to drive data-informed decision making.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="faculty" className="mb-8 section">
                    <h2 className="text-4xl font-bold mb-8 text-text-color border-b-4 border-ocean-blue pb-4 text-center tracking-wide uppercase">Faculty Members</h2>

                    {/* Program Chairs */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold mb-6 text-accent-light flex items-center">
                            <FaUserTie className="mr-3" />
                            Program Chairs
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="card landing-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-accent-light">
                                <h3 className="text-xl font-semibold">Dr. Larry A. Vea</h3>
                                <p className="text-text-muted">Dean, and CCS/DSA Program Chair</p>
                            </div>
                            <div className="card landing-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-ocean-blue">
                                <h3 className="text-xl font-semibold">Dr. Alfio Regla</h3>
                                <p className="text-text-muted">IT/EMC Program Chair</p>
                            </div>
                            <div className="card landing-card p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-azure">
                                <h3 className="text-xl font-semibold">Dr. Melvin Ballera</h3>
                                <p className="text-text-muted">CS Program Chair</p>
                            </div>
                        </div>
                    </div>

                    {/* CS Faculty */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold mb-6 text-accent-light flex items-center">
                            <FaChalkboardTeacher className="mr-3" />
                            Computer Science Faculty
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Dr. Jheanel Estrada</h3>
                                <p className="text-sm text-text-muted">CS Faculty Member</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Dr. Jennalyn Raviz</h3>
                                <p className="text-sm text-text-muted">CS Faculty Member</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Mr. John Richard Kho</h3>
                                <p className="text-sm text-text-muted">CS Faculty Member</p>
                            </div>
                        </div>
                    </div>

                    {/* IT Faculty */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold mb-6 text-accent-light flex items-center">
                            <FaChalkboardTeacher className="mr-3" />
                            Information Technology Faculty
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Dr. Eduardo S. Rodrigo</h3>
                                <p className="text-sm text-text-muted">IT Faculty Member</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Ms. Khaela May T. Lee</h3>
                                <p className="text-sm text-text-muted">IT Faculty Member</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Mr. Joselito V. San Juan</h3>
                                <p className="text-sm text-text-muted">IT Faculty Member</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Ms. Jenelyn M. Aranas</h3>
                                <p className="text-sm text-text-muted">IT Faculty Member</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Mr Mar Eli C. Sagsagat</h3>
                                <p className="text-sm text-text-muted">IT Faculty Member</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Mr. John Mark Dalisay</h3>
                                <p className="text-sm text-text-muted">IT Faculty Member</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Mr. Joseph Domingo</h3>
                                <p className="text-sm text-text-muted">IT Faculty Member</p>
                            </div>
                        </div>
                    </div>

                    {/* EMC Faculty */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold mb-6 text-accent-light flex items-center">
                            <FaChalkboardTeacher className="mr-3" />
                            EMC Faculty
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Mr. Jhon Angelo San Andre</h3>
                                <p className="text-sm text-text-muted">EMC-GD Faculty Member</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Ms. Jasmin Gas</h3>
                                <p className="text-sm text-text-muted">EMC-DAT Faculty Member</p>
                            </div>
                        </div>
                    </div>

                    {/* IS Faculty */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold mb-6 text-accent-light flex items-center">
                            <FaChalkboardTeacher className="mr-3" />
                            Information Systems Faculty
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Mr. Elezear Repil</h3>
                                <p className="text-sm text-text-muted">IS Faculty Member</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Ms. Hydie Cruz</h3>
                                <p className="text-sm text-text-muted">IS Faculty Member</p>
                            </div>
                        </div>
                    </div>

                    {/* DSA Faculty */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-semibold mb-6 text-accent-light flex items-center">
                            <FaChalkboardTeacher className="mr-3" />
                            Data Science and Analytics Faculty
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Mr. Ahdrian Camilo C. Gernalez</h3>
                                <p className="text-sm text-text-muted">DSA Faculty Member</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Mr. Francis Carabuena</h3>
                                <p className="text-sm text-text-muted">DSA Faculty Member</p>
                            </div>
                        </div>
                    </div>

                    {/* Staff */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-6 text-accent-light flex items-center">
                            <FaUsers className="mr-3" />
                            Supporting Staff
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Ms. Jennielyn Dela Cruz</h3>
                                <p className="text-sm text-text-muted">CCS Staff</p>
                            </div>
                            <div className="card landing-card p-5 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <h3 className="text-lg font-semibold">Ms. Angeline Nequia</h3>
                                <p className="text-sm text-text-muted">CCS Staff</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="accreditations" className="mb-8 section">
                    <h2 className="text-4xl font-bold mb-8 text-text-color border-b-4 border-ocean-blue pb-4 text-center tracking-wide uppercase">Accreditations</h2>
                    <AccreditationSection />
                </section>
            </main>
        </div>
    );
};

export default LandingPage;