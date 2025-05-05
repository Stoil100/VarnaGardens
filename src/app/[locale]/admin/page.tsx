"use client";

import { useRouter } from "@/i18n/routing";
import { LogOut } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

import ArticleUploadSection from "@/components/admin/ArticleUploadSection";
import BookingsList from "@/components/admin/BookingsList";
import ContactsList from "@/components/admin/InquiriesList";
import NoPermissionView from "@/components/admin/NoPermission";
import AuthForm from "@/components/forms/auth/auth";
import LoadingOverlay from "@/components/Loading";
import MainButton from "@/components/MainButton";
import { useAuth } from "@/components/Providers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Admin() {
    const t = useTranslations("Pages.Admin");
    const router = useRouter();
    const { user, logOut } = useAuth();
    const [loading, setIsLoading] = useState(false);

    if (!user.uid) {
        return (
            <main className="min-h-screen p-2 md:p-4">
                {loading && <LoadingOverlay />}
                <div className="flex h-screen flex-col items-center justify-center gap-4">
                    <Tabs defaultValue="login" className="w-full max-w-lg">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">
                                {t("tabs.login")}
                            </TabsTrigger>
                            <TabsTrigger value="register">
                                {t("tabs.register")}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="login">
                            <AuthForm
                                variant="login"
                                t={(key) => t(`forms.auth.${key}`)}
                            />
                        </TabsContent>
                        <TabsContent value="register">
                            <AuthForm
                                variant="register"
                                t={(key) => t(`forms.auth.${key}`)}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        );
    }

    if (!user.approved) {
        return (
            <NoPermissionView
                t={(key) => t(`noPermission.${key}`)}
                router={router}
                logOut={logOut}
            />
        );
    }

    return (
        <main className="min-h-screen p-2 md:p-4">
            {loading && <LoadingOverlay />}
            <section className="space-y-8">
                <ArticleUploadSection t={t} />

                <ContactsList
                    t={(key) => t(`inquiries.${key}`)}
                    setIsLoading={setIsLoading}
                />

                <BookingsList
                    t={(key) => t(`bookings.${key}`)}
                    setIsLoading={setIsLoading}
                />

                <div className="flex w-full justify-center">
                    <MainButton onClick={logOut} className="w-full">
                        {t("logout")} <LogOut className="ml-2 h-4 w-4" />
                    </MainButton>
                </div>
            </section>
        </main>
    );
}
