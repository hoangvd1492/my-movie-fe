import { ForgetPasswordForm } from "./ForgetPasswordForm";

export default function Page() {
    return (
        <div >
            <div className="text-[white] bg-primary w-[300px] px-8 py-16 w-fit flex flex-col gap-4 shadow-primary shadow-[0_0_10px_0]">
                <div className="text-2xl font-[700]">
                    ĐIỀN EMAIL
                </div>
                <ForgetPasswordForm />
            </div>
        </div>
    )
}