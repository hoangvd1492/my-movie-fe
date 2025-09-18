import { tmdbService } from "@/app/_lib/service/tmdbService"
import { Card } from "./Card";
import { Horizontal } from "./Horizontal";

export const AnimeShow = async () => {

    const movieList = await tmdbService.getAnimeTVShow()
    return (
        <section className="w-full  text-body" id="anime-show">
            <div className="font-[700] text-xl">
                Anime Show:
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