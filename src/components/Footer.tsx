import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import logo from "../../public/logo.svg";
import MainButton from "./MainButton";

export default function Footer() {
    const t = useTranslations("Footer");
    const navigationLinks = [
        { href: "/" },
        { href: "/services" },
        { href: "/gallery" },
        { href: "/contact" },
    ].map((navLink, index) => ({
        ...navLink,
        label: t(`navigation.links.${index}.label`),
    }));

    const socialMediaLinks = [
        { label: "Facebook", href: "https://facebook.com" },
        { label: "YouTube", href: "https://youtube.com" },
        { label: "Instagram", href: "https://instagram.com" },
    ];
    return (
        <footer className="w-full bg-zinc-900 px-4 pt-4 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="flex flex-col max-sm:items-center max-sm:text-center lg:col-span-2">
                        <div className="mb-4 flex items-center gap-3">
                            <Image
                                alt="logo"
                                src={logo}
                                className="h-10 w-10"
                            />
                            <h3 className="font-cormorant text-3xl sm:text-4xl">
                                {t("brand.name")}
                            </h3>
                        </div>
                        <p className="mt-2 text-gray-400">
                            {t("brand.description")}
                        </p>
                    </div>
                    <div className="flex flex-col max-sm:items-center">
                        <h2 className="mb-4 text-xl text-zinc-300 sm:text-2xl">
                            {t("navigation.title")}
                        </h2>
                        <ul className="space-y-2">
                            {navigationLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 transition-colors hover:text-zinc-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col max-sm:items-center">
                        <h2 className="mb-4 text-xl text-zinc-300 sm:text-2xl">
                            {t("socialMedia.title")}
                        </h2>
                        <ul className="space-y-2">
                            {socialMediaLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Visit our ${link.label}`}
                                        className="text-gray-400 transition-colors hover:text-zinc-300"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col max-sm:items-center max-sm:text-center">
                        <h2 className="mb-4 text-xl text-zinc-300 sm:text-2xl">
                            {t("contact.title")}
                        </h2>
                        <ul className="mb-4 space-y-2">
                            <li>
                                <a
                                    href={`tel:${t("contact.phone")}`}
                                    className="text-gray-400 transition-colors hover:text-zinc-300"
                                >
                                    {t("contact.phone")}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${t("contact.email")}`}
                                    className="text-gray-400 transition-colors hover:text-zinc-300"
                                >
                                    {t("contact.email")}
                                </a>
                            </li>
                        </ul>
                        <MainButton
                            className="w-auto border-white text-white hover:border-green"
                            variant="transparent"
                        >
                            <span>{t("contact.button")}</span>
                            <ArrowRight className="ml-2" />
                        </MainButton>
                    </div>
                </div>

                <hr className="border-zinc-700" />
                <div className="flex flex-col items-center justify-between py-6 text-sm text-gray-400 sm:flex-row">
                    <div>
                        &copy; {new Date().getFullYear()} Varna Gardens. All
                        Rights Reserved.
                    </div>
                    <div className="mt-2 sm:mt-0">
                        <a
                            href="/privacy"
                            className="transition-colors hover:text-zinc-300"
                        >
                            Privacy Policy
                        </a>
                        <span className="mx-2">|</span>
                        <a
                            href="/terms"
                            className="transition-colors hover:text-zinc-300"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
