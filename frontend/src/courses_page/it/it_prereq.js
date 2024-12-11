import React from 'react';
import './it_prereq.css';
import { FaArrowLeft } from 'react-icons/fa';

function ITPrereg() {
    const tableHeader = ["Cat.", "No.", "Descriptive Title", "Prerequisite/s", "Lec Hrs/Wk", "Lab Hrs/Wk", "Units"];

    const prereq_headers = [
        "1st Year, First Semester (17 Units)",
        "1st Year, Second Semester (20 Units)",
        "2nd Year, First Semester (23 Units)",
        "2nd Year, Second Semester (23 Units)",
        "3rd Year, First Semester (24 Units)",
        "3rd Year, Second Semester (24 Units)",
        "3rd Year, Summer (9 Units)",
        "4th Year, First Semester (18 Units)",
        "4th Year, Second Semester (12 Units)",
        "Track Elective 1: Animation and Mobile Application Development",
        "Track Elective 2: Cyber Security",
        "Track Elective 3: Analytics",
        "Prof. Elective Courses (12 Units)"
    ];

    const firstyr_firstsem_prerequisites = [
        ["GEC", "002", "Reading in Philippine History", "", "3", "0", "3"],
        ["GEC", "004", "Mathematics in the Modern World", "", "3", "0", "3"],
        ["CITE", "001", "Introduction to Computing", "", "2", "3", "3"],
        ["CITE", "002", "Computer Programming 1", "", "2", "3", "3"],
        ["MATH", "022", "Linear Algebra", "", "3", "0", "3"],
        ["PE", "101", "Physical Education 1", "", "2", "0", "2"],
        ["NSTP", "101", "National Service Training Program 1", "", "(3)", "0", "(3)"]
    ];

    const firstyr_secondsem_prerequisites = [
        ["GEC", "001", "Understanding the Self", "", "3", "0", "3"],
        ["GEC", "005", "Purposive Communication", "", "3", "0", "3"],
        ["GEC", "006", "Art Appreciation", "", "3", "0", "3"],
        ["MATH", "025", "Discrete Mathematics", "MATH 031", "3", "0", "3"],
        ["CITE", "003", "Computer Programming 2", "CITE 002", "2", "3", "3"],
        ["CITE", "012", "Introduction to Human Computer Interaction", "CITE 002", "2", "3", "3"],
        ["PE", "102", "Physical Education 2", "PE 101", "2", "0", "2"],
        ["NSTP", "002", "National Service Training Program 2", "NSTP 001", "(3)", "0", "(3)"]
    ];

    const secondyr_firstsem_prerequisites = [
        ["CITE", "004", "Data Structures and Algorithms", "CITE 003", "2", "3", "3"],
        ["PELEC", "001", "Pref. Elective 1", "", "2", "3", "3"],
        ["CIT", "202", "Web Systems and Technologies", "CITE 003, CITE 012", "2", "3", "3"],
        ["CIT", "201", "System Analysis and Design", "CITE 003, CITE 012", "2", "3", "3"],
        ["BIO", "001A", "Modern Biology", "", "2", "3", "3"],
        ["GEC", "008", "Ethics", "", "3", "0", "3"],
        ["GEC", "007", "Science, Technology, and Society", "", "3", "0", "3"],
        ["PE", "201", "Physical Education 3", "PE 102", "2", "0", "2"]
    ];

    const secondyr_secondsem_prerequisites = [
        ["GEM", "001", "Life and Works of Rizal", "", "3", "0", "3"],
        ["GEC", "003", "The Contemporary World", "", "3", "0", "3"],
        ["MATH", "028", "Applied Statistics", "MATH 022", "2", "3", "3"],
        ["CITE", "005A", "Information Management", "CITE 003, CITE 004", "2", "3", "3"],
        ["PELEC", "002", "Prof. Elective 2", "", "2", "3", "3"],
        ["CIT", "203", "Platform Technologies", "CITE 004", "2", "3", "3"],
        ["CHM", "001A", "General Chemistry", "", "2", "3", "3"],
        ["PE", "202", "Physical Education 4", "PE 201", "2", "0", "2"]
    ];

    const thirdyr_firstsem_prerequisites = [
        ["GEE", "001B", "GE Elective 1 - Gender and Society", "", "3", "0", "3"],
        ["ITELEC", "001", "IT Elective 1", "", "2", "3", "3"],
        ["CIT", "301", "Integrative Programming and Technologies", "CIT 202, CITE 005A", "2", "3", "3"],
        ["CIT", "302", "Quantitative Methods (incl Modeling and Simulation)", "MATH 025, MATH 028", "2", "3", "3"],
        ["CIT", "303", "Networking 1", "CIT 202, CIT 203", "2", "3", "3"],
        ["CIT", "304", "Advanced Database Systems", "CITE 005A", "2", "3", "3"],
        ["CITE", "009", "Technopreneurship", "3rd Year Standing", "3", "0", "3"],
        ["CIT", "305", "Systems Integration and Architecture", "CIT 202, CIT 303(C)", "2", "3", "3"]
    ];

    const thirdyr_secondsem_prerequisites = [
        ["GEE", "002B", "GE Elective 2 - Living in the IT Era", "GEE 001B", "3", "0", "3"],
        ["CIS", "202", "Data Mining and Warehousing", "MATH 028, CIT 304", "2", "3", "3"],
        ["CIT", "306", "Mobile Computing", "CITE 003, CIT 304", "2", "3", "3"],
        ["PELEC", "003", "Prof. Elective 3", "", "2", "3", "3"],
        ["ITELEC", "002", "IT Elective 2", "ITELEC 001", "2", "3", "3"],
        ["CITE", "007A", "Information Assurance and Security", "CIT 304", "2", "3", "3"],
        ["CITE", "006", "Application Development and Emerging Technologies", "CITE 005A", "2", "3", "3"],
        ["CIT", "307", "Networking 2", "CIT 303", "2", "3", "3"]
    ];

    const thirdyear_summer_prerequisites = [
        ["CIT", "308", "Capstone 1", "CITE 006, CITE 007A", "2", "3", "3"],
        ["CIT", "309", "IT Project Management", "CITE 006", "2", "3", "3"],
        ["CIT", "310", "Information Assurance and Security 2", "CITE 007A", "2", "3", "3"]
    ];

    const fourthyear_firstsem_prerequisites = [
        ["GEE", "004", "GE Elective 3 - Great Books", "GEE 002B", "3", "0", "3"],
        ["PELEC", "004", "Prof. Elective 4", "", "2", "3", "3"],
        ["ITELEC", "003", "IT Elective 3", "ITELEC 002", "2", "3", "3"],
        ["CIT", "400", "Capstone 2", "CIT 308", "0", "9", "3"],
        ["CITE", "008", "Social Issues and Professional Practice", "3rd Year Standing", "3", "0", "3"],
        ["CIT", "401", "Systems Administration and Maintenance", "CIT 310", "2", "3", "3"]
    ];

    const fourthyear_secondsem_prerequisites = [
        ["CIT", "402", "Internship In Computing", "Graduating", "0", "18", "6"],
        ["ITELEC", "004", "IT Elective 4", "ITELEC 003", "2", "3", "3"],
        ["CIT", "403", "Systems Integration and Architecture 2", "CIT 307, CIT 305, CIT 401", "2", "3", "3"],
    ];

    const track_elective_1_prerequisites = [
        ["CAM", "401", "3D Modeling, Texturing, Rendering and Lighting", "3rd Year Standing", "2", "3", "3"],
        ["CAM", "402", "3D Animation and Special Effects", "CAM 401", "2", "3", "3"],
        ["CAM", "403", "3D Post Production and Composting", "CAM 402", "2", "3", "3"],
        ["CAM", "404", "Mobile Development Integration", "CAM 403", "2", "3", "3"]
    ];

    const track_elective_2_prerequisites = [
        ["CBS", "401A", "Network Security", "3rd Year Standing", "2", "3", "3"],
        ["CBS", "402A", "Data and Application Security", "CBS 401A", "2", "3", "3"],
        ["CBS", "403A", "Ethical Hacking and Penetration Testing", "CBS 402A", "2", "3", "3"],
        ["CBS", "404A", "Cyber Threat Analysis and Modelling", "CBS 403A", "2", "3", "3"]
    ];

    const track_elective_3_prerequisites = [
        ["CIT", "401A", "Fundamentals of Bus Analytics", "3rd Year Standing", "2", "3", "3"],
        ["CIT", "402A", "Analytics, Techniques and Tools", "CIT 401A", "2", "3", "3"],
        ["CIT", "403A", "Fundamentals of Predictive Analytics", "CIT 402A", "2", "3", "3"],
        ["CIT", "404A", "Fundamentals of Prescriptive Analytics", "CIT 403A", "2", "3", "3"]
    ];

    const prof_elective_prerequisites = [
        ["CIT", "503", "Current Trends and Issues in Computing", "", "3", "0", "3"],
        ["CIT", "504", "SAP / SAS", "CIT 309", "2", "3", "3"],
        ["CIT", "505", "Event Driven Programming", "CITE 004", "2", "3", "3"],
        ["FLE", "213", "Spanish", "", "2", "3", "3"],
        ["FLE", "313", "Mandarin", "", "2", "3", "3"],
        ["CIT", "506", "Introduction to Game Development", "CITE 012", "2", "3", "3"],
        ["CIT", "508", "Object-Oriented Programming", "CITE 003", "2", "3", "3"],
        ["CIT", "509", "Human Computer Interaction 2", "CITE 012", "2", "3", "3"],
        ["CIT", "510", "Integrative Programming and Technologies 2", "CIT 301", "2", "3", "3"],
        ["CIT", "511", "Web Systems and Technologies 2", "CIT 202", "2", "3", "3"],
    ];

    return (
        <div className="min-h-screen bg-[#0f172a]">
            <nav className="bg-gray-800 p-4 mb-6">
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

                        {/* Second Year First Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[2]}
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
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[3]}
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
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[4]}
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
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[5]}
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
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[6]}
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
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[7]}
                            </td>
                        </tr>
                        {fourthyear_firstsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
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
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[9]}
                            </td>
                        </tr>
                        {track_elective_1_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[10]}
                            </td>
                        </tr>
                        {track_elective_2_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-[#2d3a52] transition-colors duration-150">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-300">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[11]}
                            </td>
                        </tr>
                        {prof_elective_prerequisites.map((row, index) => (
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


export default ITPrereg;