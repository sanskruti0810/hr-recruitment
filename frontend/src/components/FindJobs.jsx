import React, { useState, useEffect } from 'react';

export default function FindJobs() {
  const jobs = [
    { id: "JOB101", title: "Full Stack Developer", company: "TCS", location: "Pune", salary: "8-12 LPA", type: "FULL-TIME" },
    { id: "JOB102", title: "HR Executive", company: "Infosys", location: "Nagpur", salary: "4-6 LPA", type: "FULL-TIME" },
    { id: "JOB103", title: "UI/UX Intern", company: "Wipro", location: "Remote", salary: "Stipend 15k", type: "INTERNSHIP" },
    { id: "JOB104", title: "Data Analyst", company: "Capgemini", location: "Pune", salary: "6-8 LPA", type: "FULL-TIME" },
  ];

  const [applied, setApplied] = useState([]);

  useEffect(() => {
    setApplied(JSON.parse(localStorage.getItem("myApplications") || "[]"));
  }, []);

  const handleApply = (jobData) => {
    if (!jobData) return;
    const jobId = jobData?.id || jobData?._id;
    const isApplied = applied.find(a => (a?.id === jobId) || (a?._id === jobId));
    if (isApplied) {
      alert("Already Applied!");
      return;
    }
    const updated = [...applied, { ...jobData, id: jobId, status: "Applied" }];
    localStorage.setItem("myApplications", JSON.stringify(updated));
    setApplied(updated);
    alert("Applied Successfully!");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Job Openings</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {jobs.map((job) => {
          const jobId = job?.id;
          const done = applied.some(a => a?.id === jobId);
          return (
            <div key={jobId} className="border p-5 rounded-xl bg-white">
              <h2 className="font-bold text-blue-600">{job?.title}</h2>
              <p className="text-sm">@{job?.company}</p>
              <button 
                onClick={() => handleApply(job)}
                disabled={done}
                className={`w-full mt-4 py-2 rounded-full ${done ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'}`}
              >
                {done ? "✓ Applied" : "Apply Now →"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}