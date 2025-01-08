import React from "react";
import { FaCamera, FaEdit, FaBell, FaShieldAlt, FaKey, FaHistory, FaSignOutAlt, 
         FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaLanguage, 
         FaCertificate, FaGlobe, FaPhone, FaBirthdayCake } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 md:p-8 mb-6 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center gap-6 max-w-7xl mx-auto">
            <div className="relative">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-2 right-2 p-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all shadow-lg">
                <FaCamera size={18} />
              </button>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800">John Doe</h1>
              <p className="text-gray-500 mb-4">john.doe@example.com</p>
              <button className="px-6 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors inline-flex items-center gap-2">
                <FaEdit size={16} />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Main Content Column */}
          <div className="md:col-span-3 space-y-6">
            {/* Top Cards Grid */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-blue-500 rounded-xl">
                    <FaBriefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
                    <p className="text-gray-500">5+ years</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 text-green-500 rounded-xl">
                    <FaCertificate size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Projects</h3>
                    <p className="text-gray-500">25+ completed</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 text-purple-500 rounded-xl">
                    <FaGraduationCap size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Education</h3>
                    <p className="text-gray-500">Master's Degree</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <button className="p-2 hover:bg-blue-50 rounded-xl transition-colors text-blue-500">
                  <FaEdit size={18} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <InfoField label="Full Name" value="John Doe" icon={FaEdit} />
                <InfoField label="Email" value="john.doe@example.com" icon={FaGlobe} />
                <InfoField label="Phone" value="+1 (555) 123-4567" icon={FaPhone} />
                <InfoField label="Location" value="New York, USA" icon={FaMapMarkerAlt} />
                <InfoField label="Birthday" value="January 15, 1990" icon={FaBirthdayCake} />
                <InfoField label="Languages" value="English, Spanish" icon={FaLanguage} />
              </div>
            </div>

            {/* Professional Information with wider layout */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="max-w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Professional Background</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-blue-500 pl-4 space-y-4">
                    <h3 className="font-medium text-gray-800 flex items-center gap-2">
                      <FaBriefcase className="text-blue-500" />
                      Work Experience
                    </h3>
                    {[
                      {
                        role: "Senior Software Engineer",
                        company: "Tech Corp",
                        period: "2020 - Present",
                        description: "Leading development team and architecting solutions"
                      },
                      {
                        role: "Software Developer",
                        company: "StartUp Inc",
                        period: "2018 - 2020",
                        description: "Full-stack development and API integration"
                      }
                    ].map((job, index) => (
                      <div key={index} className="ml-4">
                        <h4 className="font-medium text-gray-800">{job.role}</h4>
                        <p className="text-gray-600">{job.company}</p>
                        <p className="text-sm text-gray-500">{job.period}</p>
                        <p className="text-sm text-gray-600 mt-1">{job.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-l-2 border-green-500 pl-4 space-y-4">
                    <h3 className="font-medium text-gray-800 flex items-center gap-2">
                      <FaGraduationCap className="text-green-500" />
                      Education
                    </h3>
                    {[
                      {
                        degree: "Master's in Computer Science",
                        school: "Tech University",
                        year: "2018"
                      },
                      {
                        degree: "Bachelor's in Software Engineering",
                        school: "State University",
                        year: "2016"
                      }
                    ].map((edu, index) => (
                      <div key={index} className="ml-4">
                        <h4 className="font-medium text-gray-800">{edu.degree}</h4>
                        <p className="text-gray-600">{edu.school}</p>
                        <p className="text-sm text-gray-500">{edu.year}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border-l-2 border-purple-500 pl-4 space-y-4">
                    <h3 className="font-medium text-gray-800 flex items-center gap-2">
                      <FaCertificate className="text-purple-500" />
                      Certifications
                    </h3>
                    {[
                      {
                        name: "AWS Certified Solutions Architect",
                        issuer: "Amazon Web Services",
                        date: "2022"
                      },
                      {
                        name: "Professional Scrum Master",
                        issuer: "Scrum.org",
                        date: "2021"
                      }
                    ].map((cert, index) => (
                      <div key={index} className="ml-4">
                        <h4 className="font-medium text-gray-800">{cert.name}</h4>
                        <p className="text-gray-600">{cert.issuer}</p>
                        <p className="text-sm text-gray-500">{cert.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Log with wider layout */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                <button className="text-blue-500 text-sm font-medium hover:text-blue-600">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { action: "Password changed", date: "2 hours ago", icon: FaKey, color: "blue" },
                  { action: "Logged in from new device", date: "Yesterday", icon: FaHistory, color: "green" },
                  { action: "Updated profile picture", date: "3 days ago", icon: FaCamera, color: "purple" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                    <div className={`p-3 bg-${activity.color}-50 text-${activity.color}-500 rounded-xl`}>
                      <activity.icon size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {[
                  { icon: FaBell, label: "Notifications", color: "blue" },
                  { icon: FaShieldAlt, label: "Security", color: "green" },
                  { icon: FaKey, label: "Password", color: "yellow" },
                ].map((action, index) => (
                  <button
                    key={index}
                    className="w-full p-4 rounded-2xl hover:bg-gray-50 transition-all flex items-center gap-4 border border-gray-100"
                  >
                    <div className={`p-3 bg-${action.color}-50 text-${action.color}-500 rounded-xl`}>
                      <action.icon size={18} />
                    </div>
                    <span className="font-medium text-gray-800">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript", "React", "Node.js", "Python",
                  "AWS", "Docker", "GraphQL", "TypeScript"
                ].map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Sign Out Button */}
            <button className="w-full p-4 bg-red-50 hover:bg-red-100 rounded-2xl flex items-center justify-center gap-3 text-red-600 font-medium transition-colors">
              <FaSignOutAlt size={18} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField = ({ label, value, icon: Icon }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-500 flex items-center gap-2">
      <Icon className="text-gray-400" size={14} />
      {label}
    </label>
    <p className="text-gray-800 font-medium">{value}</p>
    <div className="h-0.5 bg-gray-100 rounded-full"></div>
  </div>
);

export default Profile;
