import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const ThemeContext = createContext(undefined);
export const ThemeProvider = ({ children, }) => {
    const [theme, setTheme] = useState("light");
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (_jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children: children }));
};
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
//# sourceMappingURL=ThemeContext.js.map