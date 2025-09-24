import { NextResponse } from 'next/server';

export function middleware(request) {
    const cookies = request.cookies.get('token');

    console.log('Middleware: Đã đọc được cookie:', cookies);

    return NextResponse.next();
}