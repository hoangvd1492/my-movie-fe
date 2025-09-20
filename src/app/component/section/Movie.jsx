import { tmdbService } from "@/app/_lib/service/tmdbService"
import { Card } from "../ui/Card";
import { Horizontal } from "../ui/Horizontal";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const Movie = async () => {

    const movieList = await tmdbService.getMovie()
    return (
        <section className="w-full  text-body" id="movie">
            <Link href={`/movies`}>
                <div className="font-[700] text-xl flex flex-row gap-2 items-center bg-primary w-fit text-[white] py-2 px-4 rounded-[4px] cursor-pointer hover:shadow-[0_0_10px_0_rgba(0,0,0,0.3)] shadow-primary">
                    <span>Phim Điện Ảnh</span><ChevronRight />
                </div>
            </Link>

            <Horizontal>
                <div className="flex flex-row gap-8 max-lg:gap-4 w-full items-center p-8">
                    {movieList.data.map((movie, index) => {
                        return (
                            <Card key={index} data={movie} />
                        )
                    })}
                </div>
            </Horizontal>
        </section>
    )
}