import { useEffect, useState } from "react";

function AdminApplications() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const loadApplications = () => {

        fetch("https://job-portal-rho-jade.vercel.app/applications")
            .then((response) => {

                if (!response.ok) {
                    throw new Error("Failed to fetch applications");
                }

                return response.json();
            })
            .then((data) => {
                setApplications(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setMessage("Cannot connect to backend");
                setLoading(false);
            });
    };

    useEffect(() => {
        loadApplications();
    }, []);

    const updateStatus = async (id, status) => {

        try {

            const response = await fetch(
                `https://job-portal-rho-jade.vercel.app/applications/${id}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: status
                }
            );

            if (response.ok) {

                setMessage(
                    `Application #${id} updated to ${status}`
                );

                loadApplications();

            } else {

                const error = await response.text();
                setMessage(error);
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
                    Loading applications...
                </p>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="text-center mb-5">

                <h1 className="fw-bold">
                    Manage Applications
                </h1>

                <p className="text-muted">
                    Review applicants and update application status
                </p>

            </div>

            {message && (
                <div className="alert alert-info text-center">
                    {message}
                </div>
            )}

            {applications.length === 0 ? (

                <div className="alert alert-warning text-center">
                    No applications found.
                </div>

            ) : (

                <div className="row g-4">

                    {applications.map((application) => (

                        <div
                            className="col-md-6 col-lg-4"
                            key={application.id}
                        >

                            <div className="card h-100 shadow-sm border-0">

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <h5 className="fw-bold mb-0">
                                            Application #{application.id}
                                        </h5>

                                        <span
                                            className={
                                                application.status === "Selected"
                                                    ? "badge text-bg-success"
                                                    : application.status === "Shortlisted"
                                                        ? "badge text-bg-warning"
                                                        : application.status === "Rejected"
                                                            ? "badge text-bg-danger"
                                                            : "badge text-bg-primary"
                                            }
                                        >
                                            {application.status}
                                        </span>

                                    </div>

                                    <p className="mb-2">
                                        <strong>User ID:</strong>{" "}
                                        {application.userId}
                                    </p>

                                    <p className="mb-3">
                                        <strong>Job ID:</strong>{" "}
                                        {application.jobId}
                                    </p>

                                    <p className="small text-muted">
                                        Applied On:{" "}
                                        {new Date(
                                            application.appliedDate
                                        ).toLocaleString()}
                                    </p>

                                    <hr />

                                    <label className="form-label fw-semibold">
                                        Update Status
                                    </label>

                                    <select
                                        className="form-select"
                                        value={application.status}
                                        onChange={(e) =>
                                            updateStatus(
                                                application.id,
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="Applied">
                                            Applied
                                        </option>

                                        <option value="Shortlisted">
                                            Shortlisted
                                        </option>

                                        <option value="Selected">
                                            Selected
                                        </option>

                                        <option value="Rejected">
                                            Rejected
                                        </option>

                                    </select>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default AdminApplications;