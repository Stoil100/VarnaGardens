import { MetadataRoute } from "next";

// Define locales used in next-intl

const LOCALES = ["en", "bg", "ru", "el", "uk"]; // Add more if needed
const SITE_URL = "https://varnagardens.com";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    ...LOCALES.map((locale) => `/${locale}/admin/`),
                    "/api/",
                ],
            },
        ],
        sitemap: LOCALES.map((locale) => `${SITE_URL}/${locale}/sitemap.xml`),
    };
}
