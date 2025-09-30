
import { Header } from "../component/ui/header";
import { tmdbService } from "@/app/_lib/service/tmdbService";
import { Footer } from "../component/ui/footer";
import ChatBot from "../component/ui/ChatBot";



export const metadata = {
  title: "MY MOVIE",
  description: "My Movie - stream movie and tv use data from TMDB!",
};


export default async function RootLayout({ children }) {
  const genres = await tmdbService.getAllGenre()

  return (
    <div className="relative">
      <Header genres={genres} />
      <div className="min-h-screen">
        {children}
      </div>
      <ChatBot />
      <Footer />
    </div>
  );
}
