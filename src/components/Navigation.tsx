import React from "react";
import MainButton from "./MainButton";
import Link from "next/link";

export default function Navigation() {
    const navLinks = [
        { label: "Начало", href: "#" },
        { label: "Услуги", href: "#" },
        { label: "Галерия", href: "#" },
    ];
    const actionButtons: { label: string; variant?: "default" | "transparent" }[] = [
        { label: "Език", variant: "default" },
        { label: "Контакт", variant: "transparent" },
        { label: "Получи Оферта", variant: "default" },
    ];

    return (
        <header className="h-fit w-full bg-transparent">
            <nav className="flex items-center justify-between bg-transparent px-4 py-3">
                <div className="flex items-center gap-16">
                    <h3 className="font-cormorant text-green text-3xl">
                        Varna Gardens
                    </h3>
                    <ul className="flex items-center gap-8 text-lg font-light text-gray-400">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className="hover:text-green transition">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex items-center gap-4">
                    {actionButtons.map((button) => (
                        <MainButton key={button.label} variant={button.variant}>
                            {button.label}
                        </MainButton>
                    ))}
                </div>
            </nav>
        </header>
    );
}
