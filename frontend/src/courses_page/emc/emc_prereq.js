import React from 'react';
import './emc_prereq.css';
import { FaArrowLeft } from 'react-icons/fa';

function EMCPrereg() {
    const tableHeader = ["Cat.", "No.", "Descriptive Title", "Prerequisite/s", "Lec Hrs/Wk", "Lab Hrs/Wk", "Units"];

    const prereq_headers = [
        "1st Year, First Semester (17 Units)",
        "1st Year, Second Semester (18 Units)",
        "1st Year, Summer (6 Units)",
        "2nd Year, First Semester (24 Units)",
        "2nd Year, Second Semester (23 Units)",
        "2nd Year, Summer (6 Units)",
        "3rd Year, First Semester (21 Units)",
        "3rd Year, Second Semester (21 Units)",
        "3rd Year, Summer (6 Units)",
        "4th Year, First Semester (21 Units)",
        "4th Year, Second Semester (9 Units)",
        "Free Elective Courses (3 Units)"
    ];

    const firstyr_firstsem_prerequisites = [
        ["GEC", "001", "Understanding the Self", "", "3", "0", "3"],
        ["GEC", "002", "Readings in Philippine History", "", "3", "0", "3"],
        ["MATH", "017", "Analytic Geometry", "", "3", "0", "3"],
        ["CITE", "001A", "Introduction to ICT", "", "2", "3", "3"],
        ["CITE", "002", "Computer Programming 1", "", "2", "3", "3"],
        ["PE", "101", "Physical Education 1", "", "2", "0", "2"],
        ["NSTP", "001", "National Service Training Program 1", "", "(3)", "0", "(3)"]
    ];

    const firstyr_secondsem_prerequisites = [
        ["GEC", "005", "Purposive Communication", "", "3", "0", "3"],
        ["CITE", "001B", "Introduction to Computing", "CITE 001A", "2", "3", "3"],
        ["PHYS", "001", "Calculus-Based Physics 1", "MATH 017", "3", "3", "4"],
        ["CITE", "003", "Computer Programming 2", "CITE 002", "2", "3", "3"],
        ["CEMC", "001", "Freehand and Digital Writing", "CITE 002", "2", "3", "3"],
        ["PE", "102", "Physical Education 2", "PE 101", "2", "0", "2"],
        ["NSTP", "002", "National Service Training Program 2", "NSTP 001", "(3)", "0", "(3)"]
    ];

    const firstyr_summer_prerequisites = [
        ["GEC", "008", "Ethics", "", "3", "0", "3"],
        ["GEC", "007", "Science, Technology, and Society", "", "3", "0", "3"]
    ];

    const secondyr_firstsem_prerequisites = [
        ["MATH", "025", "Discrete Mathematics", "", "3", "0", "3"],
        ["PHYS", "002", "Calculus-Based Physics 2", "PHYS 001", "3", "3", "4"],
        ["CITE", "004", "Data Structures and Algorithms", "CITE 003", "2", "3", "3"],
        ["CIT", "506", "Introduction to Game Design and Development", "CEMC 001", "2", "3", "3"],
        ["CITE", "006A", "Application Development and Emerging Technologies", "CITE 004 (C)", "2", "3", "3"],
        ["CEMCPG", "001", "EMC Professional Course 1 (Game Programming 1)", "CIT 506 (C)", "2", "3", "3"],
        ["CEMCPG", "002", "EMC Professional Course 2 (Applied Mathematics for Games)", "CEMCPG 001 (C)", "2", "3", "3"],
        ["PE", "201", "Physical Education 3", "PE 102", "2", "0", "2"]
    ];

    const secondyr_secondsem_prerequisites = [
        ["GEA", "002", "Environmental Science", "", "3", "0", "3"],
        ["CEMC", "201", "Principles of 2D Animation", "CIT 506", "2", "3", "3"],
        ["CEMC", "202", "Introduction to Usability, HCI, UI Design", "CIT 506", "3", "0", "3"],
        ["CEMC", "203", "Computer Graphics Programming", "CITE 006A", "2", "3", "3"],
        ["CITE", "005", "Information Management", "CITE 004", "2", "3", "3"],
        ["CEMCPG", "003", "EMC Professional Course 3 (Game Programming 2)", "CEMCPG 002", "2", "3", "3"],
        ["CEMCPG", "004", "EMC Professional Course 4 (Applied Game Physics)", "CEMCPG 003 (C)", "2", "3", "3"],
        ["PE", "202", "Physical Education 4", "PE 201", "2", "0", "2"]
    ];

    const secondyr_summer_prerequisites = [
        ["GEC", "006", "Art Appreciation", "", "3", "0", "3"],
        ["GEC", "004", "Mathematics in the Modern World", "", "3", "0", "3"]
    ];

    const thirdyr_firstsem_prerequisites = [
        ["GEE", "001B", "GE Elective 1 - Gender and Society", "", "3", "0", "3"],
        ["CEMC", "302", "Audio Design & Sound Engineering", "CEMC 203", "2", "3", "3"],
        ["CEMC", "303", "Script Writing & Story Board Design", "CEMC 001", "3", "0", "3"],
        ["CEMC", "304", "Principles of 3D Animation", "CEMC 201", "2", "3", "3"],
        ["CEMC", "305", "Design and Production Process", "CIT 506", "3", "0", "3"],
        ["CEMCPG", "005", "EMC Professional Course 5 (Game Programming 3)", "CEMCPG 003", "2", "3", "3"],
        ["EMCELEC", "001", "EMC Professional Elective 1 (Oracle 2)", "", "2", "3", "3"]
    ];

    const thirdyr_secondsem_prerequisites = [
        ["GEE", "002B", "GE Elective 2 - Living in the IT Era", "GEE 001B", "3", "0", "3"],
        ["CEMC", "301", "English - Creative Wrinting", "", "3", "0", "3"],
        ["GEC", "003", "Contemporary World", "", "3", "0", "3"],
        ["CEMCPG", "006", "EMC Professional Course 6 (Artificial Intelligence in Games)", "CEMCPG 005", "2", "3", "3"],
        ["CEMCPG", "007", "EMC Professional Course 7 (Advance Game Design)", "CEMCPG 006", "2", "3", "3"],
        ["CEMCPG", "008", "EMC Professional Course 8 (Game Networking)", "CEMCPG 007", "2", "3", "3"],
        ["CEMCPG", "009", "EMC Professional Course 9 (Game Production)", "CEMC 305", "2", "3", "3"]
    ];

    const thirdyear_summer_prerequisites = [
        ["GEM", "001", "Life and Works of Rizal", "", "3", "0", "3"],
        ["CEMC", "306", "Capstone Project 1", "CEMCPG 009", "3", "0", "3"]
    ];

    const fourthyear_firstsem_prerequisites = [
        ["GEE", "004", "GE Elective 3 - Great Books", "GEE 002B", "3", "0", "3"],
        ["EMCELEC", "002", "EMC Professional Elective 2 (Computer Security)", "", "3", "0", "3"],
        ["EMCELEC", "003", "EMC Professional Elective 3 (Business Analytics using SAP)", "", "2", "3", "3"],
        ["CEMC", "401", "Capstone Project 2", "CEMC 306", "0", "9", "3"]
    ];

    const fourthyear_secondsem_prerequisites = [
        ["CEMC", "402", "Internship", "4th Year Standing", "0", "9", "9"]
    ];

    const free_elective_prerequisites = [
        ["SAP", "501", "Business Analytic using SAP BW", "", "2", "3", "3"],
        ["CISELEC", "501A", "Big Data Analytics", "", "2", "3", "3"],
        ["CISELEC", "201", "Introduction to Project Management", "3", "0", "3"],
        ["FLE", "313", "Mandarin", "", "2", "3", "3"],
        ["FLE", "213", "Spanish", "", "2", "3", "3"]
    ];

    return (
        <div className="min-h-screen bg-[#0f172a]">
            <nav className="bg-[#1e293b] p-4 mb-6 shadow-lg">
                <button
                    onClick={() => window.location.href = '/'}
                    className="flex items-center gap-2 text-gray-200 hover:text-blue-400 transition-colors duration-200"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    <span>Back to Overview</span>
                </button>
            </nav>
            <div className="p-4 overflow-x-auto">
                <table className="min-w-full bg-[#1e293b] shadow-xl rounded-lg overflow-hidden">
                    <thead className="bg-[#2d3a52] sticky top-0 z-10">
                        <tr>
                            {tableHeader.map((header, index) => (
                                <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-gray-200 bg-[#2d3a52]">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {/* First Year First Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[0]}
                            </td>
                        </tr>
                        {firstyr_firstsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* First Year Second Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[1]}
                            </td>
                        </tr>
                        {firstyr_secondsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* First Year Summer */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[2]}
                            </td>
                        </tr>
                        {firstyr_summer_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Second Year First Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[3]}
                            </td>
                        </tr>
                        {secondyr_firstsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Second Year Second Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[4]}
                            </td>
                        </tr>
                        {secondyr_secondsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Second Year Summer */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[5]}
                            </td>
                        </tr>
                        {secondyr_summer_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Third Year First Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[6]}
                            </td>
                        </tr>
                        {thirdyr_firstsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Third Year Second Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[7]}
                            </td>
                        </tr>
                        {thirdyr_secondsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Third Year Summer */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[8]}
                            </td>
                        </tr>
                        {thirdyear_summer_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Fourth Year First Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[8]}
                            </td>
                        </tr>
                        {fourthyear_secondsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Fourth Year Second Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[9]}
                            </td>
                        </tr>
                        {fourthyear_secondsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Free Electives */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[10]}
                            </td>
                        </tr>
                        {free_elective_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default EMCPrereg;