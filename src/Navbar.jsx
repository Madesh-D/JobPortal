function Navbar({ setPage, logout }) {

    const storedUser = localStorage.getItem("user");

    const user = storedUser
        ? JSON.parse(storedUser)
        : null;

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

            <div className="container">

                <button
                    className="navbar-brand fw-bold btn btn-link text-white text-decoration-none"
                    onClick={() => setPage("jobs")}
                >
                    JobPortal
                </button>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarNav"
                >

                    <ul className="navbar-nav ms-auto align-items-lg-center">

                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link"
                                onClick={() => setPage("jobs")}
                            >
                                Jobs
                            </button>
                        </li>

                        <li className="nav-item">
                            <button
                                className="nav-link btn btn-link"
                                onClick={() => setPage("applications")}
                            >
                                My Applications
                            </button>
                        </li>

                        {user && user.role === "ADMIN" && (
    <>
        <li className="nav-item">
            <button
                className="nav-link btn btn-link"
                onClick={() => setPage("admin")}
            >
                Manage Jobs
            </button>
        </li>

        <li className="nav-item">
            <button
                className="nav-link btn btn-link"
                onClick={() => setPage("adminApplications")}
            >
                Manage Applications
            </button>
        </li>
    </>
)}

                        {user && (
                            <li className="nav-item">
                                <span className="nav-link text-light">
                                    Hello, {user.name}
                                </span>
                            </li>
                        )}

                        <li className="nav-item ms-lg-2">
                            <button
                                className="btn btn-outline-light btn-sm px-3"
                                onClick={logout}
                            >
                                Logout
                            </button>
                        </li>

                    </ul>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;