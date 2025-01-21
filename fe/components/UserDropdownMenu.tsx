'use client'

import {
    CirclePlus,
    LogOut,
    ScrollText,
    User,
    UserRoundCheck,
    
  } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import {loadStripe} from '@stripe/stripe-js';
import { useBuyPremiumMutation } from "@/lib/store/user/userApi";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
// import { cookies } from "next/headers";

  export function UserDropdownMenu() {
    const router = useRouter()
    const [buyPremium,resBuyPremium] = useBuyPremiumMutation()

    async function logoutOnClick(){
      // const cookieStore = await cookies()
      // cookieStore.delete("access_token")
      // cookieStore.delete("refresh_token")
      deleteCookie("access_token")
      deleteCookie("refresh_token")
      location.reload()
    }

    async function paymant(){
          
          // console.log(`${process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY}`);
          const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
          const stripe = await loadStripe(stripePublicKey!)
          console.log(stripe);
          
          const res = await buyPremium("")

          console.log(res.data.id);
        if(res.error){
          console.log("ERR");
        }else{
          console.log("NOT ERR");
          // const result = await stripe?.redirectToCheckout({
          //   sessionId:res.data.id
          // })
          window.location.href = res.data.url
          // if(result?.error){
          //   console.log("ODEME HATA:",result.error);
            
          // }
          
        }

            
      }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button ><User/></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <User />
              <Link href={"/profile"} >Profile</Link  >
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CirclePlus />
              <Link href={"/addBlog"}>Add Blog</Link>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ScrollText />
              <Link href={"/myBlogs"}> My Blog List</Link>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <UserRoundCheck />
              <button onClick={paymant}> Premium</button>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            
          </DropdownMenuGroup>
          <DropdownMenuItem>
            <LogOut />
            <button onClick={logoutOnClick}>Log out</button>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  