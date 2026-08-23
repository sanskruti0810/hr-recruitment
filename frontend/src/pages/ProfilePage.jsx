import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [edit, setEdit] = useState(false);
  const [user, setUser] = useState({
    name: "Sanskruti Warghade",
    email: "sanskruti@gmail.com",
    phone: "9876543210",
    location: "Nagpur, Maharashtra",
    role: "Candidate",
    candidateId: "KIT-CAND-2026-042",
    skills: "React, Node.js, MongoDB, Figma",
    education: "B.Tech - KIT Nagpur",
    resume: "Sanskruti_Resume.pdf"
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profileData") || "null");
    if (saved) setUser(saved);
  }, []);

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(user));
    setEdit(false);
    alert("Profile Updated!");
  };

  return (
    <div className="p-6 bg-[#f8fbff] min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <button onClick={() => edit? handleSave() : setEdit(true)} className="bg-black text-white px-5 py-2 rounded-full text-sm">
          {edit? "Save Profile" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6 mt-6">
        {/* Left Card */}
        <div className="bg-white border rounded-2xl p-6 text-center">
          <div className="w-24 h-24 bg-[#0a84ff] rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
          <h2 className="font-bold text-lg mt-3">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
          <span className="mt-2 inline-block bg-black text-white text-[11px] px-3 py-1 rounded-full font-mono">{user.candidateId}</span>

          <div className="mt-6 text-left space-y-2 text-sm">
            <p>📍 {user.location}</p>
            <p>💼 {user.role}</p>
            <p>📄 {user.resume}</p>
          </div>
        </div>

        {/* Right Form */}
        <div className="col-span-2 bg-white border rounded-2xl p-6">
          <h3 className="font-bold mb-4">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500">Full Name</label>
              <input disabled={!edit} value={user.name} onChange={e=>setUser({...user, name:e.target.value})} className="w-full border rounded-xl px-4 py-2 mt-1 text-sm bg-gray-50 disabled:bg-gray-50" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Email Address</label>
              <input disabled={!edit} value={user.email} onChange={e=>setUser({...user, email:e.target.value})} className="w-full border rounded-xl px-4 py-2 mt-1 text-sm bg-gray-50" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Phone Number</label>
              <input disabled={!edit} value={user.phone} onChange={e=>setUser({...user, phone:e.target.value})} className="w-full border rounded-xl px-4 py-2 mt-1 text-sm" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Location</label>
              <input disabled={!edit} value={user.location} onChange={e=>setUser({...user, location:e.target.value})} className="w-full border rounded-xl px-4 py-2 mt-1 text-sm" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500">Skills</label>
              <input disabled={!edit} value={user.skills} onChange={e=>setUser({...user, skills:e.target.value})} className="w-full border rounded-xl px-4 py-2 mt-1 text-sm" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500">Education</label>
              <input disabled={!edit} value={user.education} onChange={e=>setUser({...user, education:e.target.value})} className="w-full border rounded-xl px-4 py-2 mt-1 text-sm" />
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="text-sm font-bold text-blue-700">Recruitment Stats</p>
            <div className="flex gap-6 mt-2 text-xs">
              <span>Applied: <b>{JSON.parse(localStorage.getItem("myApplications")||"[]").length || 4}</b></span>
              <span>Interviews: <b>1</b></span>
              <span>Selected: <b>1</b></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}