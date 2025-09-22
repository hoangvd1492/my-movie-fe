"use client"

import Link from "next/link";
import { useState } from "react";

export const SignInForm = () => {

    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.value);
    }

    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="username">Tên người dùng</label>
                    <input id="username" name="username" type="text" className="py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary" />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" className="py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary" />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="password">Mật khẩu</label>
                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} className="py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary" />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="password-confirm">Mật khẩu</label>
                    <input id="password-confirm" name="passwordConfirm" type={showPassword ? 'text' : 'password'} className="py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary" />
                </div>
                <div className="flex flex-row gap-2 justify-start items-center ">
                    <input id="checkbox" type="checkbox" value={showPassword} className="w-4 h-4 text-blue-600 bg-gray-100 border-primary-hovercursor-pointer"
                        onChange={() => setShowPassword(!showPassword)} />
                    <label htmlFor="checkbox" className=" text-sm font-medium cursor-pointer">Hiện mật khẩu</label>
                </div>
                <button className="hover:bg-primary-hover w-full py-2 rounded-[4px] cursor-pointer text-sm font-[500]">Đăng ký</button>
            </form>
            <div className="border-1 border-b-[white] my-2">

            </div>
            <Link href={'/login'}>
                <div className="hover:bg-primary-hover w-full py-2 rounded-[4px] cursor-pointer text-sm font-[500] text-center">
                    Đăng nhập
                </div>
            </Link>
        </div>
    )
}