"use client"

import { Clapperboard, Clock, Sparkles, Video } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export const Carousel = ({ data }) => {

    const timeId = useRef(null)
    const [index, setIndex] = useState(0)
    const slider = useRef(null)

    const start = useRef(null)
    const end = useRef(null)

    useEffect(() => {
        timeId.current = setInterval(() => {
            setIndex(i => i === data.length - 1 ? 0 : i + 1)
        }, 5000)

        return () => {
            clearInterval(timeId.current)
        }
    }, [])

    useEffect(() => {
        if (slider.current) {
            const width = slider.current.offsetWidth;
            const start = slider.current.scrollLeft;
            const end = index * width;
            const duration = 1000;
            let startTime = null;

            const animateScroll = (timestamp) => {
                if (!slider.current) {
                    return;
                }
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                const easing = 0.5 * (1 - Math.cos(Math.PI * percentage));
                slider.current.scrollLeft = start + (end - start) * easing;

                if (percentage < 1) {
                    requestAnimationFrame(animateScroll);
                }
            };
            requestAnimationFrame(animateScroll);
        }
    }, [index])


    useEffect(() => {
        const onResize = () => {
            if (slider.current) {
                const width = slider.current.offsetWidth;
                slider.current.scrollLeft = index * width
            }
        }
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [index])

    useEffect(() => {
        let isDown = false

        const handleStart = (x) => {
            start.current = x
            end.current = x
            isDown = true
        }

        const handleMove = (x) => {
            if (!isDown) return
            end.current = x
        }

        const handleEnd = () => {
            if (!isDown) return
            const delta = end.current - start.current
            if (delta < -100) {
                // Next
                setIndex(i => (i === data.length - 1 ? i : i + 1))
            } else if (delta > 100) {
                // Prev
                setIndex(i => (i === 0 ? i : i - 1))
            }
            isDown = false
        }

        const sliderEl = slider.current
        if (sliderEl) {
            // PC
            sliderEl.addEventListener("mousedown", e => handleStart(e.clientX))
            sliderEl.addEventListener("mousemove", e => handleMove(e.clientX))
            sliderEl.addEventListener("mouseup", handleEnd)
            sliderEl.addEventListener("mouseleave", handleEnd)

            // Mobile
            sliderEl.addEventListener("touchstart", e => handleStart(e.touches[0].clientX))
            sliderEl.addEventListener("touchmove", e => handleMove(e.touches[0].clientX))
            sliderEl.addEventListener("touchend", handleEnd)
        }

        return () => {
            if (sliderEl) {
                sliderEl.removeEventListener("mousedown", e => handleStart(e.clientX))
                sliderEl.removeEventListener("mousemove", e => handleMove(e.clientX))
                sliderEl.removeEventListener("mouseup", handleEnd)
                sliderEl.removeEventListener("mouseleave", handleEnd)

                sliderEl.removeEventListener("touchstart", e => handleStart(e.touches[0].clientX))
                sliderEl.removeEventListener("touchmove", e => handleMove(e.touches[0].clientX))
                sliderEl.removeEventListener("touchend", handleEnd)
            }
        }
    }, [])




    return (

        <div className="h-[80vh] w-full  max-lg:h-[75vh] relative">
            <div className="absolute bottom-[5%] right-[5%] z-10 flex flex-row gap-4 cursor-pointer">
                {
                    data.map((movie, i) => {
                        return (
                            <div key={i} className={`h-3 w-3 ${index === i ? 'bg-primary' : 'bg-[#3f3f3f]'} rounded-[50%] hover:scale-110`}> </div>
                        )
                    })
                }
            </div>
            <div className="h-full w-full flex flex-row overflow-x-hidden" ref={slider}>
                {
                    data.map((movie, i) => {
                        return (
                            movie ? <div key={i} className="w-full h-full relative flex-shrink-0">
                                <img draggable={false} className="absolute top-0 left-0 h-full w-full object-cover" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie?.name} />
                                <div className="absolute left-[10%] text-[white] bottom-[10%] bg-primary/80 z-10 p-4 rounded-[8px] max-w-[500px] max-md:max-w-[300px]  select-none">
                                    <div className="text-xl font-[700] ">
                                        {movie.title}
                                    </div>
                                    <div className="py-4 flex flex-col gap-1">
                                        <div className="text-base font-[500] flex flex-row gap-2 items-center">
                                            <Video size={16} /> <span>{movie.production_companies[0].name}</span>
                                        </div>
                                        <div className="text-sm font-[500] flex flex-row gap-2 items-center">
                                            <Clapperboard size={16} /> <span>{movie.genres.map(g => g.name).join(', ')}</span>
                                        </div>
                                        <div className="text-sm font-[500] flex flex-row gap-2 items-center">
                                            <Clock size={16} /> <span>{Math.floor(movie.runtime / 60)}h {movie.runtime - Math.floor(movie.runtime / 60) * 60}m</span>
                                            <Sparkles size={16} /> <span>{Math.floor(movie.vote_average * 10)}%</span>
                                        </div>
                                        <div className="overview text-sm font-[500]">
                                            {movie.overview}
                                        </div>
                                        <Link href={`/movie/${movie.id}`}>
                                            <div className="font-[700] w-fit bg-primary hover:bg-primary-hover transition-all px-4 py-2 rounded-[4px]">
                                                Xem ngay
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div> : <div key={i} className="w-full h-full relative flex-shrink-0"></div>
                        )
                    })
                }
            </div>
        </div >
    )
}