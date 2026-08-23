require('dotenv').config();
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String, company: String, location: String,
  jobType: String, department: String, salary: String,
  description: String, requirements: [String],
  postedBy: mongoose.Schema.Types.ObjectId
}, { strict: false });

const Job = mongoose.model('Job', jobSchema);

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Job.deleteMany({});
  await Job.create([
    { title: "Full Stack Developer", company: "TCS", location: "Pune", jobType: "Full-time", department: "Software", salary: "8-12 LPA", description: "React + Node + MongoDB project work" },
    { title: "HR Executive", company: "Infosys", location: "Nagpur", jobType: "Full-time", department: "HR", salary: "4-6 LPA", description: "Recruitment and employee management" },
    { title: "UI/UX Intern", company: "Wipro", location: "Remote", jobType: "Internship", department: "Design", salary: "Stipend 15k", description: "Figma design and prototyping" },
    { title: "Data Analyst", company: "Capgemini", location: "Mumbai", jobType: "Full-time", department: "Analytics", salary: "6-9 LPA", description: "Python, SQL, PowerBI" }
  ]);
  console.log("✅ 4 Jobs Added Successfully!");
  process.exit();
});