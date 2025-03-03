import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import { Cormorant_Infant } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const cormorant = Cormorant_Infant({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-cormorant-infant",
    display: "swap",
});

const helvetica = localFont({
    src: [
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueUltraLight.otf",
            weight: "100",
            style: "normal",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueUltraLightItalic.otf",
            weight: "100",
            style: "italic",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueThin.otf",
            weight: "200",
            style: "normal",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueThinItalic.otf",
            weight: "200",
            style: "italic",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueLight.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueLightItalic.otf",
            weight: "300",
            style: "italic",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueRoman.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueItalic.ttf",
            weight: "400",
            style: "italic",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueMedium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueMediumItalic.otf",
            weight: "500",
            style: "italic",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueBold.otf",
            weight: "600",
            style: "normal",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueBoldItalic.otf",
            weight: "600",
            style: "italic",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueHeavy.otf",
            weight: "700",
            style: "normal",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueHeavyItalic.otf",
            weight: "700",
            style: "italic",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueBlack.otf",
            weight: "800",
            style: "normal",
        },
        {
            path: "./fonts/HelveticaNeue/HelveticaNeueBlackItalic.otf",
            weight: "800",
            style: "italic",
        },
    ],
    display: "swap",
    variable: "--font-helvetica-neue",
});

export const metadata: Metadata = {
    title: "Varna Gardens | Градинарски услуги във Варна",
    description:
        "Професионални градинарски услуги за вашия дом, офис или вила. Озеленяване, поддръжка и дизайн на градини във Варна и региона.",
    keywords: [
        "градинарски услуги",
        "озеленяване",
        "градини Варна",
        "поддръжка на градини",
        "дизайн на градини",
        "озеленяване Варна",
        "градинар Варна",
        "градински дизайнер",
        "градински услуги Варна",
        "подрязване на дървета",
        "поливни системи",
        "автоматично напояване",
        "засаждане на растения",
        "цветни градини",
        "декоративни растения",
        "оформяне на дворове",
        "поддръжка на тревни площи",
        "озеленяване на тераси",
        "вертикално озеленяване",
        "градинско осветление",
        "екологично градинарство",
        "растителна защита",
        "градински проекти",
        "естетическо озеленяване",
        "устойчиви градини",
        "сезонна поддръжка на градини",
        "ландшафтен дизайн",
        "озеленяване за фирми",
        "биологично градинарство",
        "професионален градинар",
        "изграждане на градини",
        "зелени пространства",
        "ландшафтни решения",
        "парк озеленяване",
        "поддръжка на вътрешни дворове",
        "градинарски услуги за бизнес",
        "озеленяване на хотели",
        "ботанически градини",
        "изграждане на алпинеуми",
        "естетика и природа",
        "създаване на красиви градини",
    ],
    icons: {
        icon: [
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
            { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
        shortcut: "/favicon-32x32.png",
        apple: "/apple-touch-icon.png",
    },
    authors: [{ name: "Varna Gardens", url: "https://varnagardens.bg" }],
    openGraph: {
        title: "Varna Gardens | Градинарски услуги във Варна",
        description:
            "Създаваме красиви и поддържани градини във Варна. Доверете се на професионалисти за озеленяване и грижа за вашите зелени пространства.",
        url: "https://varnagardens.com",
        siteName: "Varna Gardens",
        images: [
            {
                url: "https://varnagardens.com/logoText.png",
                width: 1200,
                height: 630,
                alt: "Красива градина, поддържана от Varna Gardens",
            },
        ],
        locale: "bg_BG",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        site: "@varnagardens",
        title: "Varna Gardens | Градинарски услуги във Варна",
        description:
            "Професионални градинарски услуги във Варна – озеленяване, поддръжка и дизайн на градини.",
        images: ["https://varnagardens.com/logoText.png"],
    },
};

export default async function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="bg">
            <body
                className={`${helvetica.variable} ${cormorant.variable} font-helvetica antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
