import { tmdbService } from "@/app/_lib/service/tmdbService"
import { Card } from "./Card";

export const Movie = async () => {

    const movieList = await tmdbService.getMovie()
    console.log(movieList.data);

    return (
        <section className="w-full  text-body">
            <div className="font-[700] text-xl">
                Phim Điện Ảnh:
            </div>
            <div className="list-card flex flex-row gap-4 overflow-x-hidden w-full items-center p-8">
                {movieList.data.map((movie, index) => {
                    return (
                        <Card key={index} data={movie} />
                    )
                })}
            </div>
        </section>
    )
}