import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export default async function LocaleLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const messages = await getMessages();
    return (
        <NextIntlClientProvider messages={messages}>
            <Navigation />
            {children}
            <Footer />
        </NextIntlClientProvider>
    );
}
