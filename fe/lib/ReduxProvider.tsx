'use client'

import { Provider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "@/components/theme-provider";
// import { SessionProvider } from "next-auth/react";
// import {getServerSession} from "next-auth"
export default function ReduxProvider({children}:any){
    

    return (<Provider store={store} >
        {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            > */}
        {children}
        {/* </ThemeProvider> */}
        </Provider>)
}


