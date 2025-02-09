import { sendConfirmationMail } from "../middlewares/sendMail.js";
import {
  addNewApplicant,
  createNewJob,
  deleteJob,
  findJobById,
  getAllJobs,
  sendAllApplicants,
  updateJob,
  searchjobbyname,
} from "../models/job.model.js";

export default class JobControl {
  renderLandingPage = (req, res) => {
    res.render("landing-page", { user: req.session.user });
  };
  getJobs = (req, res) => {
    let jobs = getAllJobs();
    console.log("jobs >>>", jobs);
    console.log("user session", req.session.user);
    res.render("list-all-jobs", { jobs, user: req.session.user });
    // res.render("product", { products, userEmail: req.session.userEmail });
  };
  newjob = (req, res) => {
    // console.log("create new", newjob);
    createNewJob(req.body);
    res.redirect("/jobs");
  };
  renderJobForm = (req, res) => {
    res.render("new-job", { user: req.session.user });
  };
  findJobById = (req, res) => {
    const id = req.params.id;
    const jobaData = findJobById(id);
    console.log("jod-detail", jobaData);
    res.render("job-details", { data: jobaData, user: req.session.user });
  };
  newApplicant = async (req, res) => {
    const id = req.params.id;
    const { name, email, contact } = req.body;
    const resumePath = req.file.filename;
    console.log("newapplicant");
    addNewApplicant(id, name, email, contact, resumePath);

    await sendConfirmationMail(email);
    res.redirect("/jobs");
  };
  allApplicants = (req, res) => {
    const id = req.params.id;
    const resp = sendAllApplicants(id);
    console.log("allapplicants", resp);
    res.render("all-applicants", {
      allApplicants: resp,
      user: req.session.user,
    });
  };
  renderUpdateform = (req, res) => {
    const id = req.params.id;
    const resp = findJobById(id);
    console.log("resp", resp);
    console.log("updaste");
    res.render("update-job", { job: resp });
  };
  updateJobById = (req, res) => {
    const id = req.params.id;
    console.log("update", id);
    console.log("req update", req.body);
    updateJob(id, req.body);
    res.redirect(`/job/${id}`);
  };
  deleteJob = (req, res) => {
    const id = req.params.id;
    deleteJob(id);
    res.redirect("/jobs");
  };

  searchjobs = (req, res) => {
    const { name } = req.body;
    const job = searchjobbyname(name);
    console.log("job serach", job, name);
    res.render("list-all-jobs", { jobs: job, user: req.session.user });
  };
}
