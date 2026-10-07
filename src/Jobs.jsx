import { useEffect, useState } from "react";

function Jobs({ onViewDetails }) {

    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("All");

    useEffect(() => {

        fetch("http://localhost:8080/jobs")
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch jobs");
                }

                return response.json();
            })
            .then((data) => {

                setJobs(data);
                setFilteredJobs(data);
                setLoading(false);
            })
            .catch((error) => {

                console.error(error);
                setMessage("Cannot connect to backend");
                setLoading(false);
            });

    }, []);

    useEffect(() => {

        let result = jobs;

        if (search.trim() !== "") {

            result = result.filter((job) =>
                job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.company.toLowerCase().includes(search.toLowerCase()) ||
                job.skills.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (location !== "All") {

            result = result.filter(
                (job) =>
                    job.location.toLowerCase() ===
                    location.toLowerCase()
            );
        }

        setFilteredJobs(result);

    }, [search, location, jobs]);

    const applyForJob = async (jobId) => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            setMessage("Please login first");
            return;
        }

        const user = JSON.parse(storedUser);

        const application = {
            userId: user.id,
            jobId: jobId
        };

        try {

            const response = await fetch(
                "http://localhost:8080/applications",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(application)
                }
            );

            const data = await response.text();

            if (response.ok) {
                setMessage("Application submitted successfully!");
            } else {
                setMessage(data);
            }

        } catch (error) {

            console.error(error);
            setMessage("Cannot connect to backend");
        }
    };

    if (loading) {

        return (
            <div className="container mt-5 text-center">

                <div className="spinner-border" role="status"></div>

                <p className="mt-2">
                    Loading jobs...
                </p>

            </div>
        );
    }

    const locations = [
        "All",
        ...new Set(jobs.map((job) => job.location))
    ];

    return (
        <div className="container py-5">

            <div className="text-center mb-5">

                <h1 className="fw-bold">
                    Available Jobs
                </h1>

                <p className="text-muted">
                    Find your next career opportunity
                </p>

            </div>

            <div className="row g-3 mb-5">

                <div className="col-md-8">

                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search job title, company or skills"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                </div>

                <div className="col-md-4">

                    <select
                        className="form-select form-select-lg"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >

                        {locations.map((loc) => (

                            <option
                                key={loc}
                                value={loc}
                            >
                                {loc === "All"
                                    ? "All Locations"
                                    : loc}
                            </option>

                        ))}

                    </select>

                </div>

            </div>

            {message && (
                <div className="alert alert-info text-center">
                    {message}
                </div>
            )}

            {filteredJobs.length === 0 ? (

                <div className="alert alert-warning text-center">
                    No jobs found.
                </div>

            ) : (

                <div className="row g-4">

                    {filteredJobs.map((job) => (

                        <div
                            className="col-md-6 col-lg-4"
                            key={job.id}
                        >

                            <div className="card h-100 shadow-sm border-0">

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-start mb-3">

                                        <div>

                                            <h4 className="fw-bold mb-1">
                                                {job.title}
                                            </h4>

                                            <h6 className="text-secondary">
                                                {job.company}
                                            </h6>

                                        </div>

                                        <span className="badge text-bg-primary">
                                            ₹{Number(job.salary)
                                                .toLocaleString("en-IN")}
                                        </span>

                                    </div>

                                    <p className="mb-2">
                                        <strong>Location:</strong>{" "}
                                        {job.location}
                                    </p>

                                    <p className="mb-2">
                                        <strong>Skills:</strong>{" "}
                                        {job.skills}
                                    </p>

                                    <p className="mb-2">
                                        <strong>Job Type:</strong>{" "}
                                        {job.jobType || "-"}
                                    </p>

                                    <p className="mb-3">
                                        <strong>Experience:</strong>{" "}
                                        {job.experience || "-"}
                                    </p>

                                    <div className="d-grid gap-2">

                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() =>
                                                onViewDetails(job)
                                            }
                                        >
                                            View Details
                                        </button>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() =>
                                                applyForJob(job.id)
                                            }
                                        >
                                            Apply Now
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Jobs;