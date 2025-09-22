import { Anime } from "../component/section/Anime";
import { AnimeShow } from "../component/section/AnimeShow";
import { Banner } from "../component/section/Banner";
import { Movie } from "../component/section/Movie";
import { TVShow } from "@/app/component/section/TvShow";

export const metadata = {
  title: "MY MOVIE | Trang Chủ",
  description: "My Movie - stream movie and tv use data from TMDB!",
};
export default function Home() {

  return (
    <div className="flex flex-col gap-4 ">
      <Banner />
      <div className="py-16 px-8 max-lg:px-2 text-primary">
        <Movie />
        <TVShow />
        <Anime />
        <AnimeShow />
      </div>
    </div>
  );
}
