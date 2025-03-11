'use client'; // Thêm directive này nếu dùng Next.js 13+ với App Router

import Link from "next/link";
import Image from "next/image";
import logo from "../img/Logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 dark:bg-slate-800 text-white py-4 px-6 flex items-center justify-between shadow-lg">
            {/* Logo Section */}
            <Link href="/" className="flex items-center space-x-2">
                <Image 
                    src={logo} 
                    alt="Admin Logo" 
                    width={50} 
                    height={50}
                    className="object-contain"
                    priority // Tải trước logo để cải thiện LCP
                />
                <span className="text-lg font-semibold hidden md:inline">
                    Admin Panel
                </span>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full">
                    <Avatar className="h-10 w-10">
                        <AvatarImage 
                            src="/ava.jpg" 
                            alt="User Avatar"
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-gray-600 text-white font-medium">
                            CN
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mr-4 mt-2" align="end">
                    <DropdownMenuLabel className="font-medium">
                        My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link href="/profile" className="w-full">
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link href="/logout" className="w-full">
                            Log Out
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>
    );
};

export default Navbar;