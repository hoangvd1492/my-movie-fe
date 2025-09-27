"use client"

import { AuthService } from "@/app/_lib/service/authService";
import { mailValidator } from "@/app/_lib/zod/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";


export const ForgetPasswordForm = () => {

    const [email, setEmail] = useState('')
    const [validateErr, setValidateErr] = useState(null)


    const mutate = useMutation({
        mutationFn: (email) => {
            return AuthService.requestResetPassword(email)
        },
    })

    const handleSubmit = (e) => {

        e.preventDefault()
        if (mutate.isPending) return
        mutate.reset()
        const validated = mailValidator.safeParse(email);
        if (!validated.success) {
            setValidateErr(validated.error.flatten().formErrors[0])
            return
        }
        mutate.mutate(email)
    }

    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 ">
                    <label className="text-sm font-[700]" htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" className="py-2 px-4 w-[256px] rounded-[4px] bg-[white] text-primary"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            setValidateErr(null)
                            mutate.reset()
                        }} />
                </div>
                {validateErr && <div className={`w-[256px] text-sm font-[700] text-[red]`}>{validateErr}</div>}
                {mutate.isError && <div className={`w-[256px] text-sm font-[700] text-[red]`}>{mutate.error?.message}</div>}
                {mutate.isSuccess && <div className={`w-[256px] text-sm font-[700] text-[#22c55e]`}>{mutate.data?.message}</div>}
                <div className="border-1 border-b-[white] my-2">           </div>
                <button disabled={mutate.isPending} className={`hover:bg-primary-hover w-full py-2 rounded-[4px] cursor-pointer text-sm font-[500] flex flex-col justify-center items-center ${mutate.isPending ? 'bg-primary-hover cursor-not-allowed' : ''}`}>
                    {mutate.isPending ? <span className="loader"></span> : 'Xác nhận'}
                </button>
            </form>


        </div>
    )
}