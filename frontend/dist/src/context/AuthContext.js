import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children, }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const login = (user) => {
        setIsAuthenticated(true);
        setUser(user);
    };
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };
    return (_jsx(AuthContext.Provider, { value: { isAuthenticated, user, login, logout }, children: children }));
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
//# sourceMappingURL=AuthContext.js.map