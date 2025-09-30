import { tmdbService } from "@/app/_lib/service/tmdbService"
import { Card } from "../ui/Card";
import { Horizontal } from "../ui/Horizontal";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const AnimeShow = async () => {

    const movieList = await tmdbService.getAnimeTVShow()
    return (
        <section className="w-full text-body" id="anime-show">
            <Link href={`/animeshow`}>
                <div className="font-[700] text-xl flex flex-row gap-2 items-center bg-primary w-fit text-[white] py-2 px-4 rounded-[4px] cursor-pointer hover:shadow-[0_0_10px_0_rgba(0,0,0,0.3)] shadow-primary">
                    <span>Anime Show</span><ChevronRight />
                </div>
            </Link>

            <Horizontal>
                <div className="flex flex-row w-full items-start px-2 py-8 gap-4 max-sm:gap-0">
                    {movieList.data.map((movie, index) => {
                        return (
                            <Card key={index} data={movie} type={'tv'} />
                        )
                    })}
                </div>
            </Horizontal>
        </section>
    )
}