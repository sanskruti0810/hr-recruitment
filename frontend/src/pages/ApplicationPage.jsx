import { useEffect, useState } from "react";

export default function ApplicationPage() {
  const [apps, setApps] = useState([]);
  const [selected, setSelected] = useState(null); // Modal sathi

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myApplications") || "[]");
    if (saved.length === 0) {
      setApps([
        { id: "KITJOB-101", title: "Full Stack Developer", company: "TCS", loc: "Pune", date: "23 Aug 2026", status: "Application Submitted", type: "Full-time", salary: "₹ 8-12 LPA", desc: "We are hiring Full Stack Developer with React + Node skills." },
        { id: "KITJOB-102", title: "HR Executive", company: "Infosys", loc: "Nagpur", date: "22 Aug 2026", status: "Under Review", type: "Full-time", salary: "₹ 4-6 LPA", desc: "HR Executive for talent acquisition and onboarding." },
        { id: "KITJOB-103", title: "UI/UX Intern", company: "Wipro", loc: "Remote", date: "20 Aug 2026", status: "Interview Scheduled", type: "Internship", salary: "Stipend 15k", desc: "UI/UX Intern needed for Figma design work." },
        { id: "KITJOB-104", title: "Data Analyst", company: "Capgemini", loc: "Pune", date: "18 Aug 2026", status: "Selected", type: "Full-time", salary: "₹ 6-9 LPA", desc: "Data Analyst role with SQL and PowerBI." },
      ]);
    } else {
      setApps(saved);
    }
  }, []);

  const color = (s) => {
    if (s.includes("Submitted")) return "bg-blue-50 text-blue-600 border-blue-200";
    if (s.includes("Review")) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    if (s.includes("Scheduled")) return "bg-green-50 text-green-700 border-green-200";
    if (s.includes("Selected")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    return "bg-gray-50 text-gray-600";
  };

  return (
    <div className="p-6 bg-[#f8fbff] min-h-screen">
      <h1 className="text-3xl font-bold">My Applications - {apps.length}</h1>
      <p className="text-gray-500 text-sm">You have applied to {apps.length} jobs - Track by KITJOB ID</p>

      <div className="mt-6 space-y-4">
        {apps.map((job) => (
          <div key={job.id} className="bg-white p-5 rounded-2xl border shadow-sm flex justify-between">
            <div>
              <div className="flex gap-2 items-center">
                <h3 className="font-bold text-lg">{job.title}</h3>
                <span className="bg-black text-white text-[11px] px-2 py-0.5 rounded font-mono">{job.id}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{job.company} • {job.loc} • {job.type}</p>
              <p className="text-xs text-gray-400 mt-1">Applied: {job.date}</p>
              <div className="flex items-center gap-1.5 mt-3 text-[11px] text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div> Submitted
                <div className="w-6 h-[1px] bg-gray-300"></div>
                <span className={job.status!=="Application Submitted"?"text-green-600 font-bold":""}>Reviewed</span>
                <div className="w-6 h-[1px] bg-gray-300"></div>
                <span className={job.status==="Interview Scheduled" || job.status==="Selected"?"text-green-600 font-bold":""}>Interview</span>
                <div className="w-6 h-[1px] bg-gray-300"></div>
                <span className={job.status==="Selected"?"text-green-600 font-bold":""}>Selected</span>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-xs border px-3 py-1 rounded-full ${color(job.status)}`}>{job.status}</span>
              <button onClick={()=>setSelected(job)} className="block mt-3 bg-black text-white text-xs px-4 py-1.5 rounded-full hover:bg-gray-800">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* View Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{selected.title}</h2>
                <p className="text-sm text-gray-600">{selected.company} • {selected.loc}</p>
              </div>
              <button onClick={()=>setSelected(null)} className="text-2xl">×</button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <p><b>KITJOB ID:</b> <span className="font-mono bg-gray-900 text-white px-2 py-0.5 rounded text-xs">{selected.id}</span></p>
              <p><b>Salary:</b> {selected.salary}</p>
              <p><b>Applied Date:</b> {selected.date}</p>
              <p><b>Status:</b> <span className={`border px-2 py-1 rounded-full text-xs ${color(selected.status)}`}>{selected.status}</span></p>
              <p><b>Description:</b> {selected.desc}</p>

              <div className="bg-gray-50 p-3 rounded-xl mt-3">
                <p className="font-bold text-xs mb-2">Recruitment History</p>
                <p className="text-xs">✅ Application Submitted - {selected.date}</p>
                <p className="text-xs mt-1">{selected.status!=="Application Submitted"?"✅":"⏳"} Under Review</p>
                <p className="text-xs mt-1">{selected.status==="Interview Scheduled"||selected.status==="Selected"?"✅":"⏳"} Interview Scheduled</p>
                <p className="text-xs mt-1">{selected.status==="Selected"?"✅":"⏳"} Final Selection</p>
              </div>
            </div>

            <button onClick={()=>setSelected(null)} className="w-full mt-5 bg-black text-white py-2.5 rounded-full">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}