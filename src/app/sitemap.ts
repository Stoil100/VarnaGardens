import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../firebase/firebase.config";

const SITE_URL = "https://varnagardens.com";
const staticPaths = [
    { path: "", priority: 1.0 },
    { path: "contact", priority: 0.5 },
    { path: "booking", priority: 0.6 },
    { path: "articles", priority: 0.8 },
];

export async function GET() {
    try {
        const articlesSnapshot = await getDocs(collection(db, "articles"));
        const dynamicPaths = articlesSnapshot.docs.map((doc) => ({
            loc: `articles/${doc.id}`,
            lastmod: doc.data().date || new Date().toISOString().split("T")[0],
            priority: 0.9,
        }));

        const urls = [
            ...staticPaths.map((item) => ({
                loc: `${SITE_URL}/${item.path}`,
                lastmod: new Date().toISOString().split("T")[0],
                priority: item.priority,
            })),
            ...dynamicPaths.map((path) => ({
                loc: `${SITE_URL}/${path.loc}`,
                lastmod: path.lastmod,
                priority: path.priority,
            })),
        ];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls
            .map(
                (url) => `
          <url>
            <loc>${url.loc}</loc>
            <lastmod>${url.lastmod}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>${url.priority}</priority>
          </url>`,
            )
            .join("")}
      </urlset>`;

        return new NextResponse(sitemap, {
            headers: {
                "Content-Type": "application/xml",
            },
        });
    } catch (error) {
        console.error("Error generating sitemap:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
