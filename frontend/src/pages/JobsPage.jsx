import { useEffect, useState } from "react";
import axios from "axios";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [applied, setApplied] = useState(JSON.parse(localStorage.getItem("myApplications") || "[]"));
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/jobs", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        setJobs(res.data.jobs || res.data || []);
      } catch {
        setJobs([
          { _id: "JOB101", title: "Full Stack Developer", company: "TCS", location: "Pune", salary: "₹ 8-12 LPA", category: "General" },
          { _id: "JOB102", title: "HR Executive", company: "Infosys", location: "Nagpur", salary: "₹ 4-6 LPA", category: "General" },
          { _id: "JOB103", title: "UI/UX Intern", company: "Wipro", location: "Remote", salary: "Stipend 15k", category: "General" },
          { _id: "JOB104", title: "Data Analyst", company: "Capgemini", location: "Mumbai", salary: "₹ 6-9 LPA", category: "General" },
        ]);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = (job) => {
    const id = job._id || job.id;
    if (applied.find((a) => a.id === id || a._id === id)) { alert("Already Applied!"); return; }
    const newApp = {
      id: id, _id: id, title: job.title, company: job.company, loc: job.location,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Application Submitted", type: "Full-time"
    };
    const updated = [...applied, newApp];
    setApplied(updated);
    localStorage.setItem("myApplications", JSON.stringify(updated));
    alert(`Applied! KITJOB ID: ${id}`);
  };

  const filtered = jobs.filter((j) => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 bg-[#f8fbff] min-h-screen">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 bg-white border rounded-full px-4 py-2 w-full max-w-xl">
          <span>🔍</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, company, skills..." className="outline-none w-full" />
        </div>
        <div className="flex gap-2 text-sm">
          <span className="bg-black text-white px-4 py-2 rounded-full">All</span>
          <span className="bg-white border px-4 py-2 rounded-full">Full-time</span>
          <span className="bg-white border px-4 py-2 rounded-full">Part-time</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-6">
        {filtered.map((job) => {
          const isApplied = applied.find((a) => a.id === (job._id || job.id));
          return (
            <div key={job._id || job.id} className="bg-white border rounded-2xl p-5 shadow-sm">
              {/* FIX: Blue button empty nahi - Letter yeil */}
              <div className="w-12 h-12 bg-[#0a84ff] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                {job.company.charAt(0)}
              </div>

              <h3 className="font-bold text-[#0a84ff] mt-3 text-lg">{job.title}</h3>
              <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">🏢 {job.company}</p>
              
              <div className="flex gap-3 mt-2 text-xs text-gray-500">
                <span>📍 {job.location}</span>
                <span>{job.salary}</span>
                <span>● {job.category}</span>
              </div>

              <div className="flex gap-3 mt-4 items-center">
                <button onClick={() => handleApply(job)} className={`flex-1 py-2.5 rounded-full text-sm font-semibold ${isApplied ? "bg-green-100 text-green-700" : "bg-[#0a84ff] text-white"}`}>
                  {isApplied ? "✓ Applied" : "Apply Now"}
                </button>
                <button className="text-sm font-medium">Save</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}