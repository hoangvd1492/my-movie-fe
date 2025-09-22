"use client"

import Link from "next/link";
import { useState } from "react";

export const ForgetPasswordForm = () => {



    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.value);
    }

    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" className="py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary" />
                </div>



                <button className="hover:bg-primary-hover w-full py-2 rounded-[4px] cursor-pointer text-sm font-[500]">
                    Xác nhận
                </button>
            </form>
            <div className="border-1 border-b-[white] my-2">

            </div>
            <Link href={'/login'}>
                <div className="hover:bg-primary-hover w-full py-2 rounded-[4px] cursor-pointer text-sm font-[500] text-center">
                    Đăng nhập
                </div>
            </Link>
            <Link href={'/signin'}>
                <div className="hover:bg-primary-hover w-full py-2 rounded-[4px] cursor-pointer text-sm font-[500] text-center">
                    Đăng ký
                </div>
            </Link>
        </div>
    )
}