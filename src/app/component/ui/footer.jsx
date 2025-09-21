import { FacebookIcon, InstagramIcon, Mail, TicketX, TwitterIcon } from "lucide-react"

export const Footer = () => {
    return (
        <footer>
            <div className="h-fit py-16 w-full bg-primary flex flex-col items-center gap-2 ">
                <div className="flex flex-row gap-2 items-center bg-[#A30000] text-[yellow] px-4 py-2 w-fit rounded-[32px]">
                    <img className="h-8 w-8" src={'/vietnam.svg'} alt="Viet Nam" /><div>Hoàng Sa, Trường Sa là của Việt Nam!</div>
                </div>
                <div className="flex flex-row gap-2">
                    <div className="flex justify-center items-center rounded-[50%] h-8 w-8 text-[white] hover:bg-primary-hover cursor-pointer ">
                        <FacebookIcon size={16} />
                    </div >
                    <div className="flex justify-center items-center rounded-[50%] h-8 w-8 text-[white] hover:bg-primary-hover cursor-pointer ">
                        <TwitterIcon size={16} />
                    </div>
                    <div className="flex justify-center items-center rounded-[50%] h-8 w-8 text-[white] hover:bg-primary-hover cursor-pointer ">
                        < InstagramIcon size={16} />
                    </div>

                </div>
                <div className="flex flex-row gap-4 text-white items-center hover:underline cursor-pointer">
                    <Mail size={16} /> <span >abc@example.com</span>
                </div>
                <div className="text-[white] font-[700]">
                    Thông tin và hình ảnh phim được tổng hợp từ cơ sở dữ liệu phim khổng lồ của IMDb. ©
                </div>
                <div className="text-[white] font-[700]">
                    {new Date().getFullYear()} MyMovie
                </div>
            </div>
        </footer>
    )
}