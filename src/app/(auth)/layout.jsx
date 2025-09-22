

export const metadata = {
    title: "MY MOVIE",
    description: "My Movie - stream movie and tv use data from TMDB!",
};


export default async function RootLayout({ children }) {

    return (
        <div className="h-screen w-full flex justify-center items-center">
            {children}
        </div>
    );
}
