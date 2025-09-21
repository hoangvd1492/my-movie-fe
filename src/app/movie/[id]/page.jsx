
import { tmdbService } from "@/app/_lib/service/tmdbService";
import { Player } from "@/app/component/ui/player";
import { Clapperboard, Clock, PlayIcon, Popcorn, Sparkles, Video } from "lucide-react";
import Link from "next/link";




export default async function Page({ params }) {

    const { id = 0 } = await params

    const movieDetail = await tmdbService.getDetailMovie(id)


    if (!movieDetail) {
        return (<div className="text-3xl text-primary font-[700] text-center">
            Không tìm thấy.
        </div>)
    }

    const trailerKey = await tmdbService.getTrailer(id, 'movie')

    const { thumbnail, logo } = await tmdbService.getThumbnail(id, 'movie')

    const cast = movieDetail.credits.cast.slice(0, 10)



    return (
        <div className="relative h-fit w-full  text-primary py-32" >
            <div
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${thumbnail})`
                }}
                className="absolute inset-0 bg-cover bg-center mask-b-from-20% mask-b-to-90% z-9 h-screen"
            ></div>
            <div className="relative z-10  px-8 max-lg:px-2">
                <div className="py-4 flex flex-col gap-1  w-1/2 min-w-[300px]">
                    <div className="text-3xl font-[700] mb-8 ">
                        {movieDetail.tagline}
                    </div>
                    <div className=" text-xl font-[500] flex flex-row gap-2 items-center">
                        <Video size={16} /> <span>{movieDetail.production_companies[0].name.toUpperCase()}</span>
                    </div>
                    <div className="text-xl font-[500] flex flex-row gap-2 items-center">
                        <Clapperboard size={16} /> <span>{movieDetail.genres.map(g => g.name).join(', ')}</span>
                    </div>
                    <div className=" text-xl font-[500] flex flex-row gap-2 items-center">
                        <Clock size={16} /> <span>{Math.floor(movieDetail.runtime / 60)}h {movieDetail.runtime - Math.floor(movieDetail.runtime / 60) * 60}m</span>
                        <Sparkles size={16} /> <span>{Math.floor(movieDetail.vote_average * 10)}%</span>
                    </div>
                    <div className="text-base font-[500]">
                        {movieDetail.overview}
                    </div>

                    <div className="flex flex-row gap-4 items-center text-[white]">
                        <div
                            style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original${logo})`
                            }}
                            className="h-48 w-48 bg-contain bg-center bg-no-repeat"
                        ></div>

                        <Link href={`#player`}>
                            <div className="font-[700] w-fit bg-primary hover:bg-primary-hover transition-all px-4 py-2 rounded-[4px] flex flex-row gap-2">
                                <PlayIcon /> <span className="max-md:hidden">Xem ngay</span>
                            </div>
                        </Link>
                        {trailerKey && <Link href={`https://www.youtube.com/watch?v=${trailerKey}`} target="_blank" rel="noopener noreferrer">
                            <div className="font-[700] w-fit bg-primary hover:bg-primary-hover transition-all px-4 py-2 rounded-[4px] flex flex-row gap-2">
                                <Popcorn />   <span className="max-xl:hidden" >Xem Trailer</span>
                            </div>
                        </Link>}
                    </div>
                </div>
            </div>
            <div id="player" className="w-full px-8 max-lg:px-2 my-32">
                <Player embedUrl={`https://multiembed.mov/?video_id=${encodeURIComponent(id)}&tmdb=1`} />
            </div>

            {
                cast.length ? <div className="px-8 max-lg:px-2 text-primary flex flex-col gap-4">
                    <div className="text-xl font-[700]">Diễn viên/Lồng tiếng:</div>
                    <div className="flex flex-wrap">
                        {
                            cast.map((actor, i) => {
                                return (
                                    <div key={i} className="p-2 h-fit w-32 flex flex-col items-center gap-1 ">
                                        <img className="rounded-[4px] w-full " src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt={actor.original_name} />

                                        <div className="text-base text-center">
                                            {actor.name}
                                        </div>
                                        <div className="text-[12px] font-[700] text-center">
                                            ( {actor.character})
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div> : null
            }
        </div>
    );
}
