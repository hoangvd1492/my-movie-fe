export const Player = ({ embedUrl }) => {
    return (
        <div className="w-full">
            <iframe
                className="w-full h-screen max-sm:h-[300px] max-lg:h-[500px]"
                title="player"
                src={embedUrl}
                frameBorder="0"
                allowFullScreen
                sandbox={true}
            ></iframe>
        </div>
    )
}