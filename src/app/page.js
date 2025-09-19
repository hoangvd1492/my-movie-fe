import { Anime } from "./component/section/Anime";
import { AnimeShow } from "./component/section/AnimeShow";
import { Banner } from "./component/section/Banner";
import { Movie } from "./component/section/Movie";
import { TVShow } from "./component/section/TvShow";

export default function Home() {

  return (
    <div className="flex flex-col gap-4">
      <Banner />
      <Movie />
      <TVShow />
      <Anime />
      <AnimeShow />
    </div>
  );
}
