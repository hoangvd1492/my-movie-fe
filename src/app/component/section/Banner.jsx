import { tmdbService } from "@/app/_lib/service/tmdbService"
import { Card } from "../ui/Card";
import { Horizontal } from "../ui/Horizontal";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Carousel } from "../ui/Carousel";

export const Banner = async () => {

    const movieList = await tmdbService.getPopularMovie()

    const newestMovies = movieList.data.slice(0, 5)


    if (!newestMovies.length) return null

    const detailsMovies = await Promise.all(
        newestMovies.map((movie) => tmdbService.getDetailMovie(movie.id))
    );


    return (
        <section className="w-full  text-body" id="banner">
            <Carousel data={detailsMovies} />
        </section>
    )
}