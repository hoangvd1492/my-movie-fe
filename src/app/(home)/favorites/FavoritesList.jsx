"use client"

import { tmdbService } from "@/app/_lib/service/tmdbService";
import { UserService } from "@/app/_lib/service/userService";
import { Card } from "@/app/component/ui/Card";
import { Pagination } from "@/app/component/ui/Pagination";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

export const FavoritesList = () => {
    const searchParams = useSearchParams()
    const page = searchParams.get('page') || 1

    const { isLoggedIn } = useSelector((state) => state.auth);

    const [movies, setMovies] = useState([])
    const [pagination, setPagination] = useState({ page: 0, total: 0 })
    const [isLoading, setIsLoading] = useState(true)

    const fetchFavorites = async (page) => {
        if (!isLoggedIn) return;

        setIsLoading(true);

        try {
            const res = await UserService.fetchFavorites(page);
            if (!res.data || res.data.length === 0) {
                setMovies([]);
                setPagination({ page: res.page || page, total: res.total || 0 });
                return;
            }
            const detailPromises = res.data.map(async (item) => {
                const detail = item.type === 'tv'
                    ? await tmdbService.getDetailTv(item.mediaId)
                    : await tmdbService.getDetailMovie(item.mediaId);
                return {
                    ...detail,
                    media_type: item.type
                };

            });

            let moviesDetail = await Promise.all(detailPromises);
            moviesDetail = moviesDetail.filter(item => item !== null)

            setMovies([...moviesDetail]);
            setPagination({ page: res.page || page, total: res.total || 0 });

        } catch (error) {
            console.error('Error fetching favorites:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchFavorites(page);
    }, [page, isLoggedIn]);


    if (!isLoggedIn) {
        return (
            <div className="text-3xl text-primary font-[700] text-center py-16">
                Vui lòng đăng nhập để xem danh sách yêu thích.
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex flex-col items-center w-full gap-8">
                <div className="font-[700] text-3xl text-primary self-start w-fit text-header py-2 px-8">
                    <span>Phim yêu thích</span>
                </div>
                <div className="flex justify-center items-center py-16">
                    <div className="text-xl text-primary">Đang tải...</div>
                </div>
            </div>
        );
    }





    if (movies.length === 0) {
        return (
            <div className="flex flex-col items-center w-full gap-8">
                <div className="flex flex-col items-center py-16 gap-4">
                    <div className="text-xl text-primary">Danh sách yêu thích của bạn đang trống</div>
                    <div className="text-base text-gray-500">Hãy thêm một số phim hoặc chương trình yêu thích!</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center w-full gap-8">
            <div className="font-[700] text-3xl text-primary self-start w-fit text-header py-2 px-8">
                <span>Phim yêu thích</span>
            </div>

            <div className="flex flex-wrap items-start w-full gap-y-8">
                {movies.map((movie, index) => (
                    <Card
                        key={movie.favoriteId || `${movie.id}-${index}`}
                        data={movie}
                        type={movie.media_type}
                        // Có thể thêm callback để remove favorite
                        onRemoveFavorite={() => {
                            // Handle remove favorite và refresh list
                            fetchFavorites(page);
                        }}
                    />
                ))}
            </div>


            <div className="w-fit">
                <Pagination page={Number(pagination.page)} total={pagination.total} />
            </div>

        </div>
    );
}