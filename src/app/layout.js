import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./component/theme/ThemeProvider";
import { Header } from "./component/ui/header";
import { tmdbService } from "./_lib/service/tmdbService";
import { Footer } from "./component/ui/footer";

export const montserrat = Montserrat({
  subsets: ['latin'], // Specify required subsets
  variable: '--font-montserrat', // Define a CSS variable for easier use
  weight: ['400', '500', '700'], // Specify desired weights
});

export const metadata = {
  title: "MY MOVIE",
  description: "My Movie - stream movie and tv use data from TMDB!",
};


export default async function RootLayout({ children }) {
  const genres = await tmdbService.getAllGenre()

  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${montserrat.variable} antialiased `}

      >
        <ThemeProvider defaultTheme="dark">
          <div className="relative">
            <Header genres={genres} />
            <div className="min-h-screen">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
