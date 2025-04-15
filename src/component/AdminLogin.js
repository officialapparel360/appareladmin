import React, { useState } from "react";
import "./AdminLogin.css";

const AdminLogin = ({ onLogin }) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isMobileInvalid = () => {
        return mobileNumber.length > 10 && !/^[6-9]\d{9}$/.test(mobileNumber);
    };

    const validateInputs = () => {
        if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
            setError("Enter a valid 10-digit mobile number.");
            return false;
        }
        if (!password.trim()) {
            setError("Password cannot be empty.");
            return false;
        }
        setError("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInputs()) return;
        setLoading(true);

        try {
            const response = await fetch("http://apparels360.in/api/Account/AdminLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    mobileNo: mobileNumber,
                    password: password,
                    roleId: 0,
                    ipAddress: "127.0.0.1",
                }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                localStorage.setItem("adminToken", data.token);
                localStorage.setItem("adminInfo", JSON.stringify(data));
                onLogin(data);
            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Something went wrong. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Admin Login</h2>
                {error && <p className="error-text">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Mobile Number</label>
                        <input
                            type="tel"
                            placeholder="Enter your mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            disabled={loading}
                        />
                        {isMobileInvalid() && (
                            <p className="field-error">Invalid mobile number</p>
                        )}
                    </div>

                    <div className="input-group password-group">
                        <label>Password</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </span>
                        </div>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
