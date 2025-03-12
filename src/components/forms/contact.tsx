"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageSquareWarning, Phone, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MainButton from "../MainButton";
import {
    ContactSchemaType,
    ContactSchema as formSchema,
} from "../schemas/contact";

type ContactFormProps = {
    t: (arg: string) => string;
};
export default function ContactForm({ t }: ContactFormProps) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<ContactSchemaType>({
        resolver: zodResolver(formSchema((key) => t(`errors.${key}`))),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
        },
    });

    async function onSubmit(values: ContactSchemaType) {
        setIsLoading(true);
        try {
            // await submitContactForm(values);
            toast.success(t("toast.success.title"), {
                description: t("toast.success.description"),
            });
            form.reset();
        } catch (error) {
            toast.error(t("toast.error.title"), {
                description: t("toast.error.description"),
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-md space-y-6 shadow-sm">
            <div className="space-y-2 text-center">
                <h2 className="text-4xl md:text-5xl">{t("title")}</h2>
                <p className="font-light text-gray-400">{t("subtitle")}</p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="flex gap-2">
                        <FormField
                            control={form!.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="flex items-center gap-1 font-light text-zinc-400">
                                        <User fontWeight={1} size={16} />
                                        {t("name.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-none bg-zinc-100 outline-none"
                                            placeholder={t("name.placeholder")}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form!.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel className="flex items-center gap-1 font-light text-zinc-400">
                                        <Mail fontWeight={1} size={16} />
                                        {t("email.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-none bg-zinc-100 outline-none"
                                            placeholder={t("email.placeholder")}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form!.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-1 font-light text-zinc-400">
                                    <Phone fontWeight={1} size={16} />
                                    {t("phone.label")}
                                </FormLabel>
                                <div className="flex items-center gap-2">
                                    <p className="flex h-9 items-center justify-center rounded-md bg-zinc-100 px-3 py-1 text-zinc-500">
                                        +359
                                    </p>
                                    <FormControl>
                                        <Input
                                            className="border-none bg-zinc-100 outline-none"
                                            placeholder={t("phone.placeholder")}
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form!.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel className="flex items-center gap-1 font-light text-zinc-400">
                                    <MessageSquareWarning
                                        fontWeight={1}
                                        size={16}
                                    />
                                    {t("message.label")}
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="max-h-[500px] border-none bg-zinc-100 outline-none"
                                        placeholder={t("message.placeholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <MainButton className="w-full" type="submit">
                        {t("submit")}
                    </MainButton>
                </form>
            </Form>
        </div>
    );
}
