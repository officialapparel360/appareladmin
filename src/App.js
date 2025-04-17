import React, { useState } from "react";
import AdminLogin from "./component/js-file/AdminLogin";
import AdminPanel from "./component/js-file/AdminPanel";

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
