"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export const Pagination = ({ page, total }) => {
    const searchParams = useSearchParams()
    const currentParams = new URLSearchParams(searchParams.toString())

    const createPageURL = (pageNumber) => {
        currentParams.set('page', pageNumber)
        return `?${currentParams.toString()}`
    }

    return (
        <>
            <div className="flex flex-row gap-2 items-center text-[white] font-[700] max-md:hidden">
                {page > 1 && <>
                    <Link href={createPageURL(1)}>
                        <div className="w-8 h-8 bg-primary rounded-[6px] cursor-pointer flex justify-center items-center">
                            <ChevronsLeft />
                        </div>
                    </Link>
                    <Link href={createPageURL(page - 1)}>
                        <div className="w-8 h-8 bg-primary rounded-[6px] cursor-pointer flex justify-center items-center">
                            <ChevronLeft />
                        </div>
                    </Link>
                </>}

                {/* Các nút trang và dấu ... */}
                {page - 3 > 0 && <div className={`px-4 py-2 text-primary flex justify-center items-center `}>...</div>}
                {page - 2 > 0 && <Link href={createPageURL(page - 2)}><div className={`px-4 py-2 text-primary hover:bg-primary hover:text-[white] transition-all rounded-[6px] flex justify-center items-center `}><span>{page - 2}</span></div></Link>}
                {page - 1 > 0 && <Link href={createPageURL(page - 1)}><div className={`px-4 py-2 text-primary hover:bg-primary hover:text-[white] transition-all rounded-[6px] flex justify-center items-center `}><span>{page - 1}</span></div></Link>}

                <div className={`px-4 py-2 bg-primary transition-all rounded-[6px] flex justify-center items-center `}><span>{page}</span></div>

                {page + 1 <= total && <Link href={createPageURL(page + 1)}><div className={`px-4 py-2 text-primary hover:bg-primary hover:text-[white] transition-all rounded-[6px] flex justify-center items-center `}><span>{page + 1}</span></div></Link>}
                {page + 2 <= total && <Link href={createPageURL(page + 2)}><div className={`px-4 py-2 text-primary hover:bg-primary hover:text-[white] transition-all rounded-[6px] flex justify-center items-center `}><span>{page + 2}</span></div></Link>}
                {page + 3 < total && <div className={`px-4 py-2 text-primary flex justify-center items-center `}>...</div>}

                {page < total && <>
                    <Link href={createPageURL(page + 1)}>
                        <div className="w-8 h-8 bg-primary rounded-[6px] cursor-pointer flex justify-center items-center">
                            <ChevronRight />
                        </div>
                    </Link>
                    <Link href={createPageURL(total)}>
                        <div className="w-8 h-8 bg-primary rounded-[6px] cursor-pointer flex justify-center items-center">
                            <ChevronsRight />
                        </div>
                    </Link>
                </>}
            </div>

            <div className="max-md:flex hidden flex-row gap-2 items-center text-[white]">
                {page > 1 && <>
                    <Link href={createPageURL(1)}>
                        <div className="w-8 h-8 bg-primary rounded-[6px] cursor-pointer flex justify-center items-center">
                            <ChevronsLeft />
                        </div>
                    </Link>
                    <Link href={createPageURL(page - 1)}>
                        <div className="w-8 h-8 bg-primary rounded-[6px] cursor-pointer flex justify-center items-center">
                            <ChevronLeft />
                        </div>
                    </Link>
                </>}

                <div className="px-4 py-1 bg-primary font-[700] transition-all rounded-[6px] flex justify-center items-center ">
                    {page} / {total}
                </div>

                {page < total && <>
                    <Link href={createPageURL(page + 1)}>
                        <div className="w-8 h-8 bg-primary rounded-[6px] cursor-pointer flex justify-center items-center">
                            <ChevronRight />
                        </div>
                    </Link>
                    <Link href={createPageURL(total)}>
                        <div className="w-8 h-8 bg-primary rounded-[6px] cursor-pointer flex justify-center items-center">
                            <ChevronsRight />
                        </div>
                    </Link>
                </>}
            </div>
        </>
    )
}