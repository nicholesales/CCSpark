import React, { useState, useEffect } from 'react';
import './emc_prereq.css';
import { FaArrowLeft } from 'react-icons/fa';

const API_COURSES = "http://127.0.0.1:8000/api/courses/";

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

    const [courses, setCourses] = useState([]);
    const [firstyr_firstsem_prerequisites, setFirstYrFirstSemPrerequisites] = useState([]);
    const [firstyr_secondsem_prerequisites, setFirstYrSecondSemPrerequisites] = useState([]);
    const [firstyr_summer_prerequisites, setFirstYearSummerPrerequisites] = useState([]);
    const [secondyr_firstsem_prerequisites, setSecondYrFirstSemPrerequisites] = useState([]);
    const [secondyr_secondsem_prerequisites, setSecondYrSecondSemPrerequisites] = useState([]);
    const [secondyr_summer_prerequisites, setSecondYearSummerPrerequisites] = useState([]);
    const [thirdyr_firstsem_prerequisites, setThirdYrFirstSemPrerequisites] = useState([]);
    const [thirdyr_secondsem_prerequisites, setThirdYrSecondSemPrerequisites] = useState([]);
    const [thirdyear_summer_prerequisites, setThirdYearSummerPrerequisites] = useState([]);
    const [fourthyear_firstsem_prerequisites, setFourthYrFirstSemPrerequisites] = useState([]);
    const [fourthyear_secondsem_prerequisites, setFourthYrSecondSemPrerequisites] = useState([]);
    const [free_elective_prerequisites, setProfElectivePrerequisites] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                // Make API call with query params
                const response = await fetch(`${API_COURSES}?program=EMC`);
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
                const firstYrSummer = coursesArray.filter(course => course[7] === '1st' && course[8] === 'Summer').map(course => course.slice(0, -2));
                const secondYrFirstSem = coursesArray.filter(course => course[7] === '2nd' && course[8] === '1st Semester').map(course => course.slice(0, -2));
                const secondYrSecondSem = coursesArray.filter(course => course[7] === '2nd' && course[8] === '2nd Semester').map(course => course.slice(0, -2));
                const secondYrSummer = coursesArray.filter(course => course[7] === '2nd' && course[8] === 'Summer').map(course => course.slice(0, -2));
                const thirdYrFirstSem = coursesArray.filter(course => course[7] === '3rd' && course[8] === '1st Semester').map(course => course.slice(0, -2));
                const thirdYrSecondSem = coursesArray.filter(course => course[7] === '3rd' && course[8] === '2nd Semester').map(course => course.slice(0, -2));
                const thirdYearSummer = coursesArray.filter(course => course[7] === '3rd' && course[8] === 'Summer').map(course => course.slice(0, -2));
                const fourthYrFirstSem = coursesArray.filter(course => course[7] === '4th' && course[8] === '1st Semester').map(course => course.slice(0, -2));
                const fourthYrSecondSem = coursesArray.filter(course => course[7] === '4th' && course[8] === '2nd Semester').map(course => course.slice(0, -2));
                const freeElective = coursesArray.filter(course => course[8] === 'Free. Elective Courses').map(course => course.slice(0, -2));

                setFirstYrFirstSemPrerequisites(firstYrFirstSem);
                setFirstYrSecondSemPrerequisites(firstYrSecondSem);
                setFirstYearSummerPrerequisites(firstYrSummer);
                setSecondYrFirstSemPrerequisites(secondYrFirstSem);
                setSecondYrSecondSemPrerequisites(secondYrSecondSem);
                setSecondYearSummerPrerequisites(secondYrSummer);
                setThirdYrFirstSemPrerequisites(thirdYrFirstSem);
                setThirdYrSecondSemPrerequisites(thirdYrSecondSem);
                setThirdYearSummerPrerequisites(thirdYearSummer);
                setFourthYrFirstSemPrerequisites(fourthYrFirstSem);
                setFourthYrSecondSemPrerequisites(fourthYrSecondSem);
                setProfElectivePrerequisites(freeElective);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

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
                                {prereq_headers[9]}
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

                        {/* Fourth Year Second Sem */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[10]}
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
                        {/* Free Elective Courses */}
                        <tr>
                            <td colSpan="7" className="px-4 py-3 bg-[#374151] font-semibold text-gray-200">
                                {prereq_headers[11]}
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