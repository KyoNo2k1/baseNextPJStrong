import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {APP_SAVE_KEY} from "@/shared/utils/constants/appConfig";

export function middleware(request: NextRequest) {
  // const AppKey = request.cookies.get(APP_SAVE_KEY.TOKEN_KEY)?.value
  // if (AppKey) {
  //   NextResponse.next()
  // } else {
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  NextResponse.next()
}
export const config = {
  matcher: ['/system-management/:path*',"/","/term","/guide-user", "/profile"],
}
