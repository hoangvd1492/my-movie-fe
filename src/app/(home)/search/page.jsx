
import { tmdbService } from "@/app/_lib/service/tmdbService";
import { Pagination } from "@/app/component/ui/Pagination";
import { MovieList } from "@/app/component/ui/MovieList";




export default async function Page({ searchParams }) {

    const { page = 1, q } = await searchParams



    const moviesList = await tmdbService.search(page, q)


    if (!moviesList.data.length) {
        return (<div className="text-3xl text-primary font-[700] text-center">
            Không tìm thấy.
        </div>)
    }

    console.log(moviesList);


    return (
        <div className="text-primary flex flex-col items-center  py-16">
            <div className="font-[700] text-3xl text-primary self-start  w-fit text-header py-2 ">
                <span>Kết quả cho: {q}</span>
            </div>
            <MovieList data={moviesList.data} />
            <div className="w-fit">
                <Pagination page={moviesList.page} total={moviesList.total} />
            </div>
        </div>
    );
}
