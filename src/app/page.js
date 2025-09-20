import { Anime } from "./component/section/Anime";
import { AnimeShow } from "./component/section/AnimeShow";
import { Banner } from "./component/section/Banner";
import { Movie } from "./component/section/Movie";
import { TVShow } from "./component/section/TvShow";

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
