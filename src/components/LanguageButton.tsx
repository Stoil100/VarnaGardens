"use client";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { usePathname, useRouter } from "@/i18n/routing";
import { Check } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function LanguageButton() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const languages = [
        { code: "en", label: "EN", flag: "/flags/en.svg" },
        { code: "bg", label: "БГ", flag: "/flags/bg.svg" },
        { code: "ru", label: "РУ", flag: "/flags/ru.svg" },
        { code: "el", label: "ΕΛ", flag: "/flags/el.svg" },
        { code: "uk", label: "УК", flag: "/flags/uk.svg" },
    ];

    const changeLanguage = (language: string) => {
        router.replace(pathname, { locale: language });
    };

    const currentLanguage =
        languages.find((lang) => lang.code === locale) || languages[0];

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-background p-1">
                        <Image
                            src={currentLanguage.flag}
                            alt={`${currentLanguage.label} flag`}
                            width={24}
                            height={24}
                            className="mr-1 rounded-full border drop-shadow-lg"
                        />
                        {currentLanguage.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[100px] gap-2 p-1">
                            {languages.map((language) => (
                                <li key={language.code}>
                                    <button
                                        onClick={() =>
                                            changeLanguage(language.code)
                                        }
                                        className="flex w-full items-center justify-between rounded-md p-2 text-sm hover:bg-accent"
                                    >
                                        <div className="flex items-center">
                                            <Image
                                                src={language.flag}
                                                alt={`${language.label} flag`}
                                                width={16}
                                                height={16}
                                                className="mr-2"
                                            />
                                            {language.label}
                                        </div>
                                        {locale === language.code && (
                                            <Check className="h-4 w-4" />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
