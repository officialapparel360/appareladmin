import React, { useState } from "react";
import AdminLogin from "./component/AdminLogin";
import AdminPanel from "./component/AdminPanel";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <div>
            {isAuthenticated ? (
                <AdminPanel onLogout={handleLogout} />
            ) : (
                <AdminLogin onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
