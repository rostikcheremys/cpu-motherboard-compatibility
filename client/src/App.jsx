import { useState, useMemo } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

import { Home } from "./components/Home/Home.jsx";

import { EditDatabase } from './components/Admin/EditDatabase.jsx';

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
                        path="/admin/edit-database"
                        element={<EditDatabase darkMode={darkMode} setDarkMode={setDarkMode} />}
                    />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}