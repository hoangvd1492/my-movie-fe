"use client"
import { AuthService } from "@/app/_lib/service/authService";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    const mutate = useMutation({
        mutationFn: (email) => {
            return AuthService.requestResetPassword(email)
        },
    })

    const handleSubmit = (e) => {

        if (mutate.isPending) return
        mutate.reset()
        mutate.mutate(user.email)
    }


    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center w-1/2 min-w-[300px] justify-between">
                <label className="text-sm font-[700]" >Email</label>
                <input type={'text'} className={`py-2 px-4 w-[256px] rounded-[4px] bg-background text-primary border-primary border-1`}
                    value={user.email} readOnly />
            </div>
            <div className="flex flex-row gap-2 items-center w-1/2 min-w-[300px] justify-between">
                <label className="text-sm font-[700]" >Tên hiển thị</label>
                <input type={'text'} className={`py-2 px-4 w-[256px] rounded-[4px] bg-background text-primary border-primary border-1`}
                    value={user.username} readOnly />
            </div>
            <div onClick={handleSubmit} className="cursor-pointer hover:underline  flex flex-row gap-2 items-center">Bấm vào đây để đổi mật khẩu {mutate.isPending ? <span className="loader border-primary! border-b-transparent!"></span> : ''}</div>
            {mutate.isError && <div className={`w-[256px] text-sm font-[700] text-[red]`}>{mutate.error?.message}</div>}
            {mutate.isSuccess && <div className={`w-[256px] text-sm font-[700] text-[#22c55e]`}>{mutate.data?.message}</div>}
        </div >
    )
}