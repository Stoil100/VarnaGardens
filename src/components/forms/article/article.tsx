"use client";

import MainButton from "@/components/MainButton";
import {
    ArticlesSchema,
    ArticlesSchemaType,
} from "@/components/schemas/article";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { db } from "../../../../firebase/firebase.config";
import { Descriptions } from "./descriptions";
import { Docs } from "./docs";
import { Lists } from "./lists";
import { TitleDescriptions } from "./titleDescriptions";

export function ArticleForm() {
    const t = useTranslations("Pages.Admin.forms.article");
    const formSchema = ArticlesSchema(t);
    const form = useForm<ArticlesSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            heroImage: "",
            type: "standard",
        },
    });

    async function onSubmit(values: ArticlesSchemaType) {
        function getDate() {
            const today = new Date();
            const month = today.getMonth() + 1;
            const year = today.getFullYear();
            const date = today.getDate();
            return `${date}/${month}/${year}`;
        }
        await addDoc(collection(db, "articles"), {
            ...values,
            date: getDate(),
        });
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("title")}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="heroImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("heroImage")}</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <TitleDescriptions
                    control={form.control}
                    name="titleDescriptions"
                    t={(key) => t(`titleDescriptions.${key}`)}
                />

                <Descriptions
                    control={form.control}
                    name="descriptions"
                    t={(key) => t(`descriptions.${key}`)}
                />

                <Lists
                    control={form.control}
                    name="lists"
                    t={(key) => t(`lists.${key}`)}
                />

                <Docs
                    control={form.control}
                    name="docs"
                    t={(key) => t(`docs.${key}`)}
                />

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("type.label")}</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="standard" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {t("type.options.standard")}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="notable" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {t("type.options.notable")}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="important" />
                                        </FormControl>
                                        <FormLabel className="font-normal">
                                            {t("type.options.important")}
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
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
    );
}
