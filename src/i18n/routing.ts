import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "bg", "ru", "el", "uk"],
    defaultLocale: "bg",
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
