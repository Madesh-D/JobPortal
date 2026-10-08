import { useState } from "react";

function Login({ onLoginSuccess, onRegister }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            password: password
        };

        try {

            const response = await fetch(
                "https://jobportal-production-5280.up.railway.app/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginData)
                }
            );

            if (response.ok) {

                const data = await response.json();

                localStorage.setItem(
                    "user",
                    JSON.stringify(data)
                );

                setMessage("Login successful!");

                onLoginSuccess();

            } else {

                const errorMessage = await response.text();

                setMessage(errorMessage);
            }

        } catch (error) {

            console.error(error);
            setMessage("Cannot connect to backend");
        }
    };

    return (
        <div className="min-vh-100 bg-light d-flex align-items-center">

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-sm-10 col-md-7 col-lg-5">

                        <div className="card shadow border-0">

                            <div className="card-body p-4 p-md-5">

                                <div className="text-center mb-4">

                                    <h1 className="fw-bold text-primary">
                                        JobPortal
                                    </h1>

                                    <p className="text-muted">
                                        Login to your account
                                    </p>

                                </div>

                                <form onSubmit={handleLogin}>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Email Address
                                        </label>

                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            required
                                        />

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        Login
                                    </button>

                                </form>

                                {message && (
                                    <div className="alert alert-info text-center mt-3 mb-0">
                                        {message}
                                    </div>
                                )}

                                <div className="text-center mt-3">
                                    <p className="mb-0">
                                        Don't have an account?{" "}
                                        <button
                                            type="button"
                                            className="btn btn-link p-0"
                                            onClick={onRegister}
                                        >
                                            Register
                                        </button>
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
