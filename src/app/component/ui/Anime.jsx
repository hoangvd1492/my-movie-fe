import { tmdbService } from "@/app/_lib/service/tmdbService"
import { Card } from "./Card";
import { Horizontal } from "./Horizontal";

export const Anime = async () => {

    const movieList = await tmdbService.getAnimeMovie()
    return (
        <section className="w-full  text-body" id="anime">
            <div className="font-[700] text-xl">
                Anime:
            </div>
            <Horizontal>
                <div className="flex flex-row gap-4 w-full items-center p-8">
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