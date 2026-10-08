import { useEffect, useState } from "react";

function Myapplication() {

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            setError("Please login first");
            setLoading(false);
            return;
        }

        const user = JSON.parse(storedUser);

        fetch(`https://jobportal-production-5280.up.railway.app/applications/user/${user.id}`)
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
                setError("Cannot connect to backend");
                setLoading(false);
            });

    }, []);

    const getStatusClass = (status) => {

        if (status === "Selected") {
            return "badge text-bg-success";
        }

        if (status === "Shortlisted") {
            return "badge text-bg-warning";
        }

        if (status === "Rejected") {
            return "badge text-bg-danger";
        }

        return "badge text-bg-primary";
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" role="status"></div>
                <p className="mt-2">Loading applications...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger text-center">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="text-center mb-5">
                <h1 className="fw-bold">My Applications</h1>
                <p className="text-muted">
                    Track the jobs you have applied for
                </p>
            </div>

            {applications.length === 0 ? (

                <div className="alert alert-info text-center">
                    You have not applied for any jobs yet.
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

                                    <div className="d-flex justify-content-between align-items-start mb-3">

                                        <div>
                                            <h4 className="fw-bold mb-1">
                                                {application.title}
                                            </h4>

                                            <p className="text-muted mb-0">
                                                {application.company}
                                            </p>
                                        </div>

                                        <span
                                            className={getStatusClass(
                                                application.status
                                            )}
                                        >
                                            {application.status}
                                        </span>

                                    </div>

                                    <p className="mb-2">
                                        <strong>Location:</strong>{" "}
                                        {application.location}
                                    </p>

                                    <p className="mb-2">
                                        <strong>Skills:</strong>{" "}
                                        {application.skills}
                                    </p>

                                    <p className="mb-3">
                                        <strong>Salary:</strong>{" "}
                                        ₹{Number(application.salary).toLocaleString("en-IN")}
                                    </p>

                                    <div className="border-top pt-3">

                                        <p className="small text-muted mb-1">
                                            <strong>Applied On:</strong>{" "}
                                            {new Date(
                                                application.appliedDate
                                            ).toLocaleString()}
                                        </p>

                                        <p className="small text-muted mb-0">
                                            Application ID:{" "}
                                            {application.id}
                                        </p>

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

export default Myapplication;