function JobDetails({ job, onBack, onApply }) {

    if (!job) {
        return (
            <div className="container py-5">

                <div className="alert alert-danger">
                    Job not found.
                </div>

                <button
                    className="btn btn-secondary"
                    onClick={onBack}
                >
                    Back to Jobs
                </button>

            </div>
        );
    }

    return (
        <div className="container py-5">

            <button
                className="btn btn-outline-secondary mb-4"
                onClick={onBack}
            >
                ← Back to Jobs
            </button>

            <div className="card shadow border-0">

                <div className="card-body p-4 p-md-5">

                    <div className="d-flex justify-content-between align-items-start mb-4">

                        <div>

                            <h1 className="fw-bold mb-2">
                                {job.title}
                            </h1>

                            <h5 className="text-muted">
                                {job.company}
                            </h5>

                        </div>

                        <span className="badge text-bg-primary fs-6">
                            ₹{Number(job.salary)
                                .toLocaleString("en-IN")}
                        </span>

                    </div>

                    <hr />

                    <div className="row mt-4">

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Location
                            </h6>

                            <p className="fs-5">
                                {job.location}
                            </p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Job Type
                            </h6>

                            <p className="fs-5">
                                {job.jobType || "-"}
                            </p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Experience
                            </h6>

                            <p className="fs-5">
                                {job.experience || "-"}
                            </p>

                        </div>

                        <div className="col-md-6 mb-4">

                            <h6 className="text-muted">
                                Salary
                            </h6>

                            <p className="fs-5">
                                ₹{Number(job.salary)
                                    .toLocaleString("en-IN")}
                            </p>

                        </div>

                        <div className="col-12 mb-4">

                            <h6 className="text-muted">
                                Skills
                            </h6>

                            <p className="fs-5">
                                {job.skills}
                            </p>

                        </div>

                        <div className="col-12 mb-4">

                            <h6 className="text-muted">
                                Job Description
                            </h6>

                            <p>
                                {job.description || "No description available."}
                            </p>

                        </div>

                    </div>

                    <button
                        className="btn btn-primary btn-lg px-4"
                        onClick={() => onApply(job.id)}
                    >
                        Apply Now
                    </button>

                </div>

            </div>

        </div>
    );
}

export default JobDetails;