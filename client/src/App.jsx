import { useState, useMemo } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { Home } from "./pages/Home/Home.jsx";
import { EditDB } from './pages/EditDB/EditDB.jsx';

export default function App() {
    const [darkMode, setDarkMode] = useState(false);

    const theme = useMemo(() =>
        createTheme({
            palette: {
                mode: darkMode ? 'dark' : 'light',
            },
        }), [darkMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
                    />
                    <Route
                        path="/edit-database"
                        element={<EditDB darkMode={darkMode} setDarkMode={setDarkMode} />}
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}