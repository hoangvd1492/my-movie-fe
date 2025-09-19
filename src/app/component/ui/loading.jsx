export default function Loading() {
    return (
        <div className="h-full w-full flex justify-center items-center gap-2 text-3xl py-16 font-[700] text-primary loading">
            <span style={{ '--i': 1 }} >L</span>
            <span style={{ '--i': 2 }}>O</span>
            <span style={{ '--i': 3 }}>A</span>
            <span style={{ '--i': 5 }}>D</span>
            <span style={{ '--i': 6 }}>I</span>
            <span style={{ '--i': 7 }}>N</span>
            <span style={{ '--i': 8 }}>G</span>
            <span style={{ '--i': 8 }}>.</span>
            <span style={{ '--i': 8 }}>.</span>
            <span style={{ '--i': 8 }}>.</span>
        </div>
    )
}