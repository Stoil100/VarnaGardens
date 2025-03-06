import { collection, getDocs } from "firebase/firestore";
import { MetadataRoute } from "next";
import { db } from "../../firebase/firebase.config";

const LOCALES = ["en", "bg", "ru", "el", "uk"];

const SITE_URL = "https://varnagardens.com";

const staticPaths = [
    { path: "", priority: 1.0 },
    { path: "contact", priority: 0.5 },
    { path: "booking", priority: 0.6 },
    { path: "articles", priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const articlesSnapshot = await getDocs(collection(db, "articles"));

        const dynamicPaths = articlesSnapshot.docs.flatMap((doc) =>
            LOCALES.map((locale) => ({
                url: `${SITE_URL}/${locale}/articles/${doc.id}`,
                lastModified: new Date(
                    doc.data().date || Date.now(),
                ).toISOString(),
                priority: 0.9,
            })),
        );

        const staticUrls = staticPaths.flatMap((item) =>
            LOCALES.map((locale) => ({
                url: `${SITE_URL}/${locale}/${item.path}`,
                lastModified: new Date().toISOString(),
                priority: item.priority,
            })),
        );

        return [...staticUrls, ...dynamicPaths];
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [];
    }
}
