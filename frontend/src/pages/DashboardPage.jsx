import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myApplications") || "[]");
    if (saved.length === 0) {
      // Demo data jar 0 asel tar
      setApps([
        { id: "KITJOB-101", title: "Full Stack Developer", company: "TCS", date: "23 Aug 2026", status: "Application Submitted" },
        { id: "KITJOB-102", title: "HR Executive", company: "Infosys", date: "22 Aug 2026", status: "Under Review" },
        { id: "KITJOB-103", title: "UI/UX Intern", company: "Wipro", date: "20 Aug 2026", status: "Interview Scheduled" },
        { id: "KITJOB-104", title: "Data Analyst", company: "Capgemini", date: "18 Aug 2026", status: "Selected" },
      ]);
    } else {
      setApps(saved);
    }
  }, []);

  const upcoming = apps.filter(a => a.status === "Interview Scheduled").length;
  const appliedCount = apps.length;
  const selectedCount = apps.filter(a => a.status === "Selected").length;

  return (
    <div className="p-6 bg-[#f8fbff] min-h-screen">
      <h1 className="text-3xl font-bold">Candidate Dashboard</h1>
      <p className="text-gray-500 text-sm">Welcome Sanskruti! Track your recruitment journey</p>

      {/* TOP CARDS */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Applied Jobs</p>
          <h2 className="text-3xl font-bold mt-1">{appliedCount}</h2>
          <p className="text-xs text-blue-600 mt-2">Total applications submitted</p>
        </div>
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Upcoming Interviews</p>
          <h2 className="text-3xl font-bold mt-1">{upcoming}</h2>
          <p className="text-xs text-green-600 mt-2">{upcoming > 0? "Check My Applications" : "No interviews scheduled"}</p>
        </div>
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Selected</p>
          <h2 className="text-3xl font-bold mt-1">{selectedCount}</h2>
          <p className="text-xs text-emerald-600 mt-2">Congratulations!</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Application Status */}
        <div className="bg-white border rounded-2xl p-5">
          <h3 className="font-bold">Application Status</h3>
          <div className="mt-4 space-y-3">
            {apps.slice(0, 4).map(job => (
              <div key={job.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                <div>
                  <p className="font-semibold text-sm">{job.title}</p>
                  <p className="text-xs text-gray-500">{job.id} • {job.company}</p>
                </div>
                <span className={`text-[11px] px-2 py-1 rounded-full border
                  ${job.status.includes("Submitted")? "bg-blue-50 text-blue-600" : ""}
                  ${job.status.includes("Review")? "bg-yellow-50 text-yellow-700" : ""}
                  ${job.status.includes("Scheduled")? "bg-green-50 text-green-700" : ""}
                  ${job.status.includes("Selected")? "bg-emerald-50 text-emerald-700" : ""}
                `}>{job.status}</span>
              </div>
            ))}
          </div>
          <a href="/applications" className="text-xs text-[#0a84ff] mt-4 inline-block">View All Applications →</a>
        </div>

        {/* Recruitment History Timeline */}
        <div className="bg-white border rounded-2xl p-5">
          <h3 className="font-bold">Recruitment History</h3>
          <div className="mt-4 relative pl-6 border-l-2 border-gray-100 space-y-6">
            <div className="relative">
              <div className="absolute -left-[29px] w-3 h-3 bg-blue-500 rounded-full"></div>
              <p className="text-sm font-semibold">Application Submitted</p>
              <p className="text-xs text-gray-500">{apps[0]?.title} • {apps[0]?.date}</p>
              <p className="text-[11px] text-gray-400 mt-1">KITJOB ID: {apps[0]?.id}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[29px] w-3 h-3 bg-yellow-500 rounded-full"></div>
              <p className="text-sm font-semibold">Under Review</p>
              <p className="text-xs text-gray-500">Resume shortlisted by HR team</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[29px] w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-sm font-semibold">Interview Scheduled</p>
              <p className="text-xs text-gray-500">Technical Round - 25 Aug 2026, 10 AM</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[29px] w-3 h-3 bg-gray-300 rounded-full"></div>
              <p className="text-sm font-semibold text-gray-400">Final Selection</p>
              <p className="text-xs text-gray-400">Awaiting result</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}