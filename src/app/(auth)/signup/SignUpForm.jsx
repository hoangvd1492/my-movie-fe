"use client"

import { AuthService } from "@/app/_lib/service/authService";
import { SignUpSchema } from "@/app/_lib/zod/auth.schema";
import Link from "next/link";
import { useState } from "react";

export const SignUpForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({ username: '', email: '', password: '', passwordConfirm: '' })
    const [err, setErr] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        const validated = SignUpSchema.safeParse({
            username: data.username,
            email: data.email,
            password: data.password,
            passwordConfirm: data.passwordConfirm,
        })

        if (!validated.success) {
            setErr(validated.error.flatten().fieldErrors)
            return
        }

        AuthService.signup(data.username, data.email, data.password).then(res => {
            console.log(res);

        }).catch(err => {
            console.log(err);
        })

    }
    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="username">Tên người dùng</label>
                    <input id="username" name="username" type="text" className={`py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary ${err?.username ? 'text-[red]!' : ''}`}
                        value={data.username} onChange={(e) => {
                            setData(pre => {
                                return ({ ...pre, username: e.target.value })
                            })

                            setErr(err => {
                                return ({ ...err, username: null })
                            })
                        }} />
                    {err?.username && <div className="text-[red] w-[256px] text-sm">{err.username}</div>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" className={`py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary ${err?.email ? 'text-[red]!' : ''}`}
                        value={data.email} onChange={(e) => {
                            setData(pre => {
                                return ({ ...pre, email: e.target.value })
                            })

                            setErr(err => {
                                return ({ ...err, email: null })
                            })
                        }} />
                    {err?.email && <div className="text-[red] w-[256px] text-sm">{err.email}</div>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="password">Mật khẩu</label>
                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} className={`py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary ${err?.password ? 'text-[red]!' : ''}`}
                        value={data.password} onChange={(e) => {
                            setData(pre => {
                                return ({ ...pre, password: e.target.value })
                            })

                            setErr(err => {
                                return ({ ...err, password: null })
                            })
                        }} />
                    {err?.password && <div className="text-[red] w-[256px] text-sm">{err.password}</div>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="password-confirm">Mật khẩu</label>
                    <input id="password-confirm" name="passwordConfirm" type={showPassword ? 'text' : 'password'} className={`py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary ${err?.passwordConfirm ? 'text-[red]!' : ''}`}
                        value={data.passwordConfirm} onChange={(e) => {
                            setData(pre => {
                                return ({ ...pre, passwordConfirm: e.target.value })
                            })

                            setErr(err => {
                                return ({ ...err, passwordConfirm: null })
                            })
                        }} />
                    {err?.passwordConfirm && <div className="text-[red] w-[256px] text-sm">{err.passwordConfirm}</div>}
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