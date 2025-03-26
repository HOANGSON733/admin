"use client"; // Thêm nếu dùng với Next.js App Router
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  FaUser,
  FaCalendarAlt,
  FaSmile,
  FaCalculator,
  FaCreditCard,
  FaCog,
  FaBlog,
  FaImages,
  FaShoppingCart,
} from "react-icons/fa";
import { GiVerticalBanner } from "react-icons/gi";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Giả sử bạn có utility này từ shadcn/ui

interface SidebarItem {
  href: string;
  icon: React.ElementType;
  label: string;
}

const Sidebar = () => {
  // Tách dữ liệu menu thành mảng để dễ quản lý
  const mainItems: SidebarItem[] = [
    { href: "/", icon: FaImages, label: "Gallery" },
    { href: "/blogs", icon: FaBlog, label: "Blog" },
    { href: "/products", icon: FaShoppingCart, label: "Product" },
    { href: "/services", icon: FaSmile, label: "Service" },
    { href: "/calculator", icon: FaCalculator, label: "Calculator" },
    { href: "banner", icon: GiVerticalBanner, label: "Banner" },
  ];

  const settingItems: SidebarItem[] = [
    { href: "/profile", icon: FaUser, label: "Profile" },
    { href: "/billing", icon: FaCreditCard, label: "Booking" },
    { href: "/settings", icon: FaCog, label: "Settings" },
  ];

  return (
    <Command className="h-full bg-gray-50 dark:bg-gray-800 border-r rounded-none flex flex-col">
      <CommandInput
        placeholder="Search menu..."
        className="border-b bg-transparent"
      />
      <CommandList className="flex-1 overflow-y-auto py-2">
        <CommandEmpty className="py-2 text-center text-gray-500">
          No results found.
        </CommandEmpty>

        {/* Main Menu */}
        <CommandGroup
          heading="Main Menu"
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {mainItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <CommandItem
                className={cn(
                  "cursor-pointer py-2 px-3 m-1 rounded-md",
                  "hover:bg-gray-100 dark:hover:bg-gray-700",
                  "transition-colors duration-200",
                  "flex items-center"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            </Link>

          ))}
        </CommandGroup>

        <CommandSeparator className="my-2" />

        {/* Settings Menu */}
        <CommandGroup
          heading="Settings"
          className="text-sm text-gray-500 dark:text-gray-400"
        >
          {settingItems.map((item) => (
            <Link key={item.href} href={item.href} passHref legacyBehavior>
              <CommandItem
                className={cn(
                  "cursor-pointer py-2 px-3 m-1 rounded-md",
                  "hover:bg-gray-100 dark:hover:bg-gray-700",
                  "transition-colors duration-200",
                  "flex items-center"
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            </Link>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Sidebar;