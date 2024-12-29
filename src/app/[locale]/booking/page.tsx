"use client";
import logo from "@/../public/logo.svg";
import logoText from "@/../public/logoText.png";
import MainButton from "@/components/MainButton";
import { BookingSchema, BookingSchemaType } from "@/components/schemas/booking";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import AutoHeight from "embla-carousel-auto-height";
import {
    ChevronLeft,
    CircleCheckBig,
    Flower,
    Flower2,
    Mail,
    MapPin,
    Phone,
    Sprout,
    TreeDeciduous,
    User,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="flex h-fit w-fit gap-2 bg-transparent">
        <div className="h-2 w-12 rounded-full bg-green" />
        <div
            className={cn(
                "h-2 w-8 rounded-full bg-zinc-300 transition-all",
                progress >= 2 && "w-12 bg-green",
            )}
        />
        <div
            className={cn(
                "h-2 w-8 rounded-full bg-zinc-300 transition-all",
                progress >= 3 && "w-12 bg-green",
            )}
        />
    </div>
);

const ScrollPrevButton: React.FC<{
    scrollPrev: (() => void | undefined) | undefined;
}> = ({ scrollPrev }) => {
    const t = useTranslations("Pages.Booking");
    return (
        <Button
            type="button"
            className="absolute -left-2 top-0 text-xl font-light text-zinc-400"
            variant="ghost"
            onClick={scrollPrev}
        >
            <ChevronLeft />
            <p className="max-md:sr-only">{t("goBackButton")}</p>
        </Button>
    );
};

type CarouselItemsProps = {
    t: (arg: string) => string;
    scrollNext?: () => void | undefined;
    scrollPrev?: () => void | undefined;
    router?: AppRouterInstance;
    form?: UseFormReturn<BookingSchemaType>;
    progress?: number;
};
const CarouselHeroItem: React.FC<CarouselItemsProps> = ({ t, scrollNext }) => (
    <CarouselItem className="flex h-fit min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
        <Image src={logoText} alt={t("logoAlt")} className="max-md:max-w-40" />
        <h2 className="text-3xl md:text-6xl">{t("title")}</h2>
        <p className="text-xl font-light text-zinc-400 md:text-2xl">
            {t("subtitle")}
        </p>
        <MainButton type="button" onClick={scrollNext}>
            {t("button")}
        </MainButton>
    </CarouselItem>
);

const CarouselFormBaseItem: React.FC<CarouselItemsProps> = ({
    t,
    scrollNext,
    scrollPrev,
    form,
    progress,
}) => {
    const [isReady, setIsReady] = useState(false);
    const { watch, getFieldState, formState } = form!;
    const watchedBaseFields = watch(["name", "email", "phone", "address"]);
    useEffect(() => {
        const hasErrors =
            getFieldState("name").invalid ||
            getFieldState("email").invalid ||
            getFieldState("phone").invalid ||
            getFieldState("address").invalid;

        const areFieldsEmpty =
            !watchedBaseFields[0] ||
            !watchedBaseFields[1] ||
            !watchedBaseFields[2] ||
            !watchedBaseFields[3];

        setIsReady(!hasErrors && !areFieldsEmpty);
    }, [watchedBaseFields, formState]);
    return (
        <CarouselItem className="relative flex h-fit min-h-screen w-screen flex-col items-center justify-between gap-4 p-4 text-center">
            <ScrollPrevButton scrollPrev={scrollPrev} />
            <div />
            <div className="max-w-lg space-y-4 md:space-y-8">
                <div className="space-y-4">
                    <h3 className="text-2xl md:text-5xl">{t("title")}</h3>
                    <h5 className="text-lg font-light text-zinc-400 md:text-2xl">
                        {t("subtitle")}
                    </h5>
                </div>
                <div className="w-full space-y-6">
                    <FormField
                        control={form!.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
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
                            <FormItem>
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
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center gap-1 font-light text-zinc-400">
                                    <MapPin fontWeight={1} size={16} />
                                    {t("address.label")}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="border-none bg-zinc-100 outline-none"
                                        placeholder={t("address.placeholder")}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <MainButton
                    type="button"
                    onClick={scrollNext}
                    disabled={!isReady}
                >
                    {t("continue")}
                </MainButton>
            </div>
            <ProgressBar progress={progress!} />
        </CarouselItem>
    );
};

const CarouselFormOptionItem: React.FC<CarouselItemsProps> = ({
    t,
    scrollNext,
    scrollPrev,
    form,
    progress,
}) => {
    const { watch, getFieldState } = form!;
    const watchedOptionField = watch("option");
    return (
        <CarouselItem className="relative flex h-fit min-h-screen w-screen flex-col items-center justify-between gap-4 p-4 text-center">
            <ScrollPrevButton scrollPrev={scrollPrev} />
            <div />
            <div className="max-w-3xl space-y-4 md:space-y-8">
                <div className="space-y-2 md:space-y-4">
                    <h3 className="text-2xl md:text-5xl">{t("title")}</h3>
                    <h5 className="text-base font-light text-zinc-400 md:text-2xl">
                        {t("subtitle")}
                    </h5>
                </div>
                <div>
                    <FormField
                        control={form!.control}
                        name="option"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex flex-col items-center gap-4 md:flex-row md:gap-8"
                                    >
                                        <FormItem
                                            className={cn(
                                                "flex max-w-sm flex-col gap-2 rounded-xl border border-zinc-300 p-2 font-light transition-all md:rounded-3xl md:p-4",
                                                field.value === "subscription" &&
                                                    "border-2 border-green md:scale-105",
                                            )}
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <FormLabel className="text-xl font-light md:text-3xl">
                                                    {t("plan.title")}
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value="subscription"
                                                        className={cn(
                                                            "size-8 border-zinc-200 fill-green stroke-none ring-0 transition-colors",
                                                            field.value ===
                                                                "subscription" &&
                                                                "border-2 border-green",
                                                        )}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormDescription className="text-md text-left">
                                                {t("plan.description")}
                                            </FormDescription>
                                        </FormItem>
                                        <FormItem
                                            className={cn(
                                                "flex max-w-sm flex-col gap-2 rounded-xl border border-zinc-300 p-2 font-light transition-all md:rounded-3xl md:p-4",
                                                field.value === "service" &&
                                                    "border-2 border-green md:scale-105",
                                            )}
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <FormLabel className="text-xl font-light md:text-3xl">
                                                    {t("service.title")}
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value="service"
                                                        className={cn(
                                                            "size-8 border-zinc-200 fill-green stroke-none ring-0 transition-colors",
                                                            field.value ===
                                                                "service" &&
                                                                "border-2 border-green",
                                                        )}
                                                    />
                                                </FormControl>
                                            </div>
                                            <FormDescription className="text-md text-left">
                                                {t("service.description")}
                                            </FormDescription>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <MainButton
                    type="button"
                    onClick={scrollNext}
                    disabled={
                        !watchedOptionField || getFieldState("option").invalid
                    }
                >
                    {t("continue")}
                </MainButton>
            </div>
            <ProgressBar progress={progress!} />
        </CarouselItem>
    );
};

type PlanCardProps = {
    t: (arg: string) => string;
    value: "standart" | "deluxe" | "premium";
    icon: React.ReactNode;
    title: string;
    description: string;
    features: string[];
    popular?: boolean;
};
const PlanCard: React.FC<
    PlanCardProps & { isSelected: boolean; onClick: () => void }
> = ({
    t,
    icon,
    title,
    description,
    features,
    popular = false,
    isSelected,
    onClick,
}) => {
    return (
        <div
            className={cn(
                "relative flex flex-col gap-3 rounded-xl border p-2 font-light shadow-lg transition-all md:max-w-sm md:gap-4 md:rounded-2xl md:px-4 md:py-6",
                popular ? "mt-8 border-green bg-white" : "border-gray-300",
                isSelected && "border-green bg-green-50",
            )}
        >
            {popular && (
                <div className="absolute -top-6 left-1/2 -z-10 h-1/6 w-full -translate-x-1/2 transform rounded-t-xl bg-green px-4 py-1 text-center text-sm font-extralight text-white outline outline-1 outline-green md:-top-8 md:rounded-t-2xl md:text-lg">
                    {t("planCards.popularLabel")}
                </div>
            )}
            {isSelected && (
                <CircleCheckBig className="absolute right-2 top-2 text-green" />
            )}
            <div className="flex flex-row gap-2 max-md:items-center md:flex-col">
                <div
                    className={cn(
                        "!z-50 flex h-12 w-12 items-center justify-center rounded-full",
                        popular
                            ? "bg-green text-white"
                            : "bg-gray-100 text-green",
                    )}
                >
                    {icon}
                </div>

                <h3 className="text-2xl md:text-3xl">{title}</h3>
            </div>
            <p className="text-zinc-500">{description}</p>
            <MainButton
                type="button"
                onClick={onClick}
                variant={isSelected ? "default" : "transparent"}
                className="my-2"
            >
                {isSelected
                    ? t("planCards.buttonSelected")
                    : t("planCards.button")}
            </MainButton>
            <ul className="space-y-2 text-sm text-gray-600 max-md:hidden">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <span className="text-green">✔</span> {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
};

type FormFinalFieldsProps = {
    t: (arg: string) => string;
    form: UseFormReturn<BookingSchemaType>;
};
const FormInvestFields: React.FC<FormFinalFieldsProps> = ({ t, form }) => {
    const plans: PlanCardProps[] = [
        {
            t: t,
            value: "standart",
            icon: <Sprout />,
            title: t("planCards.standard.title"),
            description: t("planCards.standard.description"),
            features: [
                t("planCards.standard.features.0"),
                t("planCards.standard.features.1"),
                t("planCards.standard.features.2"),
                t("planCards.standard.features.3"),
            ],
        },
        {
            t: t,
            value: "deluxe",
            icon: <Flower2 />,
            title: t("planCards.deluxe.title"),
            description: t("planCards.deluxe.description"),
            features: [
                t("planCards.deluxe.features.0"),
                t("planCards.deluxe.features.1"),
                t("planCards.deluxe.features.2"),
                t("planCards.deluxe.features.3"),
            ],
            popular: true,
        },
        {
            t: t,
            value: "premium",
            icon: <TreeDeciduous />,
            title: t("planCards.premium.title"),
            description: t("planCards.premium.description"),
            features: [
                t("planCards.premium.features.0"),
                t("planCards.premium.features.1"),
                t("planCards.premium.features.2"),
                t("planCards.premium.features.3"),
            ],
        },
    ];
    return (
        <div>
            <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                        <div className="flex flex-col items-center justify-center space-y-2 text-center">
                            <FormLabel className="text-2xl font-normal md:text-5xl">
                                {t("title")}
                            </FormLabel>
                            <FormDescription className="text-base font-light md:text-xl">
                                {t("description")}
                            </FormDescription>
                        </div>
                        <FormControl>
                            <div className="grid w-full grid-cols-1 content-center gap-4 p-2 md:grid-cols-3 md:gap-6 md:p-8">
                                {plans.map((plan, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-center"
                                    >
                                        <PlanCard
                                            {...plan}
                                            isSelected={
                                                field.value === plan.value
                                            }
                                            onClick={() =>
                                                field.onChange(plan.value)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};
const FormServicesFields: React.FC<FormFinalFieldsProps> = ({ t, form }) => {
    const services = [
        {
            value: "cleanup",
            icon: <Flower size={38} />,
            title: t("cleanup.title"),
            description: t("cleanup.description"),
        },
        {
            value: "care",
            icon: <Flower size={38} />,
            title: t("care.title"),
            description: t("care.description"),
        },
        {
            value: "protection",
            icon: <Flower size={38} />,
            title: t("protection.title"),
            description: t("protection.description"),
        },
        {
            value: "invest",
            icon: <Flower size={38} />,
            title: t("invest.title"),
            description: t("invest.description"),
        },
        {
            value: "grass",
            icon: <Flower size={38} />,
            title: t("grass.title"),
            description: t("grass.description"),
        },
        {
            value: "water",
            icon: <Flower size={38} />,
            title: t("water.title"),
            description: t("water.description"),
        },
    ];
    return (
        <div>
            <FormField
                control={form!.control}
                name="services"
                render={() => (
                    <FormItem>
                        <h2 className="mb-4 text-center text-2xl font-normal md:text-5xl">
                            {t("title")}
                        </h2>
                        <div className="flex max-w-3xl flex-wrap justify-center gap-4 md:justify-between">
                            {services.map((service) => (
                                <FormField
                                    key={service.value}
                                    control={form.control}
                                    name="services"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={service.value}
                                                className={cn(
                                                    "relative flex w-full max-w-xs flex-col justify-between rounded-2xl border px-2 py-1 transition-all md:items-center md:px-4 md:text-center",
                                                    field.value?.includes(
                                                        service.value,
                                                    ) &&
                                                        "scale-105 border-2 border-green",
                                                )}
                                            >
                                                <div />
                                                <FormControl className="absolute right-2 top-2">
                                                    <Checkbox
                                                        className="size-7 rounded-full border-zinc-200 data-[state=checked]:border-green data-[state=checked]:bg-green"
                                                        checked={field.value?.includes(
                                                            service.value,
                                                        )}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            field.onChange(
                                                                checked
                                                                    ? [
                                                                          ...(field.value ||
                                                                              []),
                                                                          service.value,
                                                                      ]
                                                                    : field.value?.filter(
                                                                          (
                                                                              value,
                                                                          ) =>
                                                                              value !==
                                                                              service.value,
                                                                      ),
                                                            );
                                                        }}
                                                    />
                                                </FormControl>
                                                <div className="flex items-center gap-2 max-md:w-5/6 max-md:self-start md:flex-col">
                                                    <div
                                                        className={cn(
                                                            "h-fit rounded-xl border-2",
                                                            field.value?.includes(
                                                                service.value,
                                                            ) && "border-green",
                                                        )}
                                                    >
                                                        {service.icon}
                                                    </div>
                                                    <FormLabel className="text-lg font-normal md:text-2xl">
                                                        {service.title}
                                                    </FormLabel>
                                                </div>
                                                <FormDescription className="text-md font-light">
                                                    {service.description}
                                                </FormDescription>
                                            </FormItem>
                                        );
                                    }}
                                />
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
};
const CarouselFormFinalItem: React.FC<CarouselItemsProps> = ({
    t,
    scrollNext,
    scrollPrev,
    form,
    progress,
}) => {
    const { watch, getFieldState } = form!;
    const watchedOptionField = watch("option");
    const watchedPlansField = watch("plan");
    const watchedServiceField = watch("services");
    return (
        <CarouselItem className="relative flex h-fit min-h-screen w-full flex-col items-center justify-between gap-2 p-4">
            <ScrollPrevButton scrollPrev={scrollPrev} />
            <div />
            <div className="flex flex-col items-center gap-3">
                {watchedOptionField === "subscription" && (
                    <FormInvestFields
                        t={(key) => t(`plans.${key}`)}
                        form={form!}
                    />
                )}
                {watchedOptionField === "service" && (
                    <FormServicesFields
                        t={(key) => t(`services.${key}`)}
                        form={form!}
                    />
                )}
                <MainButton
                    type="submit"
                    disabled={
                        form?.formState.isValid && watchedOptionField
                            ? watchedOptionField === "service"
                                ? !watchedServiceField ||
                                  getFieldState("services").invalid
                                : watchedOptionField === "subscription"
                                  ? !watchedPlansField ||
                                    getFieldState("plan").invalid
                                  : true
                            : true
                    }
                    onClick={scrollNext}
                >
                    {t("submit")}
                </MainButton>
            </div>
            <ProgressBar progress={progress!} />
        </CarouselItem>
    );
};
const CarouselFooterItem: React.FC<CarouselItemsProps> = ({ t, router }) => (
    <CarouselItem className="flex h-fit min-h-screen w-full flex-col items-center justify-between py-8 text-center">
        <div className="-ml-4 flex items-center justify-center gap-2">
            <Image src={logo} alt={t("logoAlt")} className="size-8" />
            <h5 className="font-cormorant text-2xl text-green">
                Varna Gardens
            </h5>
        </div>
        <div className="-ml-4 flex flex-col items-center justify-center gap-4">
            <CircleCheckBig className="size-16 text-green md:size-32" />
            <h3 className="text-3xl md:text-5xl">{t("thankYou")}</h3>
            <p className="max-w-xl text-center text-lg font-light text-zinc-500 md:text-2xl">
                {t("message")}
            </p>
        </div>
        <MainButton
            type="button"
            onClick={() => router!.push("/")}
            className="-ml-4"
        >
            {t("button")}
        </MainButton>
    </CarouselItem>
);
export default function Booking() {
    const t = useTranslations("Pages.Booking");
    const router = useRouter();
    const [api, setApi] = useState<CarouselApi>();
    const formSchema = BookingSchema(t);
    const [currentIndex, setCurrentIndex] = useState(0);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address: "",
            option: undefined,
            plan: undefined,
            services: undefined,
        },
    });
    const progress = currentIndex > 0 && currentIndex < 4 ? currentIndex : 0;

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        scrollNext();
    }
    const scrollNext = () => {
        progress === 2 && api?.reInit();
        window.scrollTo({ top: 0 });
        api?.scrollNext();
        setCurrentIndex((prev) => Math.min(prev + 1, 4));
    };

    const scrollPrev = () => {
        window.scrollTo({ top: 0 });
        api?.scrollPrev();
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };
    return (
        <main>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Carousel
                        className="w-full"
                        setApi={setApi}
                        opts={{
                            watchDrag: false,
                        }}
                        plugins={[AutoHeight()]}
                        onKeyDownCapture={() => {}}
                        autoFocus={true}
                    >
                        <CarouselContent className="ml-0">
                            <CarouselHeroItem
                                scrollNext={scrollNext}
                                t={(key) => t(`hero.${key}`)}
                            />
                            <CarouselFormBaseItem
                                form={form}
                                scrollNext={scrollNext}
                                scrollPrev={scrollPrev}
                                t={(key) => t(`form.base.${key}`)}
                                progress={progress}
                            />
                            <CarouselFormOptionItem
                                form={form}
                                scrollNext={scrollNext}
                                scrollPrev={scrollPrev}
                                t={(key) => t(`form.option.${key}`)}
                                progress={progress}
                            />
                            <CarouselFormFinalItem
                                form={form}
                                scrollNext={scrollNext}
                                scrollPrev={scrollPrev}
                                t={(key) => t(`form.final.${key}`)}
                                progress={progress}
                            />
                            <CarouselFooterItem
                                t={(key) => t(`footer.${key}`)}
                                router={router}
                            />
                        </CarouselContent>
                    </Carousel>
                </form>
            </Form>
        </main>
    );
}
