"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";

const GoBack = () => {
    const router = useRouter();

    return (
        <Button
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
            onClick={() => router.back()}
        >
            <FaArrowLeft /> Goback
        </Button>
    );
};

export default GoBack;
