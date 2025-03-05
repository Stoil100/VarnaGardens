import { NextResponse } from "next/server";

export async function GET() {
    const robotsTxt = `
    User-agent: *
    Disallow: /admin/
    Disallow: /api/

    Sitemap: https://varnagardens.com/sitemap.xml
  `;

    return new NextResponse(robotsTxt, {
        headers: {
            "Content-Type": "text/plain",
        },
    });
}
