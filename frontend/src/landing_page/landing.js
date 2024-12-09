// LandingPage.js
import React from 'react';
import './landing.css'; // Ensure you are importing the CSS file
import ITImage from './assets/it_image.jpg';

const LandingPage = () => {
    return (
        <div className="min-h-screen landing-main">
            <header className="header p-4">
                <h1 className="text-3xl font-bold">CCS Department</h1>
            </header>
            <nav className="navbar p-4 sticky top-0">
                <ul className="flex space-x-4 justify-center">
                    <li><a href="#programs" className="hover:underline">Programs Offered</a></li>
                    <li><a href="#faculty" className="hover:underline">Faculty Members</a></li>
                    <li><a href="#other-info" className="hover:underline">Other Information</a></li>
                </ul>
            </nav>
            <main className="p-4">
                <section id="programs" className="mb-8 section">
                    <h2 className="text-2xl font-semibold mb-4">Programs Offered</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white rounded shadow landing-card">
                            <img src={ITImage} alt="Program 1" className="w-full h-48 object-cover rounded" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">Computer Science</h3>
                                <p className="">The Bachelor of Science in Computer Science program prepares students for the digital future through rigorous training in programming, algorithms, artificial intelligence, and software development. Students learn to solve complex problems using computational thinking and cutting-edge technologies.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded shadow landing-card">
                            <img src={ITImage} alt="Program 2" className="w-full h-48 object-cover rounded" />
                            <div className="p-4">
                            <h3 className="text-xl font-semibold">Information Technology</h3>
                            <p className="">The Bachelor of Science in Information Technology program equips students with practical skills in network administration, database management, web development, and IT infrastructure. Students learn to implement, maintain, and secure technology solutions for modern business needs.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded shadow landing-card">
                            <img src={ITImage} alt="Program 3" className="w-full h-48 object-cover rounded" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">Entertainment and Multimedia Computing</h3>
                                <p className="">The Bachelor of Science in Entertainment and Multimedia Computing program focuses on digital content creation, game development, animation, and interactive media. Students develop creative and technical skills in designing engaging digital experiences while learning industry-standard tools and technologies.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded shadow landing-card">
                            <img src={ITImage} alt="Program 4" className="w-full h-48 object-cover rounded" />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">Information Systems</h3>
                                <p className="">The Bachelor of Science in Information Systems program combines business and technology, focusing on how information technology supports organizational strategy and operations. Students learn to analyze business needs, design technology solutions, and manage information systems that drive organizational success.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="faculty" className="mb-8 section">
                    <h2 className="text-2xl font-semibold mb-4">Faculty Members</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="card landing-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Dr. Larry A. Vea</h3>
                            <p className="">Dean, and CCS/DSA Program Chair</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Dr. Alfio Regla</h3>
                            <p className="">IT/EMC Program Chair</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Dr. Melvin Ballera</h3>
                            <p className="">CS Program Chair</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Dr. Jheanel Estrada</h3>
                            <p className="">CS Faculty Member, </p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Dr. Jennalyn Raviz</h3>
                            <p className="">CS Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Mr. John Richard Kho</h3>
                            <p className="">CS Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Ms. Jenelyn M. Aranas</h3>
                            <p className="">IT Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Khaela May T. Lee</h3>
                            <p className="">IT Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Mr. Joselito V. San Juan</h3>
                            <p className="">IT Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Dr. Eduardo S. Rodrigo</h3>
                            <p className="">IT Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Mr. Mar Eli C. Sagsagat</h3>
                            <p className="">IT Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Mr. John Mark Dalisay</h3>
                            <p className="">IT Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Mr. Joseph Domingo</h3>
                            <p className="">IT Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Mr. Jhon Angelo San Andre</h3>
                            <p className="">EMC-GD Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Ms. Jasmin Gas</h3>
                            <p className="">EMC-DAT Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Mr. Elezear Repil</h3>
                            <p className="">IS Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Ms. Hydie Cruz</h3>
                            <p className="">IS Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Mr. Ahdrian Camilo C. Gernalez</h3>
                            <p className="">DSA Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Mr. Francis Carabuena</h3>
                            <p className="">DSA Faculty Member</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Ms. Jennielyn Dela Cruz</h3>
                            <p className="">CCS Staff</p>
                        </div>
                        <div className="card landing-card faculty-members-card p-4 rounded shadow">
                            <h3 className="text-xl font-semibold">Ms. Angeline Nequia</h3>
                            <p className="">CCS Staff</p>
                        </div>
                    </div>
                </section>
                <section id="other-info" className="mb-8 section">
                    <h2 className="text-2xl font-semibold mb-4">Other Information</h2>
                    <p className="text-gray-600">Additional information about the CCS Department...</p>
                </section>
                <div className="text-center my-8">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => window.location.href = '/virtual-tour'}
                    >
                        Visit Virtual Tour
                    </button>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;