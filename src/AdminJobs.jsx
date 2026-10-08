import { useEffect, useState } from "react";

function AdminJobs() {

    const emptyJob = {
        title: "",
        company: "",
        location: "",
        skills: "",
        salary: "",
        jobType: "",
        experience: "",
        description: ""
    };

    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(emptyJob);
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState("");

    const loadJobs = () => {

        fetch("https://job-portal-rho-jade.vercel.app/jobs")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch jobs");
                }

                return response.json();
            })
            .then((data) => {
                setJobs(data);
            })
            .catch((error) => {
                console.error(error);
                setMessage("Cannot connect to backend");
            });
    };

    useEffect(() => {
        loadJobs();
    }, []);

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const jobData = {
            title: job.title,
            company: job.company,
            location: job.location,
            skills: job.skills,
            salary: Number(job.salary),
            jobType: job.jobType,
            experience: job.experience,
            description: job.description
        };

        try {

            let response;

            if (editingId) {

                response = await fetch(
                    `https://job-portal-rho-jade.vercel.app/jobs/${editingId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(jobData)
                    }
                );

            } else {

                response = await fetch(
                    "https://job-portal-rho-jade.vercel.app/jobs",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(jobData)
                    }
                );
            }

            if (response.ok) {

                setMessage(
                    editingId
                        ? "Job updated successfully!"
                        : "Job added successfully!"
                );

                setJob(emptyJob);
                setEditingId(null);

                loadJobs();

            } else {

                const error = await response.text();
                setMessage(error);
            }

        } catch (error) {

            console.error(error);
            setMessage("Cannot connect to backend");
        }
    };

    const editJob = (jobData) => {

        setJob({
            title: jobData.title || "",
            company: jobData.company || "",
            location: jobData.location || "",
            skills: jobData.skills || "",
            salary: jobData.salary || "",
            jobType: jobData.jobType || "",
            experience: jobData.experience || "",
            description: jobData.description || ""
        });

        setEditingId(jobData.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const deleteJob = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this job?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `https://job-portal-rho-jade.vercel.app/jobs/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (response.ok) {

                setMessage("Job deleted successfully!");

                loadJobs();

            } else {

                const error = await response.text();
                setMessage(error);
            }

        } catch (error) {

            console.error(error);
            setMessage("Cannot connect to backend");
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setJob(emptyJob);
    };

    return (
        <div className="container py-5">

            <div className="text-center mb-5">

                <h1 className="fw-bold">
                    Manage Jobs
                </h1>

                <p className="text-muted">
                    Add, edit and manage job opportunities
                </p>

            </div>

            {message && (
                <div className="alert alert-info text-center">
                    {message}
                </div>
            )}

            <div className="card shadow-sm border-0 mb-5">

                <div className="card-body p-4">

                    <h4 className="fw-bold mb-4">
                        {editingId ? "Edit Job" : "Add New Job"}
                    </h4>

                    <form onSubmit={handleSubmit}>

                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="form-label">
                                    Job Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={job.title}
                                    onChange={handleChange}
                                    placeholder="Etc..Java Developer"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Company
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="company"
                                    value={job.company}
                                    onChange={handleChange}
                                    placeholder="Etc..ABC Techonologies"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="location"
                                    value={job.location}
                                    onChange={handleChange}
                                    placeholder="Etc..Chennai"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Skills
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="skills"
                                    value={job.skills}
                                    onChange={handleChange}
                                    placeholder="Etc..Java, Spring Boot, MySQL"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Salary
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="salary"
                                    value={job.salary}
                                    onChange={handleChange}
                                    placeholder="Etc..450000"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Job Type
                                </label>

                                <select
                                    className="form-select"
                                    name="jobType"
                                    value={job.jobType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select Job Type
                                    </option>

                                    <option value="Full Time">
                                        Full Time
                                    </option>

                                    <option value="Part Time">
                                        Part Time
                                    </option>

                                    <option value="Internship">
                                        Internship
                                    </option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">
                                    Experience
                                </label>

                                <select
                                    className="form-select"
                                    name="experience"
                                    value={job.experience}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">
                                        Select Experience
                                    </option>

                                    <option value="Fresher">
                                        Fresher
                                    </option>

                                    <option value="1-2 Years">
                                        1-2 Years
                                    </option>

                                    <option value="2-5 Years">
                                        2-5 Years
                                    </option>

                                    <option value="5+ Years">
                                        5+ Years
                                    </option>
                                </select>
                            </div>

                            <div className="col-12">

                                <label className="form-label">
                                    Description
                                </label>

                                <textarea
                                    className="form-control"
                                    name="description"
                                    rows="4"
                                    value={job.description}
                                    onChange={handleChange}
                                    placeholder="Enter job description"
                                    required
                                ></textarea>

                            </div>

                        </div>

                        <div className="mt-4">

                            <button
                                type="submit"
                                className="btn btn-primary me-2"
                            >
                                {editingId ? "Update Job" : "Add Job"}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={cancelEdit}
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>

                </div>

            </div>

            <h3 className="fw-bold mb-4">
                Existing Jobs
            </h3>

            <div className="row g-4">

                {jobs.map((jobData) => (

                    <div
                        className="col-md-6 col-lg-4"
                        key={jobData.id}
                    >

                        <div className="card h-100 shadow-sm border-0">

                            <div className="card-body p-4">

                                <div className="d-flex justify-content-between">

                                    <h4 className="fw-bold">
                                        {jobData.title}
                                    </h4>

                                    <span className="badge text-bg-primary">
                                        {jobData.jobType || "Job"}
                                    </span>

                                </div>

                                <h6 className="text-muted">
                                    {jobData.company}
                                </h6>

                                <p className="mt-3 mb-2">
                                    <strong>Location:</strong>{" "}
                                    {jobData.location}
                                </p>

                                <p className="mb-2">
                                    <strong>Skills:</strong>{" "}
                                    {jobData.skills}
                                </p>

                                <p className="mb-2">
                                    <strong>Experience:</strong>{" "}
                                    {jobData.experience || "-"}
                                </p>

                                <p className="mb-2">
                                    <strong>Salary:</strong>{" "}
                                    ₹{Number(jobData.salary)
                                        .toLocaleString("en-IN")}
                                </p>

                                <p className="small text-muted mb-4">
                                    {jobData.description}
                                </p>

                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => editJob(jobData)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteJob(jobData.id)}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default AdminJobs;