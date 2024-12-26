"use client";

import logo from "@/../public/logo.svg";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/routing";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LanguageButton from "./LanguageButton";
import MainButton from "./MainButton";

function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="flex size-40 items-center justify-center text-center font-cormorant text-4xl text-green md:text-5xl">
                Varna Gardens
            </div>
            <div className="absolute size-44 animate-spin animate-duration-[2000ms] animate-ease md:size-56">
                <div className="absolute inset-0 rotate-180 rounded-full border-r-4 border-t-4 border-green border-opacity-70"></div>

                <div className="absolute left-1/2 top-0 flex -translate-x-1/2 transform items-center justify-center">
                    <Image
                        src={logo}
                        alt="Varna Gardens Logo"
                        className="w-1/3 -translate-y-1/2 rotate-45"
                    />
                </div>
            </div>
        </div>
    );
}

export default function Navigation() {
    const t = useTranslations("Navigation");
    const router = useRouter();
    const pathname = usePathname();
    const headerRef = useRef<HTMLElement>(null);
    const [loading, setLoading] = useState(true);
    const [navLinks, setNavLinks] = useState<{ href: string; label: string }[]>(
        [],
    );
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
            }
        } else {
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
                    <Sheet>
                        <SheetTrigger asChild className="lg:hidden">
                            <div className="p-2">
                                <Menu className="h-6 w-6 text-green" />
                                <span className="sr-only">
                                    {t("menu.toggle")}
                                </span>
                            </div>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="w-[300px] animate-ease-in-out sm:w-[400px]"
                        >
                            <SheetHeader>
                                <SheetTitle className="font-cormorant text-2xl text-primary">
                                    {t("brand")}
                                </SheetTitle>
                            </SheetHeader>
                            <div className="mt-4 flex flex-col gap-4">
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
                                        className="w-full"
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
                </nav>
            </header>
        </>
    );
}
