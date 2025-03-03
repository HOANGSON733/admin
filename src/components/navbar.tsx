import Link from "next/link";
import Image from "next/image";
import logo from "../img/Logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navbar = () => {
    return (
        <div className="bg-gray-800 dark:bg-slate-800 text-white py-2 px-5 flex justify-between">
            <Link href={"/"}>
                <Image src={logo} alt="Admin" width={50} />
            </Link>

            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar>
                        <AvatarImage src="/ava.jpg" width={80} height={80}/>
                        <AvatarFallback className="text-black">CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={"/profile"}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href={"/logout"}>Log Out</Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    );
}
export default Navbar;