"use client"

import { LogInSchema } from "@/app/_lib/zod/auth.schema";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, useState } from "react";
import { clearError, login } from "@/app/_lib/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export const LogInForm = () => {


    const router = useRouter()
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null)

    const { error } = useSelector((state) => state.auth);


    const handleSubmit = (e) => {
        e.preventDefault()

        if (loading) return
        const validated = LogInSchema.safeParse({
            email: data.email,
            password: data.password
        })

        if (!validated.success) {
            setErr(validated.error.flatten().fieldErrors)
            return
        }
        setLoading(true);
        dispatch(login({ email: data.email, password: data.password })).unwrap()
            .then(() => {
                router.push('/')
            })
            .catch(() => {
                setLoading(false);
            });

    }

    useEffect(() => {
        dispatch(clearError());
    }, [])

    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-1 ">
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
                {error && <div className="text-[red] w-[256px] text-sm font-[700]">{error}</div>}
                <div className="flex flex-row gap-2 justify-start items-center ">
                    <input id="checkbox" type="checkbox" value={showPassword} className="w-4 h-4 text-blue-600 bg-gray-100 border-primary-hovercursor-pointer"
                        onChange={() => setShowPassword(!showPassword)} />
                    <label htmlFor="checkbox" className=" text-sm font-medium cursor-pointer">Hiện mật khẩu</label>
                </div>
                <Link href={'/forget'} target="_blank"  >
                    <div className="text-sm font-medium hover:underline">
                        Quên mật khẩu?
                    </div>
                </Link>
                <button className={`hover:bg-primary-hover w-full py-2 rounded-[4px] cursor-pointer text-sm font-[500] flex justify-center items-center ${loading ? 'bg-primary-hover' : ''}`} disabled={loading}>

                    {loading ? <span className="loader"></span> : 'Đăng nhập'}
                </button>
            </form>
            <div className="border-1 border-b-[white] my-2">

            </div>
            <Link href={'/signup'}>
                <div className="hover:bg-primary-hover w-full py-2 rounded-[4px] cursor-pointer text-sm font-[500] text-center">
                    Đăng ký
                </div>
            </Link>
        </div>
    )
}