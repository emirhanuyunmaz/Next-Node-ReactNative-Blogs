import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import Link from "next/link"
export default function NavigationCategory(){
    return(<div className="flex">
        <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
            <NavigationMenuTrigger>Category</NavigationMenuTrigger>
            <NavigationMenuContent>
                <NavigationMenuLink href="/asd" >
                
                    Tecnology
                
                </NavigationMenuLink>

                <NavigationMenuLink>
                
                    Tecnology
                
                </NavigationMenuLink>

                <NavigationMenuLink  >
                
                    Tecnology
                
                </NavigationMenuLink>

                <NavigationMenuLink>
                
                    Tecnology
                
                </NavigationMenuLink>
            </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    </div>)
}