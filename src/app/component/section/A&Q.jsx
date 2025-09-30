"use client"
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

export default function FacebookComments({ url, numPosts = 5 }) {
    useEffect(() => {
        if (!window.FB) {
            const script = document.createElement('script');
            script.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v18.0&appId=2602956406581126';
            script.async = true;
            script.defer = true;
            script.crossOrigin = 'anonymous';
            document.body.appendChild(script);
        } else {
            window.FB.XFBML.parse();
        }
    }, [url]);

    return (
        <section className="w-full  text-body" id="anime">

            <div className="font-[700] text-xl flex flex-row gap-2 items-center bg-primary w-fit text-[white] py-2 px-4 rounded-[4px] cursor-pointer hover:shadow-[0_0_10px_0_rgba(0,0,0,0.3)] shadow-primary">
                <span>Hỏi đáp</span><ChevronRight />
            </div>

            <div className='max-h-[500px] overflow-y-scroll'>
                <div
                    className="fb-comments"
                    data-href={`http://localhost:10000/`}
                    data-width="100%"
                    data-numposts={numPosts}
                />
            </div>
        </section>
    );
}