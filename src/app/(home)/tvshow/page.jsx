import { tmdbService } from "@/app/_lib/service/tmdbService";
import { Pagination } from "../../component/ui/Pagination";
import { MovieList } from "../../component/ui/MovieList";


export const metadata = {
    title: "MY MOVIE | TV Show",
    description: "My Movie - stream movie and tv use data from TMDB!",
};

export default async function Page({ searchParams }) {

    const { page = 1 } = await searchParams
    const moviesList = await tmdbService.getTVShow(page)


    return (
        <div className="text-primary flex flex-col items-center  py-16">
            <div className="font-[700] text-3xl text-primary self-start  w-fit text-header py-2 px-8">
                <span>TV Show</span>
            </div>
            <MovieList data={moviesList.data} type={'tv'} />
            <div className="w-fit">
                <Pagination page={moviesList.page} total={moviesList.total} />
            </div>
        </div>
    );
}
