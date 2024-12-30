import { AuthContextProvider } from "@/components/Providers";


export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <AuthContextProvider>{children}</AuthContextProvider>;
}
