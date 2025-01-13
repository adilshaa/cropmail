import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaClock, FaGraduationCap, FaLink, FaBook, FaMedal } from "react-icons/fa";
import { get } from "../../../services/apiService";

const CourseDetails = () => {
    const { id } = useParams();
    const [courseDetails, setCourseDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await get(`/api/courses/${id}`);
                setCourseDetails(response);
            } catch (error) {
                console.error("Error fetching course details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
            </div>
        );
    }

    if (!courseDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Course not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">
                                {courseDetails.description.short}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-sm mb-6">
                                <span className="flex items-center gap-2">
                                    <FaMedal />
                                    {courseDetails.metadata.difficulty}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaGraduationCap />
                                    {courseDetails.field}
                                </span>
                            </div>
                        </div>
                        <div className="relative aspect-video">
                            <img
                                src={courseDetails.image}
                                alt={courseDetails.description.short}
                                className="rounded-lg shadow-xl object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-8">
                        <section className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold mb-4">Course Description</h2>
                            <p className="text-gray-600 whitespace-pre-line">
                                {courseDetails.description.detailed}
                            </p>
                        </section>

                        <section className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-2xl font-bold mb-4">Learning Objectives</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {courseDetails.objectives?.map((objective, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <FaBook className="text-teal-500" />
                                        </div>
                                        <p className="text-gray-600">{objective}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <h3 className="text-xl font-bold mb-4">Course Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <FaClock className="text-teal-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Duration</p>
                                        <p className="font-medium">
                                            {courseDetails.metadata?.duration || "Not specified"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaMedal className="text-teal-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Level</p>
                                        <p className="font-medium capitalize">
                                            {courseDetails.metadata.difficulty}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaLink className="text-teal-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Course Link</p>
                                        <a
                                            href={courseDetails.courseLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline break-all"
                                        >
                                            {courseDetails.courseLink}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <button
                                className={`w-full px-6 py-3 rounded-lg text-white font-medium
                                bg-${courseDetails.buttonColor || 'teal'}-500 
                                hover:bg-${courseDetails.buttonColor || 'teal'}-600
                                transition-colors`}
                            >
                                {courseDetails.buttonLabel || "Enroll Now"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;
