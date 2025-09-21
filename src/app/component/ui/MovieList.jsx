import { Card } from "./Card"

/**
 * Use for page /movie /tvshow... 
*/
export const MovieList = async ({ data, type = '' }) => {
    return (
        <div className="flex flex-wrap items-center w-fit">
            {data.map((movie, index) => {
                return (
                    <Card key={index} data={movie} type={movie.media_type ?? type} />
                )
            })}
        </div>
    )
}