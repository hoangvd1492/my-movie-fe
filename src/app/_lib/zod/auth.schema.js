import z from 'zod'

export const LogInSchema = z.object({
    email: z.string().email({ message: 'Email không hợp lệ!' }),
    password: z.string().min(8, { message: "Mật khẩu có ít nhất 8 kí tự!" })
});

export const SignUpSchema = z.object({
    email: z.string().email({ message: 'Email không hợp lệ!' }),
    username: z.string({ message: 'Tên người dùng không hợp lệ!' }),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, { message: "Mật khẩu có ít nhất 8 kí tự bao gồm kí tự in hoa, kí tự thường và số!" }),
    passwordConfirm: z.string()
}).refine((data) => data.password === data.passwordConfirm, {
    message: "Mật khẩu không khớp!",
    path: ["passwordConfirm"],
});

