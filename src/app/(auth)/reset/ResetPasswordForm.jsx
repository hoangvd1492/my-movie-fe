"use client"

import { AuthService } from "@/app/_lib/service/authService";
import { ChangePasswordSchema } from "@/app/_lib/zod/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const ResetPasswordForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({ password: '', passwordConfirm: '' })
    const [errValidate, setErrValidate] = useState(null)

    const resetToken = useSearchParams().get('token');

    if (!resetToken) {
        return <div className="text-lg">Yêu cầu không hợp lệ!</div>
    }

    const mutate = useMutation({
        mutationFn: ({ password, resetToken }) => {

            return AuthService.resetPassword(password, resetToken)
        },
    })



    const handleSubmit = (e) => {
        e.preventDefault()
        if (mutate.isPending) return
        mutate.reset()

        const validated = ChangePasswordSchema.safeParse({
            password: data.password,
            passwordConfirm: data.passwordConfirm,
        })

        if (!validated.success) {
            setErrValidate(validated.error.flatten().fieldErrors)
            return
        }

        mutate.mutate({ password: data.password, resetToken })
    }

    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="password">Đổi mật khẩu</label>
                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} className="py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary"
                        value={data.password} onChange={(e) => {
                            setData(pre => {
                                return ({ ...pre, password: e.target.value })
                            })
                            setErrValidate(err => {
                                return ({ ...err, password: null })
                            })
                            mutate.reset()
                        }} />
                    {errValidate?.password && <div className="text-[red] w-[256px] text-sm">{errValidate.password}</div>}
                </div>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="password-confirm">Xác nhận mật khẩu</label>
                    <input id="password-confirm" name="passwordConfirm" type={showPassword ? 'text' : 'password'} className="py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary"
                        value={data.passwordConfirm} onChange={(e) => {
                            setData(pre => {
                                return ({ ...pre, passwordConfirm: e.target.value })
                            })
                            setErrValidate(err => {
                                return ({ ...err, passwordConfirm: null })
                            })
                            mutate.reset()
                        }} />
                    {errValidate?.passwordConfirm && <div className="text-[red] w-[256px] text-sm">{errValidate.passwordConfirm}</div>}
                </div>

                {mutate.isError && <div className={`w-[256px] text-sm font-[700] text-[red]`}>{mutate.error?.message}</div>}
                {mutate.isSuccess && <div className={`w-[256px] text-sm font-[700] text-[#22c55e]`}>{mutate.data?.message}</div>}

                <div className="flex flex-row gap-2 justify-start items-center ">
                    <input id="checkbox" type="checkbox" value={showPassword} className="w-4 h-4 text-blue-600 bg-gray-100 border-primary-hovercursor-pointer"
                        onChange={() => setShowPassword(!showPassword)} />
                    <label htmlFor="checkbox" className=" text-sm font-medium cursor-pointer">Hiện mật khẩu</label>
                </div>
                <button disabled={mutate.isPending} className={`hover:bg-primary-hover w-full py-2 rounded-[4px] cursor-pointer text-sm font-[500] flex flex-col justify-center items-center ${mutate.isPending ? 'bg-primary-hover cursor-not-allowed' : ''}`}>
                    {mutate.isPending ? <span className="loader"></span> : 'Xác nhận'}
                </button>
            </form>
        </div>
    )
}