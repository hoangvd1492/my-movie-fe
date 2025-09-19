import { tmdbService } from "@/app/_lib/service/tmdbService"
import { Card } from "../ui/Card";
import { Horizontal } from "../ui/Horizontal";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const Banner = async () => {

    const movieList = await tmdbService.getMovie()

    const newestMovie = movieList.data[0]


    if (!newestMovie) return null

    console.log(newestMovie);


    return (
        <section className="w-full  text-body" id="banner">

        </section>
    )
}