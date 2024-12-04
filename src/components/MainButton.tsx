import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ReactNode } from "react";

export default function MainButton({
    children,
    variant = "default",
    ...props
}: {
    children: ReactNode;
    variant?: "default" | "transparent";
} & Omit<React.ComponentProps<typeof Button>, "variant">) {
    const baseClass =
        "h-fit rounded-full px-4 py-1 text-xl font-extralight transition-all";
    const variantClasses = {
        default:
            "bg-green text-white hover:bg-transparent hover:border-green hover:text-green hover:border",
        transparent:
            "bg-transparent border border-green text-green hover:bg-green hover:border-none hover:text-white",
    };

    return (
        <Button className={cn(baseClass, variantClasses[variant])} {...props}>
            {children}
        </Button>
    );
}
