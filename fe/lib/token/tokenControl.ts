import { getCookie, getCookies, setCookie, deleteCookie, hasCookie } from 'cookies-next';
interface tokenModel{
    access_token:String,
    refresh_token:String
}
export async function saveToken({access_token,refresh_token}:tokenModel){
    setCookie("access_token",access_token)
    setCookie("refresh_token",refresh_token)
}

export async function deleteToken(){
    deleteCookie("access_token")
    deleteCookie("refresh_token")
}