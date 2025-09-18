"use client"

import useMobileDetect from "@/app/utils/hook/useMobile"
import { ChevronsLeft, ChevronsRight } from "lucide-react"
import { useEffect, useRef } from "react"



export const Horizontal = ({ children }) => {

    const divRef = useRef(null)

    const isMoblie = useMobileDetect()

    useEffect(() => {
        if (!divRef.current) return;

        const options = {
            root: divRef.current,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const callback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("scale-80");
                } else {
                    entry.target.classList.add("scale-80");
                }
            });
        };

        const observer = new IntersectionObserver(callback, options);

        const items = divRef.current.querySelectorAll(".card");
        items.forEach((item) => observer.observe(item));

        return () => {
            observer.disconnect();
        };
    }, []);

    const handleClickScrollPre = () => {
        if (divRef.current) {
            const start = divRef.current.scrollLeft;
            const end = start - 432;
            const duration = 500;
            let startTime = null;

            const animateScroll = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                const easing = 0.5 * (1 - Math.cos(Math.PI * percentage));

                divRef.current.scrollLeft = start + (end - start) * easing;

                if (percentage < 1) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        }
    };

    const handleClickScrollNext = () => {
        if (divRef.current) {
            const start = divRef.current.scrollLeft;
            const end = start + 432;
            const duration = 500;
            let startTime = null;

            const animateScroll = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                const easing = 0.5 * (1 - Math.cos(Math.PI * percentage));

                divRef.current.scrollLeft = start + (end - start) * easing;

                if (percentage < 1) {
                    requestAnimationFrame(animateScroll);
                }
            };

            requestAnimationFrame(animateScroll);
        }
    };

    return (
        isMoblie ?

            <div className="overflow-x-auto scrollbar-hide" ref={divRef}>
                {children}
            </div>

            :
            <div className="relative">
                <div className="absolute top-[calc(50%-75px)] left-[5px] h-[50px] w-[50px] bg-primary z-10 rounded-[50%] text-[white] flex justify-center items-center cursor-pointer hover:scale-110 transition-all"
                    onClick={handleClickScrollPre}
                >
                    <ChevronsLeft />
                </div>
                <div className="overflow-x-hidden" ref={divRef}>
                    {children}
                </div>
                <div className="absolute top-[calc(50%-75px)] right-[-5px] h-[50px] w-[50px] bg-primary z-10 rounded-[50%] text-[white] flex justify-center items-center cursor-pointer hover:scale-110 transition-all"
                    onClick={handleClickScrollNext}
                >
                    <ChevronsRight />
                </div>
            </div>



    )

}