import React from 'react';
import './cs_prereq.css';
import { FaArrowLeft } from 'react-icons/fa';

function CSPrereg() {
    const tableHeader = ["Cat.", "No.", "Descriptive Title", "Prerequisite/s", "Lec Hrs/Wk", "Lab Hrs/Wk", "Units"];

    const prereq_headers = [
        "1st Year, First Semester (20 Units)",
        "1st Year, Second Semester (21 Units)",
        "2nd Year, First Semester (24 Units)",
        "2nd Year, Second Semester (24 Units)",
        "3rd Year, First Semester (24 Units)",
        "3rd Year, Second Semester (25 Units)",
        "3rd Year, Summer (9 Units)",
        "4th Year, First Semester (15 Units)",
        "4th Year, Second Semester (6 Units)",
        "Track Elective 1: Intelligent Systems",
        "Track Elective 2: Game Development",
        "Free Elective Courses (3 Units)"
    ];

    const firstyr_firstsem_prerequisites = [
        ["GEC", "004", "Mathematics in the Modern World", "", "3", "0", "3"],
        ["GEC", "001", "Understanding the Self", "", "3", "0", "3"],
        ["MATH", "002A", "Linear Algebra with MATLAB", "", "2", "3", "3"],
        ["CITE", "001", "Introduction to Computing", "", "2", "3", "3"],
        ["CITE", "002", "Computer Programming 1", "", "2", "3", "3"],
        ["PE", "101", "Physical Education 1", "", "2", "0", "2"],
        ["NSTP", "101", "National Service Training Program 1", "", "(3)", "0", "(3)"],
    ];

    const firstyr_secondsem_prerequisites = [
        ["GEC", "005", "Purposive Communication", "", "3", "0", "3"],
        ["GEC", "003", "The Contemporary World", "", "3", "0", "3"],
        ["GEC", "006", "Art Appreciation", "", "3", "0", "3"],
        ["MATH", "031", "Symbolic Logic", "MATH 027", "3", "0", "3"],
        ["MATH", "018", "Calculus 1 (Differential Calculus)", "MATH 002A", "4", "0", "4"],
        ["CITE", "003", "Computer Programming 2", "CITE 002", "2", "3", "3"],
        ["PE", "102", "Physical Education 2", "PE 101", "2", "0", "2"],
        ["NSTP", "102", "National Service Training Program 2", "NSTP 101", "(3)", "0", "(3)"],
    ];

    const secondyr_firstsem_prerequisites = [
        ["GEC", "008", "Ethics", "", "3", "0", "3"],
        ["GEC", "002", "Readings in Philippine History", "", "3", "0", "3"],
        ["MATH", "019", "Calculus 2 (Integral Calculus)", "MATH 018", "4", "0", "4"],
        ["CCS", "201", "Object-Oriented Programming", "CITE 003", "2", "3", "3"],
        ["CIT", "306", "Mobile Computing", "CITE 002", "2", "3", "3"],
        ["CCS", "202", "Principles of Programming Languages", "CITE 001, CITE 002", "3", "0", "3"],
        ["CCS", "203", "Computer Architecture and Organization", "CITE 001", "2", "3", "3"],
        ["PE", "201", "Physical Education 3", "PE 102", "2", "0", "2"]
    ];

    const secondyr_secondsem_prerequisites = [
        ["GEC", "007", "Science, Technology, and Society", "", "3", "0", "3"],
        ["MATH", "029", "Introduction to Numerical Analysis", "MATH 018", "3", "0", "3"],
        ["PHYS", "001S", "Calculus-Based Physics 1", "MATH 019", "3", "3", "4"],
        ["MATH", "025", "Discrete Mathematics", "MATH 031", "3", "0", "3"],

        ["CCS", "204", "Operating Systems", "CCS 203", "3", "0", "3"],
        ["CITE", "004", "Data Structures and Algorithms", "CCS 201", "2", "3", "3"],
        ["CITE", "005", "Information Management", "CITE 003", "2", "3", "3"],
        ["PE", "202", "Physical Education 4", "PE 201", "2", "0", "2"]
    ];

    const thirdyr_firstsem_prerequisites = [
        ["GEE", "001", "GEC Elective 1", "", "3", "0", "3"],
        ["GEM", "007", "Life and Works of Rizal", "", "3", "0", "3"],
        ["MATH", "032", "Probability and Statistics", "MATH 027", "2", "3", "3"],
        ["CCS", "301", "Networks and Communications", "CCS 204", "2", "3", "3"],
        ["CITE", "306", "Application Development and Emerging Technologies", "CIT 306", "2", "3", "3"],
        ["CCS", "303", "Intelligent Agents", "MATH 029", "2", "3", "3"],
        ["CCS", "304", "Automate Theory and Formal Languages", "MATH 025", "3", "0", "3"],
        ["CCS", "305", "Software Engineering 1", "CITE 004", "2", "3", "3"],
    ];

    const thirdyr_secondsem_prerequisites = [
        ["GEE", "002", "GEC Elective 2", "", "3", "0", "3"],
        ["CHM", "001", "Chemistry for Engineers", "", "3", "3", "4"],
        ["CITE", "008", "Social Issues and Professional Practice", "CCS 305", "3", "0", "3"],
        ["CITE", "007", "Information Assurance and Security", "CITE 005, CCS 301", "3", "0", "3"],
        ["CCS", "306", "Modeling and Simulation", "MATH 032, MATH 029", "2", "3", "3"],
        ["CCS", "307", "Algorithm and Complexity", "MATH 029, CCS 304", "3", "0", "3"],
        ["CITE", "012", "Human-Computer Interaction", "CITE 306", "2", "3", "3"],
        ["CCSELEC", "001", "CCS Elective 1", "CITE 306", "2", "3", "3"],
    ];

    const thirdyear_summer_prerequisites = [
        ["CS", "306", "Intelligent Systems", "MATH 012A", "2", "3", "3"],
        ["ITE", "010", "Foundation of Human Computer Interaction", "ITE 004", "2", "3", "3"],
        ["CS", "307", "Thesis 1", "CS 304", "3", "0", "3"]
    ];

    const fourthyear_firstsem_prerequisites = [
        ["GEE", "003", "GEC Elective 3", "", "3", "0", "3"],
        ["CITE", "009", "Technopreneurship", "CITE 008", "3", "0", "3"],
        ["CCS", "401", "Thesis 1", "CCS 308", "3", "0", "3"],
        ["CSFELEC", "001", "Free Elective", "", "0", "0", "3"],
        ["CSELEC", "003", "CCS Elective 3", "CCS ELECT2", "2", "3", "3"]
    ];

    const fourthyear_secondsem_prerequisites = [
        ["CS", "402", "Internship in Computing", "Software Engineering 2", "0", "9", "3"],
        ["CS", "403", "Thesis 2", "Thesis 1", "0", "9", "3"]
    ];

    const track_elective_1_prerequisites = [
        ["CCS", "310", "Expert Systems", "CCS 306", "2", "3", "3"],
        ["CCS", "311", "Natural Language Processing", "CCS 310", "2", "3", "3"],
        ["CCS", "312", "Machine Learning", "CCS 311", "2", "3", "3"],
    ];

    const track_elective_2_prerequisites = [
        ["CCS", "313", "Multimedia Technology", "CITE 306", "2", "3", "3"],
        ["CCS", "314", "Level Design and Scripting", "CCS 313", "2", "3", "3"],
        ["CCS", "312", "Multiplayer and Online Programming", "CCS 314", "2", "3", "3"]
    ];

    const free_elective_prerequisites = [
        ["CIT", "503", "Current Trends and Issues in Computing", "CITE 306", "3", "0", "3"],
        ["CIT", "504", "SAP/SAS", "CITE 005", "2", "3", "3"],
        ["CISELEC", "113", "Development, Maintenance, and Services", "CCS 301", "3", "0", "3"],
        ["CISELEC", "501A", "Big Data Analytics", "CITE 005", "2", "3", "3"],
        ["CISELEC", "201", "Introduction to Project Management", "CCS 308", "3", "0", "3"],
        ["FLE", "313", "Mandarin", "", "2", "3", "3"],
        ["FLE", "213", "Spanish", "", "2", "3", "3"]
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-gray-800 p-4 mb-6">
                <button
                    onClick={() => window.location.href = '/'}
                    className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200"
                >
                    <FaArrowLeft className="w-4 h-4" />
                    <span>Back to Overview</span>
                </button>
            </nav>
            <div className="p-4 overflow-x-auto">
                <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr>
                            {tableHeader.map((header, index) => (
                                <th key={index} className="px-4 py-2 text-left text-sm font-semibold text-gray-600 bg-gray-100">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {/* First Year First Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[0]}
                            </td>
                        </tr>
                        {firstyr_firstsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* First Year Second Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[1]}
                            </td>
                        </tr>
                        {firstyr_secondsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}

                        {/* Second Year First Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[2]}
                            </td>
                        </tr>
                        {secondyr_firstsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[3]}
                            </td>
                        </tr>
                        {secondyr_secondsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[4]}
                            </td>
                        </tr>
                        {thirdyr_firstsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[5]}
                            </td>
                        </tr>
                        {thirdyr_secondsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[6]}
                            </td>
                        </tr>
                        {thirdyear_summer_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[7]}
                            </td>
                        </tr>
                        {fourthyear_firstsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[8]}
                            </td>
                        </tr>
                        {fourthyear_secondsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[8]}
                            </td>
                        </tr>
                        {fourthyear_secondsem_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[9]}
                            </td>
                        </tr>
                        {track_elective_1_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[10]}
                            </td>
                        </tr>
                        {track_elective_2_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-blue-50 font-semibold">
                                {prereq_headers[11]}
                            </td>
                        </tr>
                        {free_elective_prerequisites.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
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


export default CSPrereg;