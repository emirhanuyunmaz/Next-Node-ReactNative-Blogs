import { getCookie } from 'cookies-next'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from "jwt-decode";

// import { useGetSingleBlogQuery } from './lib/store/blog/blogApi'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const access_token = request.cookies.getAll("access_token")
    const url_data = new URL(request.url)
    // console.log("ACCTT::",url_data.pathname.includes("/profile"));
    let verify = ""
    if(access_token.length != 0 ){
        verify= jwtDecode(access_token[0]?.value)
    }
    // console.log("AAAAA::",verify.role);
    
    // Login kullanıcının işlem yapabilmesi 
    if(access_token.length === 0 && (url_data.pathname.includes("profile") || url_data.pathname.includes("addBlog") || url_data.pathname.includes("premium") )){
        return NextResponse.redirect(new URL('/login',request.url))
    }

    // Giriş yapan kullanıcıyı login signup girmesini engelleme işlemi
    if(access_token.length !== 0 &&( url_data.pathname.includes("login") || url_data.pathname.includes("signup")) ){    
        return NextResponse.redirect(new URL('/',request.url))
    }

    const regex = new RegExp("/admin/home", "i")
    // Admin olamayan kullanıcıların erişimini engelleme işlemi.
    if(( regex.test(url_data.pathname) ) && verify.role !="admin"){
        return NextResponse.redirect(new URL('/',request.url))
    }

    if(url_data.pathname == "/admin" && verify.role == "admin"){
        console.log(url_data.pathname);
        
        return NextResponse.redirect(new URL('/admin/home',request.url))
    }

    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile','/addBlog','/signup','/login',"/premium","/admin","/admin/home/:path*"]
}