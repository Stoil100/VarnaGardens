"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useRouter } from "@/i18n/routing";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguageButton from "./LanguageButton";
import LoadingOverlay from "./Loading";
import MainButton from "./MainButton";
export default function Navigation() {
    const t = useTranslations("Navigation");
    const router = useRouter();
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const [loading, setLoading] = useState(true);
    const [navLinks, setNavLinks] = useState<{ href: string; label: string }[]>(
        [],
    );
    const [open, setOpen] = useState(false);
    const [actionButtons, setActionButtons] = useState<
        { variant: string; label: string; href: string }[]
    >([]);

    useEffect(() => {
        if (headerRef.current) {
            const headerHeight = headerRef.current.offsetHeight;
            document.documentElement.style.setProperty(
                "--nav-height",
                `${headerHeight}px`,
            );
        }
    }, []);

    useEffect(() => {
        const loadNavigationData = async () => {
            const navLinksData = [
                { href: "#hero" },
                { href: "#services" },
                { href: "#gallery" },
                { href: "/articles" },
            ].map((link, index) => ({
                ...link,
                label: t(`navLinks.${index}.label`),
            }));

            const actionButtonsData = [
                { variant: "transparent", href: "/contact" },
                { variant: "default", href: "/booking" },
            ].map((button, index) => ({
                ...button,
                label: t(`actionButtons.${index}.label`),
            }));

            setNavLinks(navLinksData);
            setActionButtons(actionButtonsData);
            setLoading(false);
        };

        loadNavigationData();
    }, [t]);

    const handleNavigation = (href: string) => {
        const isHomePage = pathname.split("/").length <= 2;
        const navHeight = parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
                "--nav-height",
            ),
            10,
        );

        if (isHomePage && href.startsWith("#")) {
            const target = document.querySelector(href);
            if (target) {
                const targetPosition =
                    target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - navHeight,
                    behavior: "smooth",
                });
                setOpen(false);
            }
        } else if (href.startsWith("/")) {
            router.push(href);
        } else {
            setOpen(false);
            router.push("/");
        }
    };

    return (
        <>
            {loading && <LoadingOverlay />}
            <header
                ref={headerRef}
                className="sticky top-0 z-[999] w-full bg-white drop-shadow-md"
            >
                <nav className="flex items-center justify-between bg-transparent px-2 py-3 md:px-6">
                    <div className="flex items-center gap-16">
                        <Link
                            href="/"
                            className="font-cormorant text-3xl text-green"
                        >
                            {t("brand")}
                        </Link>
                        <ul className="hidden items-center gap-8 text-lg font-light text-muted-foreground lg:flex">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <button
                                        onClick={() =>
                                            handleNavigation(link.href)
                                        }
                                        className="transition hover:text-primary"
                                    >
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="hidden items-center gap-4 lg:flex">
                        <LanguageButton />
                        {actionButtons.map((button) => (
                            <Link key={button.label} href={button.href}>
                                <MainButton
                                    variant={
                                        button.variant as
                                            | "default"
                                            | "transparent"
                                    }
                                >
                                    {button.label}
                                </MainButton>
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center justify-center lg:hidden">
                        <div className="flex items-center justify-center">
                            <LanguageButton />
                        </div>
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <div className="p-2">
                                    {open ? (
                                        <X className="h-6 w-6 text-green" />
                                    ) : (
                                        <Menu className="h-6 w-6 text-green" />
                                    )}
                                    <span className="sr-only">
                                        {t("menu.toggle")}
                                    </span>
                                </div>
                            </SheetTrigger>
                            <SheetContent
                                side="top"
                                className="flex w-full flex-col justify-center animate-ease-in-out"
                            >
                                <SheetHeader>
                                    <SheetTitle className="font-cormorant text-2xl text-primary">
                                        {t("brand")}
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="mt-4 flex flex-col items-center gap-4">
                                    {navLinks.map((link) => (
                                        <button
                                            key={link.label}
                                            onClick={() =>
                                                handleNavigation(link.href)
                                            }
                                            className="text-lg font-light text-muted-foreground transition hover:text-primary"
                                        >
                                            {link.label}
                                        </button>
                                    ))}
                                    {actionButtons.map((button) => (
                                        <Link
                                            key={button.label}
                                            href={button.href}
                                            className="w-full max-w-xs"
                                            onClick={() => {
                                                setOpen(false);
                                            }}
                                        >
                                            <MainButton
                                                variant={
                                                    button.variant as
                                                        | "default"
                                                        | "transparent"
                                                }
                                                className="w-full"
                                            >
                                                {button.label}
                                            </MainButton>
                                        </Link>
                                    ))}
                                </div>
                                <SheetDescription />
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </header>
        </>
    );
}
