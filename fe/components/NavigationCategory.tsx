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
                <NavigationMenuLink>
                <Link href={"/asd"}>
                    Tecnology
                </Link>
                </NavigationMenuLink>

                <NavigationMenuLink>
                <Link href={"/asd"}>
                    Tecnology
                </Link>
                </NavigationMenuLink>

                <NavigationMenuLink>
                <Link href={"/asd"}>
                    Tecnology
                </Link>
                </NavigationMenuLink>

                <NavigationMenuLink>
                <Link href={"/asd"}>
                    Tecnology
                </Link>
                </NavigationMenuLink>
            </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
        </NavigationMenu>
    </div>)
}