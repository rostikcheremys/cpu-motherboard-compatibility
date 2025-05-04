import "./Footer.css";

import React from "react";
import { GitHub } from "@mui/icons-material";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <a className="footer__github" href="https://github.com/rostikcheremys/cpu-motherboard-compatibility">
                    <GitHub className="github-icon"/> GitHub
                </a>
                <p className="footer__developer">&copy; 2025 Rostyslav Cheremys</p>
            </div>
        </footer>
    );
}
