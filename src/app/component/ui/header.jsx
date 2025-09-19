"use client"
import { Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { ThemeBtn } from '../theme/ThemeButton';

export const Header = ({ genres = [] }) => {

    const [openDropDown, setOpenDropDown] = useState(false)

    const [transpentBg, setTranspentBg] = useState(false)


    useEffect(() => {
        const scroll = () => {
            var B = document.body;
            var D = document.documentElement;
            D = (D.clientHeight) ? D : B;

            if (D.scrollTop == 0) {
                setTranspentBg(false)
            } else {
                if (transpentBg) return
                setTranspentBg(true)
            }
        }
        window.addEventListener('scroll', scroll)

        return () => {
            window.removeEventListener('scroll')
        }
    }, [])




    return (
        <header className='sticky top-0 w-full z-999'>
            <div className={`flex flex-col gap-2 ${transpentBg && !openDropDown ? 'backdrop-blur-xl' : 'bg-primary'}  text-header relative`}>
                <div className=" p-2 px-8 text-xl flex flex-row justify-between items-center max-xl:justify-end max-xl:px-2">
                    <div className="flex flex-row gap-1 max-xl:hidden">
                        <Link href={'/movies'}>
                            <div className="font-[500]  py-2 px-4 cursor-pointer rounded-[4px] hover:bg-primary-hover">
                                Phim Điện Ảnh
                            </div></Link>

                        <Link href={'/tvshow'}>
                            <div className="font-[500]  py-2  px-4 cursor-pointer rounded-[4px] hover:bg-primary-hover">
                                Phim Bộ
                            </div>
                        </Link>
                        <Link href={'/anime'}>
                            <div className="font-[500]  py-2 px-4 cursor-pointer rounded-[4px] hover:bg-primary-hover">
                                Anime
                            </div>
                        </Link>
                        <Link href={'/animeshow'}>
                            <div className="font-[500]  py-2 px-4 cursor-pointer rounded-[4px] hover:bg-primary-hover">
                                AnimeTV
                            </div>
                        </Link>

                        <div className="genres-dropdown group relative font-[500]  py-2 px-4 cursor-pointer rounded-[4px] hover:bg-primary-hover">
                            Thể loại
                            <div className='hidden group-hover:grid absolute top-[130%] left-0 w-[600px] bg-primary p-2 grid grid-cols-3 gap-2 text-sm '>
                                {
                                    genres.map((genres, i) => {
                                        return (
                                            <Link key={i} href={`/genres/${genres.id}`}>
                                                <div className='p-2 cursor-pointer hover:bg-primary-hover'>{genres.name}</div>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row gap-4 items-center max-md:grow'>
                        <div className='flex flex-row gap-4 items-center max-md:grow'>

                            <input type="text" className='border-2 rounded-[4px] border-foreground px-4 py-2  max-md:grow text-base ' placeholder='Tìm kiếm. . .' />
                            <div className='hover:scale-105 cursor-pointer'>
                                <Search />
                            </div>
                        </div>
                        <ThemeBtn />
                        <div className='p-2 hidden max-xl:block cursor-pointer' onClick={() => setOpenDropDown(!openDropDown)}>
                            {!openDropDown ? <Menu /> : <X />}
                        </div>
                    </div>
                </div>
                {openDropDown && <div className="absolute top-[100%] flex flex-col gap-1 hidden max-xl:block border-t-1 border-foreground bg-primary w-full">

                    <Link href={'/movies'}>
                        <div className=" text-end font-[500] p-4 cursor-pointer hover:bg-primary-hover" onClick={() => setOpenDropDown(false)}>
                            Phim Điện Ảnh
                        </div>
                    </Link>
                    <Link href={'/tvshow'}>
                        <div className="text-end font-[500]  p-4 cursor-pointer hover:bg-primary-hover" onClick={() => setOpenDropDown(false)}>
                            Phim Bộ
                        </div>
                    </Link>
                    <Link href={'/anime'}>
                        <div className=" text-end font-[500]  p-4 cursor-pointer hover:bg-primary-hover" onClick={() => setOpenDropDown(false)}>
                            Anime
                        </div>
                    </Link>
                    <Link href={'/animeshow'}>
                        <div className=" text-end font-[500]  p-4 cursor-pointer hover:bg-primary-hover">
                            Thể loại
                        </div>
                    </Link>

                    <div className='w-full bg-primary p-2 grid grid-cols-3 gap-2 text-sm  border-t-1 border-foreground'>
                        {
                            genres.map((genres, i) => {
                                return (
                                    <Link key={i} href={`/genres/${genres.id}`}>
                                        <div className='p-2 hover:bg-primary-hover font-[500] cursor-pointer text-end' onClick={() => setOpenDropDown(false)}>{genres.name}</div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>}
            </div>
        </header>

    )
}
