import { useState, useEffect } from "react";

export default function ApplicationPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    // Local storage madhun ghe
    const saved = JSON.parse(localStorage.getItem("myApplications") || "[]");

    if (saved.length > 0) {
      setApps(saved);
    } else {
      // Demo data - jar 0 asel tar PPT sathi dakhav
      setApps([
        {
          id: "KITJOB-2026-001",
          title: "Full Stack Developer",
          company: "TCS - Nagpur",
          type: "Full-time",
          appliedAt: "23 Aug 2026",
          status: "Application Submitted",
        },
        {
          id: "KITJOB-2026-002",
          title: "HR Executive",
          company: "Infosys - Pune",
          type: "Full-time",
          appliedAt: "22 Aug 2026",
          status: "Under Review",
        },
        {
          id: "KITJOB-2026-003",
          title: "React Developer",
          company: "Wipro - Hyderabad",
          type: "Internship",
          appliedAt: "20 Aug 2026",
          status: "Interview Scheduled",
        },
      ]);
    }
  }, []);

  const statusColor = (s) => {
    if (s === "Application Submitted") return "bg-blue-100 text-blue-700";
    if (s === "Under Review") return "bg-yellow-100 text-yellow-700";
    if (s === "Interview Scheduled") return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-6 bg-[#f8fbff] min-h-screen">
      <h1 className="text-2xl font-bold">My Applications - {apps.length}</h1>
      <p className="text-gray-500 text-sm mb-6">You have applied to {apps.length} jobs - Track KITJOB ID</p>

      <div className="space-y-4">
        {apps.map((job) => (
          <div key={job.id} className="bg-white border rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">{job.title}</h3>
                  <span className="text-[10px] bg-black text-white px-2 py-1 rounded font-mono">{job.id}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{job.company} • {job.type}</p>
                <p className="text-xs text-gray-400 mt-1">Applied: {job.appliedAt}</p>

                {/* Recruitment History */}
                <div className="flex items-center gap-2 mt-3 text-[11px]">
                  <span className="h-2 w-2 bg-green-500 rounded-full"></span> Submitted
                  <span className="w-5 h-[1px] bg-gray-300"></span>
                  <span className={job.status!== "Application Submitted"? "text-green-600 font-bold" : "text-gray-400"}>Reviewed</span>
                  <span className="w-5 h-[1px] bg-gray-300"></span>
                  <span className={job.status === "Interview Scheduled"? "text-green-600 font-bold" : "text-gray-400"}>Interview</span>
                  <span className="w-5 h-[1px] bg-gray-300"></span>
                  <span className="text-gray-400">Selected</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs px-3 py-1 rounded-full ${statusColor(job.status)}`}>{job.status}</span>
                <button className="block mt-3 text-xs bg-black text-white px-4 py-1.5 rounded-full">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}