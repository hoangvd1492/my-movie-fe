import { Play } from "lucide-react"
import Link from "next/link"

export const Card = ({ data }) => {
    return (
        <Link href={`/movie/${data.id}`}>
            <div className="card flex flex-col flex-none gap-4  justify-start rounded-[4px] w-[200px] h-[400px] select-none scale-80 max-lg:scale-100 transition-all max-lg:h-[150px]">
                <div className="group rounded-[4px] h-[300px] w-full relative  hover:shadow-[0_0_10px_0_rgba(0,0,0,0.3)] shadow-primary max-lg:h-[100px]">
                    <img draggable={false} className="absolute top-0 left-0 h-full w-full object-cover cursor-pointer rounded-[4px]" src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} alt={data.title} />
                    <div className="group-hover:visible invisible backdrop-blur-xs  absolute top-0 left-0 h-full w-full rounded-[4px] flex justify-center items-center">
                        <div className="text-xxl">
                            <Play size={50} />
                        </div>
                    </div>

                </div>
                <div className="text-center text-sm font-[500]">
                    {data.title || data.name}
                </div>
            </div>
        </Link>
    )
}