
import { tmdbService } from "@/app/_lib/service/tmdbService";
import { Pagination } from "@/app/component/ui/Pagination";
import { MovieList } from "@/app/component/ui/MovieList";




export default async function Page({ params, searchParams }) {

    const { id = 0 } = await params
    const { page = 1 } = await searchParams

    const genres = await tmdbService.getAllGenre()

    const existsGenres = genres.find((g) => g.id === Number(id))

    if (!existsGenres) {
        return (<div className="text-3xl text-primary font-[700] text-center">
            Không tìm thấy.
        </div>)
    }

    const moviesList = await tmdbService.getMovieByGenres(page, id)


    if (!moviesList.data.length) {
        return (<div className="text-3xl text-primary font-[700] text-center">
            Không tìm thấy.
        </div>)
    }

    console.log(moviesList);


    return (
        <div className="text-primary flex flex-col items-center  py-16">
            <div className="font-[700] text-3xl text-primary self-start  w-fit text-header py-2 px-8">
                <span>Genre: {existsGenres.name}</span>
            </div>
            <MovieList data={moviesList.data} type={'movie'} />
            <div className="w-fit">
                <Pagination page={moviesList.page} total={moviesList.total} />
            </div>
        </div>
    );
}
