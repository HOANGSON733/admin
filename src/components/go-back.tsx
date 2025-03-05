import Link from "next/link";
import { ArrowLeftCircle } from "lucide-react";

interface BackButtonProps {
  text: string;
  link: string;
}

const BackButton = ({ text, link }: BackButtonProps) => {
  return (
    <Link
      href={link}
      className="text-gray-500 flex items-center gap-1 font-bold mb-5 no-underline hover:text-gray-700"
    >
      <ArrowLeftCircle size={18} />
      {text}
    </Link>
  );
};

export default BackButton;
