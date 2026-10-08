import { useState } from "react";

import Login from "./Login";
import Register from "./Register";
import Jobs from "./Jobs";
import JobDetails from "./JobDetails";
import Myapplication from "./Myapplication";
import AdminJobs from "./AdminJobs";
import AdminApplications from "./AdminApplications";
import Navbar from "./Navbar";

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
                "https://job-portal-rho-jade.vercel.app/applications",
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

    if (!loggedIn) {

        if (authPage === "login") {

            return (
                <Login
                    onLoginSuccess={handleLoginSuccess}
                    onRegister={() => setAuthPage("register")}
                />
            );

        } else {

            return (
                <Register
                    onRegisterSuccess={() => setAuthPage("login")}
                />
            );
        }
    }

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
                        <AdminApplications />
                    )}
                </>

            )}
        </>
    );
}

export default App;
