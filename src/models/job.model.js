let db_id = 3;
const jobs = [
  {
    id: 1,
    job_category: "Tech",
    job_designation: "SDE",
    job_location: "Bangalore HR IND Remote",
    company_name: "Intuit",
    salary: "14-20lpa",
    apply_by: "30 Aug 2025",
    skills_required: [
      "REACT",
      "NodeJs",
      "JS",
      "SQL",
      "MongoDB",
      "Express",
      "AWS",
    ],
    number_of_openings: 5,
    job_posted: new Date().toLocaleString(),
    applicants: [
      {
        applicat_id: 1,
        name: "abc",
        email: "rit@gmail.com",
        contact: 5678967897,
        resumePath: "resume.pdf",
      },
    ],
  },
  {
    id: 2,
    job_category: "Tech",
    job_designation: "React Developer",
    job_location: "Pune IND On-Site",
    company_name: "Go Digit",
    salary: "6-10lpa",
    apply_by: "30 Aug 2023",
    skills_required: ["Angular", "JS", "SQL", "MongoDB", "Express", "AWS"],
    number_of_openings: 7,
    job_posted: new Date().toLocaleString(),
    applicants: [],
  },
  {
    id: 3,
    job_category: "Tech",
    job_designation: "SDE",
    job_location: "Bangalore IND",
    company_name: "Juspay",
    salary: "20-26lpa",
    apply_by: "30 Aug 2024",
    skills_required: [
      "REACT",
      "NodeJs",
      "JS",
      "SQL",
      "MongoDB",
      "Express",
      "AWS",
    ],
    number_of_openings: 3,
    job_posted: new Date().toLocaleString(),
    applicants: [],
  },
];

class PostNewJob {
  constructor(
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    apply_by,
    skills_required,
    number_of_openings
  ) {
    this.id = ++db_id;
    this.job_category = job_category;
    (this.job_designation = job_designation),
      (this.job_location = job_location),
      (this.company_name = company_name);
    this.salary = salary;
    this.apply_by = apply_by;
    this.skills_required = skills_required;
    this.number_of_openings = number_of_openings;
    this.job_posted = new Date().toLocaleString();
    this.applicants = [];
  }
}

export const createNewJob = (job_details) => {
  let {
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    apply_by,
    skills_required,
    number_of_openings,
  } = job_details;
  console.log("jod details", job_details);
  if (skills_required && typeof skills_required === "string") {
    skills_required = [skills_required];
  }
  const job = new PostNewJob(
    job_category,
    job_designation,
    job_location,
    company_name,
    salary,
    apply_by,
    skills_required,
    number_of_openings
  );

  console.log("jobs", job);
  jobs.push(job);
};

export const getAllJobs = () => {
  return jobs;
};
export const findJobById = (id) => {
  return jobs.find((job) => {
    return job.id == id;
  });
};

export const addNewApplicant = (id, ...applicantData) => {
  console.log("add new applicant", applicantData);
  const index = jobs.findIndex((job) => {
    console.log("jobid", job);
    return job.id == id;
  });
  console.log("index", index);
  let applicantId = jobs[index].applicants.length + 1;
  console.log("app id", applicantId);
  jobs[index].applicants.push({
    applicat_id: applicantId,
    name: applicantData[0],
    email: applicantData[1],
    contact: applicantData[2],
    resumePath: applicantData[3],
  });
  console.log("job applicant", jobs[index].applicants);
  return jobs[index].applicants;
};

export const sendAllApplicants = (id) => {
  console.log("send applicant");
  const index = jobs.findIndex((job) => {
    return job.id == id;
  });
  return jobs[index].applicants;
};
export const updateJob = (id, data) => {
  console.log("data", data);
  const index = jobs.findIndex((job) => {
    console.log("job update", job.id);
    return job.id == id;
  });
  console.log("job id update", index);
  console.log("typeof", typeof data.skills_required);
  jobs[index].company_name = data.company_name || jobs[index].company_name;
  jobs[index].apply_by = data.apply_by || jobs[index].apply_by;
  jobs[index].job_category = data.job_category || jobs[index].job_category;
  jobs[index].job_designation =
    data.job_designation || jobs[index].job_designation;
  jobs[index].job_location = data.job_location || jobs[index].job_location;
  jobs[index].job_posted = data.job_posted || jobs[index].job_posted;
  jobs[index].number_of_openings =
    data.number_of_openings || jobs[index].number_of_openings;
  jobs[index].skills_required =
    typeof data.skills_required === "string"
      ? [data.skills_required]
      : data.skills_required || jobs[index].skills_required;
  jobs[index].salary = data.salary || jobs[index].salary;
  console.log("jobs", jobs[index]);
};
export const deleteJob = (id) => {
  const index = jobs.findIndex((job) => {
    return job.id == id;
  });
  console.log("delete", index);
  jobs.splice(index, 1);
};

export const searchjobbyname = (data) => {
  const jobdata = jobs.filter((j) => {
    console.log("jjj", j.company_name.toLowerCase());
    return j.company_name.toLowerCase().includes(data);
  });

  return jobdata;
};
