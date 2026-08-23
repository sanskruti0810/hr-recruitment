import { useEffect, useState } from "react";

export default function InterviewsPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myApplications") || "[]");
    if (saved.length === 0) {
      setApps([
        { id: "KITJOB-103", title: "UI/UX Intern", company: "Wipro", loc: "Remote", date: "20 Aug 2026", status: "Interview Scheduled", time: "25 Aug 2026, 10:00 AM", mode: "Google Meet", link: "meet.google.com/wipro-ux" },
        { id: "KITJOB-102", title: "HR Executive", company: "Infosys", loc: "Nagpur", date: "22 Aug 2026", status: "Under Review", time: "28 Aug 2026, 2:00 PM", mode: "On-site", link: "Infosys Nagpur Office" },
        { id: "KITJOB-104", title: "Data Analyst", company: "Capgemini", loc: "Pune", date: "18 Aug 2026", status: "Selected", time: "15 Aug 2026, 11:00 AM", mode: "Completed", link: "Selected" },
      ]);
    } else {
      // Application status varun interview banav
      const interviewData = saved.filter(a => a.status === "Interview Scheduled" || a.status === "Selected").map(a => ({
       ...a,
        time: a.status === "Selected"? "15 Aug 2026, 11:00 AM" : "25 Aug 2026, 10:00 AM",
        mode: a.status === "Selected"? "Completed" : "Google Meet",
        link: a.status === "Selected"? "Selected" : "meet.google.com/kitjob"
      }));
      if(interviewData.length > 0) setApps(interviewData);
      else setApps([
        { id: "KITJOB-103", title: "UI/UX Intern", company: "Wipro", loc: "Remote", status: "Interview Scheduled", time: "25 Aug 2026, 10:00 AM", mode: "Google Meet", link: "meet.google.com/wipro-ux" },
        { id: "KITJOB-104", title: "Data Analyst", company: "Capgemini", loc: "Pune", status: "Selected", time: "15 Aug 2026, 11:00 AM", mode: "Completed", link: "Selected" },
      ]);
    }
  }, []);

  const upcoming = apps.filter(a => a.status === "Interview Scheduled");
  const completed = apps.filter(a => a.status === "Selected" || a.mode === "Completed");

  return (
    <div className="p-6 bg-[#f8fbff] min-h-screen">
      <h1 className="text-3xl font-bold">My Interviews</h1>
      <p className="text-gray-500 text-sm">Track your upcoming and completed interviews</p>

      {/* TOP STATS */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Total Interviews</p>
          <h2 className="text-3xl font-bold mt-1">{apps.length}</h2>
        </div>
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Upcoming</p>
          <h2 className="text-3xl font-bold mt-1 text-green-600">{upcoming.length}</h2>
        </div>
        <div className="bg-white border rounded-2xl p-5">
          <p className="text-sm text-gray-500">Completed</p>
          <h2 className="text-3xl font-bold mt-1">{completed.length}</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Upcoming */}
        <div className="bg-white border rounded-2xl p-5">
          <h3 className="font-bold flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Upcoming Interviews</h3>
          <div className="mt-4 space-y-4">
            {upcoming.length === 0? <p className="text-sm text-gray-400">No upcoming interviews</p> :
            upcoming.map(job => (
              <div key={job.id} className="border rounded-xl p-4">
                <div className="flex justify-between">
                  <h4 className="font-bold text-sm">{job.title}</h4>
                  <span className="text-[11px] bg-black text-white px-2 py-0.5 rounded-full font-mono">{job.id}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{job.company} • {job.loc || "Remote"}</p>
                <div className="mt-3 bg-blue-50 p-2.5 rounded-xl text-xs space-y-1">
                  <p>🕒 <b>Time:</b> {job.time}</p>
                  <p>💻 <b>Mode:</b> {job.mode}</p>
                  <p>🔗 <b>Link:</b> <span className="text-blue-600">{job.link}</span></p>
                </div>
                <button className="mt-3 w-full bg-[#0a84ff] text-white text-xs py-2 rounded-full">Join Interview</button>
              </div>
            ))}
          </div>
        </div>

        {/* Completed */}
        <div className="bg-white border rounded-2xl p-5">
          <h3 className="font-bold flex items-center gap-2"><span className="w-2 h-2 bg-gray-400 rounded-full"></span> Completed / Selected</h3>
          <div className="mt-4 space-y-4">
            {completed.map(job => (
              <div key={job.id} className="border rounded-xl p-4 bg-gray-50">
                <div className="flex justify-between">
                  <h4 className="font-bold text-sm">{job.title}</h4>
                  <span className="text-[11px] bg-emerald-500 text-white px-2 py-0.5 rounded-full">{job.status}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{job.company}</p>
                <p className="text-xs text-gray-400 mt-2">Interviewed on {job.time}</p>
                <div className="mt-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 p-2 rounded-lg">
                  ✅ Congratulations! You are selected.
                </div>
              </div>
            ))}
            {completed.length===0 && <p className="text-sm text-gray-400">No completed interviews yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
}