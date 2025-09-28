"use client"
import { Heart, LogOut, Menu, Search, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link'
import { ThemeBtn } from '../theme/ThemeButton';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/app/_lib/redux/slices/authSlice';

export const Header = ({ genres = [] }) => {

    const router = useRouter()
    const dispatch = useDispatch();


    const [openDropDown, setOpenDropDown] = useState(false)
    const [transpentBg, setTranspentBg] = useState(false)
    const [openUserDropDown, setOpenUserDropDown] = useState(false)
    const [mounted, setMount] = useState(false)

    const { isLoggedIn, user } = useSelector((state) => state.auth);

    useEffect(() => {
        setMount(true)
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
            window.removeEventListener('scroll', scroll)
        }
    }, [])

    const [searchText, setSearchText] = useState('')

    const handleSearch = () => {
        if (!searchText.trim()) return
        router.push(`/search?q=${searchText}`)
    }

    const handleLogOut = () => {
        dispatch(logout())
    }


    return (
        <header className='sticky top-0 w-full z-999'>
            <div className={`flex flex-col gap-2 ${transpentBg && !openDropDown ? 'backdrop-blur-xl text-primary' : 'bg-primary'}  text-[white] relative`}>
                <div className=" p-2 px-8 text-xl flex flex-row justify-between items-center  max-xl:px-2">
                    <div className='flex flex-row gap-2 items-center'>
                        <Link href={'/'} className='max-md:hidden'>
                            <div className="font-[700] text-2xl py-2 px-4 cursor-pointer ">
                                MY MOVIE
                            </div>
                        </Link>
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
                                <div className='text-[white] hidden group-hover:grid absolute top-[130%] left-0 w-[600px] bg-primary p-2 grid grid-cols-3 gap-2 text-sm '>
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
                    </div>

                    <div className='flex flex-row gap-4 items-center '>
                        <div className='flex flex-row gap-4 items-center'>

                            <input type="text" className='text-white border-2 rounded-[4px] border-primary px-4 py-2  text-base ' placeholder='Tìm kiếm. . .'
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.code == 'Enter') handleSearch()
                                }} />
                            <div className='hover:scale-105 cursor-pointer' onClick={handleSearch}>
                                <Search />
                            </div>
                        </div>
                        <ThemeBtn />
                        <div className="flex flex-row gap-1 max-lg:hidden">
                            {mounted && isLoggedIn ?
                                <div className='relative cursor-pointer ' >
                                    <div onClick={(e) => {
                                        setOpenUserDropDown(!openUserDropDown)
                                    }}>
                                        <User />
                                    </div>
                                    <div className={`absolute top-[200%] right-0 min-w-[200px] text-sm font-[500] bg-primary rounded-[4px] shadow-[0_0_10px_0] shadow-primary  text-[white] ${openUserDropDown ? 'block' : 'hidden'}`}>
                                        <div className=' flex flex-col py-2'>
                                            <div className='p-2 hover:bg-primary-hover  flex gap-2 flex-row items-center '
                                                onClick={() => setOpenUserDropDown(false)}>
                                                <User />  {user?.username}
                                            </div>
                                            <Link href={'/favorites'}>
                                                <div className='p-2 hover:bg-primary-hover  flex gap-2 flex-row items-center'
                                                    onClick={() => setOpenUserDropDown(false)}>
                                                    <Heart />  Yêu thích
                                                </div>
                                            </Link>
                                            <div className='p-2 hover:bg-primary-hover  flex gap-2 flex-row items-center'
                                                onClick={handleLogOut}>
                                                <LogOut /> Đăng xuất
                                            </div>
                                        </div>
                                    </div>
                                </div> :
                                <Link href={'/login'}>
                                    <div className="font-[500]  py-2 px-4 cursor-pointer rounded-[4px] hover:bg-primary-hover">
                                        Đăng nhập
                                    </div>
                                </Link>
                            }
                        </div>
                        <div className='p-2 hidden max-xl:block cursor-pointer' onClick={() => setOpenDropDown(!openDropDown)}>
                            {!openDropDown ? <Menu /> : <X />}
                        </div>

                    </div>
                </div>
                {openDropDown && <div className="absolute top-[100%] flex flex-col gap-1 hidden max-xl:block border-t-1 border-foreground bg-primary w-full">
                    {mounted && isLoggedIn ?
                        <div className=" font-[500]  p-4 cursor-pointer hover:bg-primary-hover"
                            onClick={() => setOpenUserDropDown(false)}>
                            {user?.username}
                        </div>

                        : <></>}


                    <Link href={'/movies'}>
                        <div className=" font-[500] p-4 cursor-pointer hover:bg-primary-hover" onClick={() => setOpenDropDown(false)}>
                            Phim Điện Ảnh
                        </div>
                    </Link>
                    <Link href={'/tvshow'}>
                        <div className=" font-[500]  p-4 cursor-pointer hover:bg-primary-hover" onClick={() => setOpenDropDown(false)}>
                            Phim Bộ
                        </div>
                    </Link>
                    <Link href={'/anime'}>
                        <div className="  font-[500]  p-4 cursor-pointer hover:bg-primary-hover" onClick={() => setOpenDropDown(false)}>
                            Anime
                        </div>
                    </Link>
                    <Link href={'/animeshow'}>
                        <div className=" font-[500]  p-4 cursor-pointer hover:bg-primary-hover" >
                            AnimeTV
                        </div>
                    </Link>



                    {mounted && isLoggedIn ?
                        <>

                            <Link href={'/favorites'}>
                                <div className=" font-[500]  p-4 cursor-pointer hover:bg-primary-hover" onClick={() => setOpenDropDown(false)}>
                                    Yêu thích
                                </div>
                            </Link>
                            <div className=" font-[500]  p-4 cursor-pointer hover:bg-primary-hover"
                                onClick={handleLogOut}>
                                Đăng xuất
                            </div>
                        </>
                        :
                        <Link href={'/login'}>
                            <div className=" font-[500]  p-4 cursor-pointer hover:bg-primary-hover" onClick={() => setOpenDropDown(false)}>
                                Đăng nhập
                            </div>
                        </Link>}

                    <div className=' text-[white] w-full bg-primary p-2 grid grid-cols-3 gap-2 text-sm  border-t-1 border-foreground'>
                        {
                            genres.map((genres, i) => {
                                return (
                                    <Link key={i} href={`/genres/${genres.id}`}>
                                        <div className='p-2 hover:bg-primary-hover font-[500] cursor-pointer' onClick={() => setOpenDropDown(false)}>{genres.name}</div>
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
