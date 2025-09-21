import { Card } from "./Card"

/**
 * Use for page /movie /tvshow... 
*/
export const MovieList = async ({ data, type = '' }) => {
    return (
        <div className="grid  grid-cols-(--auto-fit) gap-4 max-lg:gap-1 w-full  p-8">
            {data.map((movie, index) => {
                return (
                    <Card key={index} data={movie} type={movie.media_type ?? type} />
                )
            })}
        </div>
    )
}