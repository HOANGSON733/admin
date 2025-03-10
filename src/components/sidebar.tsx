import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import { FaUser, FaCalendarAlt, FaSmile, FaCalculator, FaCreditCard, FaCog } from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
    return (
        <Command className="bg-secondary rounded-none">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                    <Link href="/">
                        <CommandItem className="cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                            <FaCalendarAlt className="mr-2" />
                            Gallery
                        </CommandItem>
                    </Link>
                    <Link href="/post">
                        <CommandItem className="cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                            <FaCalendarAlt className="mr-2" />
                            Blog
                        </CommandItem>
                    </Link>
                    <Link href="/calendar">
                        <CommandItem className="cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                            <FaCalendarAlt className="mr-2" />
                            Product
                        </CommandItem>
                    </Link>
                    <Link href="/service">
                        <CommandItem className="cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                            <FaSmile className="mr-2" />
                            Service
                        </CommandItem>
                    </Link>
                    <Link href="/calculator">
                        <CommandItem className="cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                            <FaCalculator className="mr-2" />
                            Calculator
                        </CommandItem>
                    </Link>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                    <Link href="/profile">
                        <CommandItem className="cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                            <FaUser className="mr-2" />
                            Profile
                        </CommandItem>
                    </Link>
                    <Link href="/billing">
                        <CommandItem className="cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                            <FaCreditCard className="mr-2" />
                            Booking
                        </CommandItem>
                    </Link>
                    <Link href="/settings">
                        <CommandItem className="cursor-pointer hover:bg-primary/10 transition-colors duration-200">
                            <FaCog className="mr-2" />
                            Settings
                        </CommandItem>
                    </Link>
                </CommandGroup>
            </CommandList>
        </Command>
    );
};

export default Sidebar;