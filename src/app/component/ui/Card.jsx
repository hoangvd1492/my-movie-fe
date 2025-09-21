import { Play } from "lucide-react"
import Link from "next/link"

export const Card = ({ data, type }) => {

    return (

        <div className={`card flex-none gap-4 p-4  rounded-[4px] h-fit select-none transition-all w-[16%] max-lg:w-[25%] max-sm:w-[50%] `}>
            <Link href={`/${type}/${data.id}`} >
                <div className="flex flex-col  gap-4">
                    <div className={`group relative  rounded-[4px] h-[256px]  w-full  hover:shadow-[0_0_10px_0_rgba(0,0,0,0.3)] shadow-primary   max-lg:shadow-[0_0_5px_0_rgba(0,0,0,0.3)]`}>
                        <img draggable={false} className={` h-[256px]  w-full object-cover cursor-pointer rounded-[4px]`}
                            src={`https://image.tmdb.org/t/p/original${data.backdrop_path || data.poster_path}`}
                            alt={data.title} />
                        <div className="group-hover:visible invisible backdrop-blur-xs  absolute top-0 left-0 h-[256px]  w-full rounded-[4px] flex justify-center items-center">
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

        </div>

    )
}