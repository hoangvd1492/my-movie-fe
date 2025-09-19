"use client";
import { useState, useEffect } from "react";

const useMobileDetect = () => {
    const [isMoblie, setIsMobile] = useState(false);

    useEffect(() => {
        const detect = () => {
            const width = window.innerWidth;

            if (width < 1025) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        detect();
        window.addEventListener("resize", detect);

        return () => window.removeEventListener("resize", detect);
    }, []);

    return isMoblie;
};

export default useMobileDetect;
