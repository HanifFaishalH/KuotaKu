import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const theme = {
        colors: {
            primary: "#7F00FF",    // Electric Purple
            secondary: "#00F0FF",  // Bright Cyan
            accent: "#39FF14",     // Neon Green
            background: "#F5F5F5", // Light Gray
            text: "#333333"        // Dark Gray
        }
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
