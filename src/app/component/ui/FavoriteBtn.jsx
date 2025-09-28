"use client"
import { UserService } from "@/app/_lib/service/userService";
import { Heart, HeartPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function FavoriteButton({ mediaId, type }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {


        const checkFavoriteStatus = async () => {
            setIsFavorite(false);
            if (!isLoggedIn) return;
            try {
                const data = await UserService.checkFavorite(mediaId, type);
                console.log(data);
                setIsFavorite(data.isFavorite);
            } catch (error) {
                console.log(error);
            }
        };

        checkFavoriteStatus();
    }, [mediaId, type, isLoggedIn]);

    const handleToggle = async () => {
        if (!isLoggedIn) {
            alert("Vui lòng đăng nhập để thêm vào danh sách yêu thích!");
            return;
        }

        if (isLoading) return;
        setIsLoading(true);
        try {
            if (isFavorite) {
                const data = await UserService.removeFavorite(mediaId, type);


                setIsFavorite(data.isFavorite);
            } else {
                const data = await UserService.addFovorite(mediaId, type);
                setIsFavorite(data.isFavorite);
            }
        } catch (error) {
            console.log(error);
            alert("Có lỗi xảy ra. Vui lòng thử lại!");
        } finally {
            setIsLoading(false);
        }



    };

    return (
        <button
            onClick={handleToggle}
            disabled={isLoading}
            className={`
                font-[700] w-fit px-4 py-2 rounded-[4px] flex flex-row gap-2 items-center transition-all
                ${isFavorite
                    ? 'bg-primary hover:bg-primary-hover text-white'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                }
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            {
                isFavorite ? <Heart /> : <HeartPlus />
            }
            <span className="max-md:hidden">
                {isFavorite ? 'Đã lưu' : 'Yêu thích'}
            </span>
        </button>
    );
}