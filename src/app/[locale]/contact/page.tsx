"use client";
import logo from "@/../public/logo.svg";
import ContactForm from "@/components/forms/contact";
import MainButton from "@/components/MainButton";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Bookmark, Mail, Phone, Smile } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface ContactItemProps {
    t?: (args: string) => string;
    icon: any;
    title: string;
    description: string;
    linkText?: string;
    linkHref?: string;
    buttonText?: string;
    dialogText?: string;
    isHighlighted?: boolean;
}

function ContactItem({
    t,
    icon: Icon,
    title,
    description,
    linkText,
    linkHref,
    buttonText,
    dialogText,
    isHighlighted = false,
}: ContactItemProps) {
    const router = useRouter();
    return (
        <div
            className={cn(
                "flex w-64 cursor-pointer flex-col items-start gap-4 rounded-lg border border-gray-200 bg-white p-2 shadow-md transition-all hover:scale-105 hover:shadow-lg md:p-4",
                isHighlighted && "border-2 border-green",
            )}
        >
            <div
                className={cn(
                    "rounded-md border p-1",
                    isHighlighted && "border-2 border-green",
                )}
            >
                <Icon
                    className={cn(
                        "h-6 w-6 text-muted-foreground",
                        isHighlighted && "text-green",
                    )}
                />
            </div>
            <div className="flex h-full w-full flex-col justify-between gap-2">
                <h3 className="text-xl font-normal">{title}</h3>
                <p className="text-sm font-light text-zinc-400">
                    {description}
                </p>
                {linkText && linkHref && (
                    <Link
                        href={linkHref}
                        className="text-sm underline underline-offset-4"
                    >
                        {linkText}
                    </Link>
                )}
                {buttonText && (
                    <MainButton
                        onClick={() => {
                            router.push("/booking");
                        }}
                        className="mt-2 w-full text-wrap text-left"
                    >
                        {buttonText}
                        <span className="ml-1">→</span>
                    </MainButton>
                )}
                {dialogText && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <MainButton variant="transparent">
                                {dialogText}
                            </MainButton>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle />
                            </DialogHeader>
                            <ContactForm t={(key) => t!(`form.${key}`)} />
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
}

export default function Contact() {
    const t = useTranslations("Pages.Contact");
    const faqKeys = ["faq1", "faq2", "faq3", "faq4", "faq5", "faq6"] as const;
    const contactData = [
        {
            icon: Mail,
            title: t("contactMethods.mail.title"),
            description: t("contactMethods.mail.description"),
            linkText: "varnagardens@gmail.com",
            linkHref: "mailto:varnagardens@gmail.com",
            dialogText: t("contactMethods.mail.dialog"),
            t,
        },
        {
            icon: Bookmark,
            title: t("contactMethods.booking.title"),
            description: t("contactMethods.booking.description"),
            buttonText: t("contactMethods.booking.buttonText"),
            isHighlighted: true,
        },
        {
            icon: Phone,
            title: t("contactMethods.phone.title"),
            description: t("contactMethods.phone.description"),
            linkText: "+359 889 432 671",
            linkHref: "tel:+359889432671",
        },
    ];
    return (
        <main className="min-h-screen w-full space-y-10 p-2 py-8 md:space-y-16 md:p-8 md:py-20">
            <section className="flex w-full flex-col items-center justify-center gap-2 text-center">
                <Image alt="logo" src={logo} className="size-24" />
                <h1 className="text-4xl font-normal md:text-6xl">
                    {t("title")}
                </h1>
                <h4 className="text-xl font-light text-zinc-400 md:text-2xl">
                    {t("subtitle")}
                </h4>
            </section>
            <section className="container mx-auto">
                <div className="grid gap-6 md:grid-cols-3 xl:gap-0">
                    {contactData.map((item, index) => (
                        <div className="flex justify-center" key={index}>
                            <ContactItem {...item} />
                        </div>
                    ))}
                </div>
            </section>
            <section className="flex w-full flex-col items-center justify-center gap-8 p-2">
                <h2 className="text-center text-4xl font-normal md:text-5xl">
                    {t("faq.title")}
                </h2>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full max-w-lg"
                >
                    {faqKeys.map((key, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="flex gap-4 text-base font-normal">
                                <div className="flex w-full items-center gap-6 text-lg">
                                    <div className="rounded-md border-2 p-1">
                                        <Smile className="h-5 w-5 shrink-0 text-muted-foreground" />
                                    </div>
                                    <h4>{t(`faq.${key}.question`)}</h4>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-9">
                                {t(`faq.${key}.answer`)}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        </main>
    );
}
