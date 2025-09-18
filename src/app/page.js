import { Anime } from "./component/ui/Anime";
import { AnimeShow } from "./component/ui/AnimeShow";
import { Movie } from "./component/ui/Movie";
import { TVShow } from "./component/ui/TvShow";

export default function Home() {

  return (
    <div>
      <Movie />
      <TVShow />
      <Anime />
      <AnimeShow />
    </div>
  );
}
