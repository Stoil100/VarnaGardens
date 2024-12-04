import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function MainButton({
    children,
    variant = "default",
}: {
    children: string;
    variant?: "default" | "transparent";
}) {
    return (
        <Button
            className={cn(
                "rounded-full bg-green px-4 py-1 text-white text-xl h-fit font-helvetica font-extralight",
                variant === "transparent" &&
                    "border-1 border-green bg-transparent text-green",
            )}
        >
            {children}
        </Button>
    );
}