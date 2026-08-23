import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function MyProfile() {
  const [formData, setFormData] = useState({
    fullName: 'User Name',
    email: 'user@example.com',
    phone: '+91 9876543210',
    qualification: 'B.Tech in Computer Science',
    skills: 'React.js, Node.js, Tailwind CSS, JavaScript',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Profile updated successfully! 🎉');
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Title */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">👤 Candidate Profile</h2>
        <p className="text-slate-500 text-sm mt-1">
          Manage your personal details, qualifications, and resume.
        </p>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name 👤</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address 📧</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Phone Number 📞</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Highest Qualification 🎓</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Key Skills 💡</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Resume Upload Section */}
        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1">Upload Resume (PDF/DOCX) 📄</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition shadow-sm"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}