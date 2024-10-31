import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
    const isCaptchaVerified = request.cookies.get("captcha_verified")

    if(!isCaptchaVerified && request.nextUrl.pathname !== "/captcha"){
        return NextResponse.redirect(new URL("/captcha", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next|favicon.ico|captcha).*)',
    ]
}