"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { UserService } from "../_lib/service/userService";
import { setUser } from "../_lib/redux/slices/authSlice";

export const AuthWrapper = ({ children }) => {


    const authPathname = ["/login", "/signup"];

    const privatePathname = ['/me']

    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useDispatch()

    const [allowed, setAllowed] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            UserService.fetchProfile()
                .then((res) => {
                    dispatch(setUser(res.data.user))
                }).catch(err => {
                    console.log(err);
                })
        }
    }, [isLoggedIn]);


    useEffect(() => {
        if (isLoggedIn && authPathname.includes(pathname)) {

            router.replace("/");
        } else if (!isLoggedIn && privatePathname.includes(pathname)) {
            router.replace("/");
        } else {
            setAllowed(true);
        }
    }, [isLoggedIn, pathname, router]);

    if (!allowed) return null;

    return <>{children}</>;
};
