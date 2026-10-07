import { useState } from "react";

function Register({ onRegisterSuccess }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const user = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        try {

            const response = await fetch(
                "http://localhost:8080/users/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                }
            );

            const data = await response.text();

            if (response.ok) {
    setMessage("Registration successful!");

    setName("");
    setEmail("");
    setPhone("");
    setPassword("");

    setTimeout(() => {
        onRegisterSuccess();
    }, 1000);
} else {
    setMessage(data);
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

                    <div className="col-12 col-sm-10 col-md-8 col-lg-5">

                        <div className="card shadow border-0">

                            <div className="card-body p-4 p-md-5">

                                <div className="text-center mb-4">

                                    <h1 className="fw-bold text-primary">
                                        JobPortal
                                    </h1>

                                    <p className="text-muted">
                                        Create your account
                                    </p>

                                </div>

                                <form onSubmit={handleRegister}>

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            required
                                        />

                                    </div>

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
                                            Phone Number
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter 10 digit phone number"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(e.target.value)
                                            }
                                            required
                                        />

                                    </div>

                                    <div className="mb-4">

                                        <label className="form-label">
                                            Password
                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Create a password"
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
                                        Create Account
                                    </button>

                                </form>

                                {message && (
                                    <div className="alert alert-info text-center mt-4 mb-0">
                                        {message}
                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;