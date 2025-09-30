import { Montserrat } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/app/component/theme/ThemeProvider";
import { StoreProvider } from "./component/StoreProvider";
import { AuthWrapper } from "./component/AuthWrapper";
import { ReactQueryWrapper } from "./component/ReactQueryWrapper";


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


  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${montserrat.variable} antialiased `}

      >
        <div id="fb-root"></div>
        <ThemeProvider defaultTheme="dark">
          <StoreProvider>
            <ReactQueryWrapper>
              <AuthWrapper>
                {children}
              </AuthWrapper>
            </ReactQueryWrapper>
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
