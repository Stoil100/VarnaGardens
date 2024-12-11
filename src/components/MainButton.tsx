import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "./ui/button";

export default function MainButton({
    children,
    variant = "default",
    ...props
}: {
    children: ReactNode;
    variant?: "default" | "transparent";
} & Omit<React.ComponentProps<typeof Button>, "variant">) {
    const baseClass =
        "h-fit rounded-full px-4 py-1 border border-green text-xl font-extralight transition-all drop-shadow-lg";
    const variantClasses = {
        default: "bg-green text-white hover:bg-transparent hover:text-green ",
        transparent:
            "bg-transparent border text-green hover:bg-green hover:text-white",
    };

    return (
        <Button
            {...props}
            className={cn(baseClass, variantClasses[variant], props.className)}
        >
            {children}
        </Button>
    );
}
