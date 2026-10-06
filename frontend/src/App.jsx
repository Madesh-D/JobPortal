import { useState } from "react";

import Login from "./Login";
import Register from "./Register";
import Jobs from "./Jobs";
import JobDetails from "./JobDetails";
import Myapplication from "./Myapplication";
import AdminJobs from "./AdminJobs";
import Navbar from "./Navbar";
import AdminApplications from "./AdminApplications";

function App() {

    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("user") !== null
    );

    const [page, setPage] = useState("jobs");

    const [authPage, setAuthPage] = useState("login");

    const [selectedJob, setSelectedJob] = useState(null);

    const handleLoginSuccess = () => {
        setLoggedIn(true);
        setPage("jobs");
        setSelectedJob(null);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setLoggedIn(false);
        setAuthPage("login");
        setSelectedJob(null);
    };

    // Apply for a job
    const handleApplyJob = async (jobId) => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            alert("Please login first");
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
                alert("Application submitted successfully!");
            } else {
                alert(data);
            }

        } catch (error) {
            console.error(error);
            alert("Cannot connect to backend");
        }
    };

    // Login / Register
    if (!loggedIn) {

        return (
            <>
                {authPage === "login" ? (
                    <Login
                        onLoginSuccess={handleLoginSuccess}
                    />
                ) : (
                    <Register
                        onRegisterSuccess={() => setAuthPage("login")}
                    />
                )}

                <div className="text-center mt-3 mb-4">

                    {authPage === "login" ? (
                        <p>
                            Don't have an account?{" "}
                            <button
                                className="btn btn-link"
                                onClick={() => setAuthPage("register")}
                            >
                                Register
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button
                                className="btn btn-link"
                                onClick={() => setAuthPage("login")}
                            >
                                Login
                            </button>
                        </p>
                    )}

                </div>
            </>
        );
    }

    // Logged-in application
    return (
        <>
            <Navbar
                setPage={(newPage) => {
                    setPage(newPage);
                    setSelectedJob(null);
                }}
                logout={logout}
            />

            {selectedJob ? (

                <JobDetails
                    job={selectedJob}
                    onBack={() => setSelectedJob(null)}
                    onApply={handleApplyJob}
                />

            ) : (

                <>
                    {page === "jobs" && (
                        <Jobs
                            onViewDetails={(job) => {
                                setSelectedJob(job);
                            }}
                        />
                    )}

                    {page === "applications" && (
                        <Myapplication />
                    )}

                    {page === "admin" && (
                        <AdminJobs />
                    )}

                    {page === "adminApplications" && (
    <AdminApplications/>
)}
                </>

            )}
        </>
    );
}

export default App;