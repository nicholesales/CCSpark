import React, { useState, useEffect } from 'react';
import './it_prereq.css';
import { FaArrowLeft } from 'react-icons/fa';
import { API_COURSES } from '../../config';


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

    const [courses, setCourses] = useState([]);
    const [firstyr_firstsem_prerequisites, setFirstYrFirstSemPrerequisites] = useState([]);
    const [firstyr_secondsem_prerequisites, setFirstYrSecondSemPrerequisites] = useState([]);
    const [secondyr_firstsem_prerequisites, setSecondYrFirstSemPrerequisites] = useState([]);
    const [secondyr_secondsem_prerequisites, setSecondYrSecondSemPrerequisites] = useState([]);
    const [thirdyr_firstsem_prerequisites, setThirdYrFirstSemPrerequisites] = useState([]);
    const [thirdyr_secondsem_prerequisites, setThirdYrSecondSemPrerequisites] = useState([]);
    const [thirdyear_summer_prerequisites, setThirdYearSummerPrerequisites] = useState([]);
    const [fourthyear_firstsem_prerequisites, setFourthYrFirstSemPrerequisites] = useState([]);
    const [fourthyear_secondsem_prerequisites, setFourthYrSecondSemPrerequisites] = useState([]);
    const [track_elective_1_prerequisites, setTrackElective1Prerequisites] = useState([]);
    const [track_elective_2_prerequisites, setTrackElective2Prerequisites] = useState([]);
    const [track_elective_3_prerequisites, setTrackElective3Prerequisites] = useState([]);
    const [prof_elective_prerequisites, setProfElectivePrerequisites] = useState([]);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Make API call with query params
                const response = await fetch(`${API_COURSES}?program=IT`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('API Response:', data); // Debug server response
                console.log('Number of courses returned:', data.length); // Debug result count

                // Convert each course to an array
                const coursesArray = data.map(course => [
                    course.category,
                    course.number,
                    course.title,
                    course.prerequisites,
                    course.lecture_hours,
                    course.lab_hours,
                    course.units,
                    course.year_level,
                    course.semester,
                ]);
                console.log('Converted Courses Array:', coursesArray); // Debug converted array

                // Set courses data
                setCourses(coursesArray);

                const firstYrFirstSem = coursesArray.filter(course => course[7] === '1st' && course[8] === '1st Semester').map(course => course.slice(0, -2));
                const firstYrSecondSem = coursesArray.filter(course => course[7] === '1st' && course[8] === '2nd Semester').map(course => course.slice(0, -2));
                const secondYrFirstSem = coursesArray.filter(course => course[7] === '2nd' && course[8] === '1st Semester').map(course => course.slice(0, -2));
                const secondYrSecondSem = coursesArray.filter(course => course[7] === '2nd' && course[8] === '2nd Semester').map(course => course.slice(0, -2));
                const thirdYrFirstSem = coursesArray.filter(course => course[7] === '3rd' && course[8] === '1st Semester').map(course => course.slice(0, -2));
                const thirdYrSecondSem = coursesArray.filter(course => course[7] === '3rd' && course[8] === '2nd Semester').map(course => course.slice(0, -2));
                const thirdYearSummer = coursesArray.filter(course => course[7] === '3rd' && course[8] === 'Summer').map(course => course.slice(0, -2));
                const fourthYrFirstSem = coursesArray.filter(course => course[7] === '4th' && course[8] === '1st Semester').map(course => course.slice(0, -2));
                const fourthYrSecondSem = coursesArray.filter(course => course[7] === '4th' && course[8] === '2nd Semester').map(course => course.slice(0, -2));
                const trackElective1 = coursesArray.filter(course => course[8] === 'Track Elective 1').map(course => course.slice(0, -2));
                const trackElective2 = coursesArray.filter(course => course[8] === 'Track Elective 2').map(course => course.slice(0, -2));
                const trackElective3 = coursesArray.filter(course => course[8] === 'Track Elective 3').map(course => course.slice(0, -2));
                const profElective = coursesArray.filter(course => course[8] === 'Prof. Elective Courses').map(course => course.slice(0, -2));

                setFirstYrFirstSemPrerequisites(firstYrFirstSem);
                setFirstYrSecondSemPrerequisites(firstYrSecondSem);
                setSecondYrFirstSemPrerequisites(secondYrFirstSem);
                setSecondYrSecondSemPrerequisites(secondYrSecondSem);
                setThirdYrFirstSemPrerequisites(thirdYrFirstSem);
                setThirdYrSecondSemPrerequisites(thirdYrSecondSem);
                setThirdYearSummerPrerequisites(thirdYearSummer);
                setFourthYrFirstSemPrerequisites(fourthYrFirstSem);
                setFourthYrSecondSemPrerequisites(fourthYrSecondSem);
                setTrackElective1Prerequisites(trackElective1);
                setTrackElective2Prerequisites(trackElective2);
                setTrackElective3Prerequisites(trackElective3);
                setProfElectivePrerequisites(profElective);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);


    return (
        <div className="min-h-screen bg-[#0f172a]">
            {console.log('First Year First Sem Prerequisites:', firstyr_firstsem_prerequisites)}
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
                                {prereq_headers[1]}
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