import { ResetFormForm } from "./ResetForm";

export default function Page() {
    return (
        <div >
            <div className="text-[white] bg-primary w-[300px] px-8 py-8 w-fit flex flex-col gap-4 shadow-primary shadow-[0_0_10px_0]">
                <div className="text-2xl font-[700]">
                    ĐĂNG KÝ
                </div>
                <ResetFormForm />
            </div>
        </div>
    )
}