import { getCookie } from 'cookies-next'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const access_token = request.cookies.getAll("access_token")
    const url_data = new URL(request.url)
    console.log("ACCTT::",url_data.pathname.includes("/profile"));
    
    if(access_token.length === 0 && (url_data.pathname.includes("profile") || url_data.pathname.includes("addBlog") )){
        console.log("TOKKKKKKEEENN:",access_token === undefined);
        // console.log("URKLLL::",request.url);
        
        return NextResponse.redirect(new URL('/login',request.url))
    }

    if(access_token.length !== 0 &&( url_data.pathname.includes("login") || url_data.pathname.includes("signup")) ){
        console.log("TOKKKKKKEEENN:",access_token === undefined);
        // console.log("URKLLL::",request.url);
        
        return NextResponse.redirect(new URL('/',request.url))
    }
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile','/addBlog','/signup','/login']
}