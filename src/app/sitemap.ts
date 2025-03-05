import { collection, getDocs } from "firebase/firestore";
import { MetadataRoute } from "next";
import { db } from "../../firebase/firebase.config";

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

        const dynamicPaths = articlesSnapshot.docs.map((doc) => ({
            url: `${SITE_URL}/articles/${doc.id}`,
            lastModified: new Date(doc.data().date || Date.now()).toISOString(),
            priority: 0.9,
        }));

        const urls: MetadataRoute.Sitemap = [
            ...staticPaths.map((item) => ({
                url: `${SITE_URL}/${item.path}`,
                lastModified: new Date().toISOString(),
                priority: item.priority,
            })),
            ...dynamicPaths,
        ];

        return urls;
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return [];
    }
}
