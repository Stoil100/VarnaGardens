"use client";
import MainButton from "@/components/MainButton";
import { BookingSchema, BookingSchemaType } from "@/components/schemas/booking";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Link, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Article } from "@/models/article";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
    addDoc,
    collection,
    getDocs,
    limit,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import {
    ArrowLeft,
    ArrowRight,
    BookMarked,
    Calendar,
    ChevronsUpDown,
    CircleCheckBig,
    Flower2,
    Info,
    Mail,
    MapPin,
    PencilRuler,
    Phone,
    Shovel,
    Sprout,
    TreeDeciduous,
    User,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useCallback, useEffect, useState } from "react";
import CountUp from "react-countup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { db } from "../../../firebase/firebase.config";

type SectionProps = {
    t?: (arg: string) => string;
    router?: AppRouterInstance;
};
const HeroBookingForm: React.FC<SectionProps> = ({ t }) => {
    const locale = useLocale();
    const formSchema = BookingSchema((key) => t!(`errors.${key}`));
    const [isSubmited, setIsSubmited] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<BookingSchemaType>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address: "",
            option: "service",
            services: ["mowing"],
        },
    });
    async function onSubmit(values: BookingSchemaType) {
        try {
            const docRef = await addDoc(collection(db, "bookings"), {
                ...values,
                status: "pending",
            });
            await axios.post("/api/mail", {
                values,
                status: "pending",
                id: docRef.id,
                locale: locale,
            });
        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            setIsSubmited(true);
        }
    }
    return (
        <div className="relative overflow-hidden md:drop-shadow-xl">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6"
                >
                    <div className="flex items-center justify-between gap-2">
                        <BookMarked />
                        <h3 className="text-2xl">{t!("title")}</h3>
                    </div>
                    <div className="w-full space-y-4">
                        <FormField
                            control={form!.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-md flex items-center gap-1 font-light text-zinc-400">
                                        <User fontWeight={1} size={16} />
                                        {t!("name.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-none bg-zinc-100 outline-none"
                                            placeholder={t!("name.placeholder")}
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
                                    <FormLabel className="text-md flex items-center gap-1 font-light text-zinc-400">
                                        <Mail fontWeight={1} size={16} />
                                        {t!("email.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-none bg-zinc-100 outline-none"
                                            placeholder={t!(
                                                "email.placeholder",
                                            )}
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
                                    <FormLabel className="text-md flex items-center gap-1 font-light text-zinc-400">
                                        <Phone fontWeight={1} size={16} />
                                        {t!("phone.label")}
                                    </FormLabel>
                                    <div className="flex items-center gap-2">
                                        <p className="flex h-9 items-center justify-center rounded-md bg-zinc-100 px-3 py-1 text-zinc-500">
                                            +359
                                        </p>
                                        <FormControl>
                                            <Input
                                                className="border-none bg-zinc-100 outline-none"
                                                placeholder={t!(
                                                    "phone.placeholder",
                                                )}
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
                                    <FormLabel className="text-md flex items-center gap-1 font-light text-zinc-400">
                                        <MapPin fontWeight={1} size={16} />
                                        {t!("address.label")}
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="border-none bg-zinc-100 outline-none"
                                            placeholder={t!(
                                                "address.placeholder",
                                            )}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="services"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-md flex items-center gap-1 font-light text-zinc-400">
                                        <PencilRuler fontWeight={1} size={16} />
                                        {t!("services.label")}
                                    </FormLabel>
                                    <Popover
                                        open={isOpen}
                                        onOpenChange={setIsOpen}
                                    >
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={isOpen}
                                                    className={cn(
                                                        "w-full justify-between border-none bg-zinc-100 font-normal text-muted-foreground",
                                                    )}
                                                >
                                                    {field.value!.length > 0
                                                        ? field
                                                              .value!.map(
                                                                  (service) =>
                                                                      t!(
                                                                          `services.${service}`,
                                                                      ),
                                                              )
                                                              .join(", ")
                                                        : t!(
                                                              "services.placeholder",
                                                          )}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full! space-y-2">
                                            {[
                                                "mowing",
                                                "shaping",
                                                "pruning",
                                                "fertilizing",
                                                "irrigation",
                                                "weeding",
                                            ].map((service) => (
                                                <div
                                                    key={service}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <Checkbox
                                                        className="size-6 rounded-full border-zinc-200 data-[state=checked]:border-green data-[state=checked]:bg-green"
                                                        id={service}
                                                        checked={field.value!.includes(
                                                            service.toString(),
                                                        )}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            const updatedValue =
                                                                checked
                                                                    ? [
                                                                          ...field.value!,
                                                                          service,
                                                                      ]
                                                                    : field.value!.filter(
                                                                          (
                                                                              val,
                                                                          ) =>
                                                                              val !==
                                                                              service,
                                                                      );

                                                            if (
                                                                updatedValue.length <=
                                                                3
                                                            ) {
                                                                field.onChange(
                                                                    updatedValue,
                                                                );
                                                            } else {
                                                                toast.error(
                                                                    t!(
                                                                        "errors.services.max",
                                                                    ),
                                                                );
                                                            }
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={service}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {t!(
                                                            `services.${service}`,
                                                        )}
                                                    </label>
                                                </div>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <MainButton
                            type="submit"
                            disabled={!form?.formState.isValid || isSubmited}
                            variant="transparent"
                            className="w-full"
                        >
                            {t!("submit")}
                        </MainButton>
                        <MainButton
                            type="button"
                            className="h-full rounded-full p-3 text-xl"
                        >
                            <Phone />
                        </MainButton>
                    </div>
                </form>
            </Form>
            <div
                className={cn(
                    "bg-whi absolute left-0 top-0 z-10 hidden h-full w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 text-center",
                    isSubmited && "flex animate-fade-left",
                )}
            >
                <CircleCheckBig size={128} className="mb-4 text-green" />
                <h2 className="text-4xl">{t!("submitted.title")}</h2>
                <h5 className="text-xl font-light">
                    {t!("submitted.description")}
                </h5>
            </div>
        </div>
    );
};
const HeroSection: React.FC<SectionProps> = ({ t, router }) => {
    return (
        <section
            id="hero"
            className="min-h-[700px] w-full space-y-4 p-2 md:h-screen md:p-8"
        >
            <div className="flex h-full w-full items-center justify-between rounded-2xl bg-[url('/heroBG.png')] bg-cover bg-center bg-no-repeat p-8 md:rounded-3xl md:p-14 lg:p-20 xl:p-28">
                <div className="flex h-full max-h-[500px] flex-col items-center justify-between gap-4 text-center text-white md:max-w-xs md:items-start md:text-left lg:max-w-lg xl:max-w-2xl 2xl:max-w-3xl">
                    <div className="space-y-4 md:space-y-8">
                        <h2 className="font-cormorant text-4xl md:text-5xl xl:text-6xl">
                            {t!("title")}
                        </h2>
                        <MainButton
                            className="hover:bg-white md:px-6 md:text-2xl"
                            onClick={() => {
                                router!.push("/contact");
                            }}
                        >
                            {t!("button")}
                        </MainButton>
                    </div>
                    <p className="text-xl font-extralight md:max-w-xs">
                        {t!("description")}
                    </p>
                </div>
                <div className="hidden md:block xl:min-w-[400px]">
                    <HeroBookingForm t={(key) => t!(`form.${key}`)} />
                </div>
            </div>
            <div className="flex justify-center md:hidden">
                <HeroBookingForm t={(key) => t!(`form.${key}`)} />
            </div>
        </section>
    );
};
type PlanCardProps = {
    icon: React.ReactNode;
    badge: {
        frequency: string;
        info: string;
    };
    title: string;
    description: string;
    features: string[];
    popular?: boolean;
    target: string;
    ideal: string;
    t: (args: string) => string;
};
const PlanCard: React.FC<PlanCardProps> = ({
    icon,
    badge,
    title,
    description,
    features,
    target,
    ideal,
    popular = false,
    t,
}) => {
    return (
        <Link
            href="/booking"
            className={cn(
                "relative flex flex-col gap-4 rounded-2xl border px-4 py-6 font-light shadow-lg transition-all md:max-w-xs",
                popular ? "mt-8 border-green bg-green-50" : "border-gray-300",
            )}
        >
            {popular && (
                <div className="absolute -top-8 left-1/2 -z-10 h-1/6 w-full -translate-x-1/2 transform rounded-t-2xl bg-green px-4 py-1 text-center text-lg font-extralight text-white outline outline-1 outline-green">
                    {t("popularLabel")}
                </div>
            )}
            <div className="flex justify-between">
                <div
                    className={cn(
                        "z-50 flex h-12 w-12 items-center justify-center rounded-full",
                        popular
                            ? "bg-green text-white"
                            : "bg-gray-100 text-green",
                    )}
                >
                    {icon}
                </div>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Badge
                            variant={popular ? "default" : "outline"}
                            className={cn(
                                "flex h-fit w-fit items-center gap-1 rounded-full border-green text-green",
                                popular &&
                                    "bg-green text-white hover:bg-green/90",
                            )}
                        >
                            <Calendar className="h-3 w-3" />
                            <span>{badge.frequency}</span>
                        </Badge>
                    </TooltipTrigger>
                    <TooltipContent className="border border-green bg-white text-green shadow-md">
                        <p>{badge.info}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <h3 className="text-3xl">{title}</h3>
            <p className="text-zinc-500">{description}</p>
            <MainButton
                variant={popular ? "default" : "transparent"}
                className="my-2"
            >
                {t("button")}
            </MainButton>
            <ul className="space-y-2 text-sm text-gray-600">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <span className="text-green">✔</span> {feature}
                    </li>
                ))}
            </ul>
            <div className="hidden justify-between gap-2 lg:flex">
                <Tooltip>
                    <TooltipTrigger asChild className="min-w-4 text-green">
                        <Info />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-60 border border-green bg-white text-green shadow-md">
                        <p>{ideal}</p>
                    </TooltipContent>
                </Tooltip>
                <p className="text-xs text-gray-400">{target}</p>
            </div>
        </Link>
    );
};
const PlansSection: React.FC<SectionProps> = ({ t }) => {
    const plans: PlanCardProps[] = [
        {
            icon: <Shovel />,
            badge: {
                frequency: t!("plans.base.badge.frequency"),
                info: t!("plans.base.badge.info"),
            },
            title: t!("plans.base.title"),
            description: t!("plans.base.description"),
            features: [
                t!("plans.base.features.0"),
                t!("plans.base.features.1"),
            ],
            target: t!("plans.base.target"),
            ideal: t!("plans.base.ideal"),
            t: t!,
        },
        {
            icon: <Sprout />,
            badge: {
                frequency: t!("plans.standard.badge.frequency"),
                info: t!("plans.standard.badge.info"),
            },
            title: t!("plans.standard.title"),
            description: t!("plans.standard.description"),
            features: [
                t!("plans.standard.features.0"),
                t!("plans.standard.features.1"),
                t!("plans.standard.features.2"),
                t!("plans.standard.features.3"),
            ],
            target: t!("plans.standard.target"),
            ideal: t!("plans.standard.ideal"),
            t: t!,
        },
        {
            icon: <Flower2 />,
            badge: {
                frequency: t!("plans.deluxe.badge.frequency"),
                info: t!("plans.deluxe.badge.info"),
            },
            title: t!("plans.deluxe.title"),
            description: t!("plans.deluxe.description"),
            features: [
                t!("plans.deluxe.features.0"),
                t!("plans.deluxe.features.1"),
                t!("plans.deluxe.features.2"),
                t!("plans.deluxe.features.3"),
            ],
            target: t!("plans.deluxe.target"),
            ideal: t!("plans.deluxe.ideal"),
            t: t!,
            popular: true,
        },
        {
            icon: <TreeDeciduous />,
            badge: {
                frequency: t!("plans.premium.badge.frequency"),
                info: t!("plans.premium.badge.info"),
            },
            title: t!("plans.premium.title"),
            description: t!("plans.premium.description"),
            features: [
                t!("plans.premium.features.0"),
                t!("plans.premium.features.1"),
                t!("plans.premium.features.2"),
                t!("plans.premium.features.3"),
                t!("plans.premium.features.4"),
            ],
            target: t!("plans.premium.target"),
            ideal: t!("plans.premium.ideal"),
            t: t!,
        },
    ];

    return (
        <section className="flex flex-col items-center gap-4 p-2 md:p-8">
            <div className="mb-2 flex max-w-2xl flex-col items-center justify-center gap-4 p-2 text-center md:p-8">
                <h2 className="max-w-xl text-4xl md:text-5xl">
                    {t!("heading")}
                </h2>
                <p className="text-xl font-light text-zinc-400">
                    {t!("subheading")}
                </p>
            </div>
            <div className="grid w-full grid-cols-1 content-center gap-6 p-2 md:grid-cols-2 md:p-8 lg:grid-cols-4 xl:gap-0">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center"
                    >
                        <PlanCard {...plan} />
                    </div>
                ))}
            </div>
        </section>
    );
};
const ServiceItem = ({
    title,
    description,
    image,
}: {
    title: string;
    description: string;
    image: string;
}) => {
    return (
        <Link
            href="/booking"
            className="group relative flex cursor-pointer items-center gap-4 border-y-2 px-2 py-5 font-light md:px-8"
        >
            <h2 className="hidden w-1/3 text-3xl md:block">{title}</h2>
            <p className="hidden text-gray-400 transition-all md:block">
                {description}
            </p>
            <div className="flex w-full max-w-52 flex-col md:hidden">
                <h2 className="text-2xl">{title}</h2>
                <p className="text-gray-400 transition-all">{description}</p>
            </div>
            <img
                src={image}
                alt={title}
                className="absolute left-3/4 z-50 hidden max-w-48 opacity-0 transition-all duration-300 group-hover:opacity-100 lg:block xl:left-2/3 xl:max-w-xs"
            />
            <ArrowRight className="ml-auto size-8 rounded-full border-2 text-gray-400 transition-all duration-300 group-hover:-rotate-45 group-hover:border-green group-hover:bg-green group-hover:text-white md:size-12" />
        </Link>
    );
};
const ServicesSection: React.FC<SectionProps> = ({ t }) => {
    const services = [
        { image: "/service.png" }, // Static properties
        { image: "/service.png" },
        { image: "/service.png" },
        { image: "/service.png" },
        { image: "/service.png" },
    ].map((service, index) => ({
        ...service,
        title: t!(`services.${index}.title`),
        description: t!(`services.${index}.description`),
    }));

    return (
        <section id="services">
            <h2 className="p-8 text-center text-4xl md:text-left md:text-5xl">
                {t!("title")}
            </h2>
            <div>
                {services.map((service, index) => (
                    <ServiceItem key={index} {...service} />
                ))}
            </div>
        </section>
    );
};
const GallerySection: React.FC<SectionProps> = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>();
    const [activeTabIndex, setActiveTabIndex] = useState<number>();
    const [api, setApi] = useState<CarouselApi>();
    const { isIntersecting, ref } = useIntersectionObserver({
        threshold: 0.5,
    });
    useEffect(() => {
        if (!api) {
            return;
        }

        api.on("select", () => {
            setActiveTabIndex(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const scrollTo = useCallback(
        (index: number) => {
            if (!api) return;
            api.scrollTo(index);
        },
        [api],
    );

    const villas = [
        {
            image: "/footerBG.png",
            images: [
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
            ],
            isTall: true,
        },
        {
            image: "/path-to-image2.jpg",
            images: [
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
            ],
            isTall: false,
        },
        {
            image: "/path-to-image3.jpg",
            images: [
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
            ],
            isTall: true,
        },
        {
            image: "/path-to-image4.jpg",
            images: [
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
            ],
            isTall: true,
        },
        {
            image: "/path-to-image5.jpg",
            images: [
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
            ],
            isTall: false,
        },
        {
            image: "/path-to-image6.jpg",
            images: [
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
                "/footerBG.png",
            ],
            isTall: false,
        },
    ].map((villa, index) => ({
        ...villa,
        title: t!(`villas.${index}.title`),
    }));

    const stats = [{ value: 120 }, { value: 70 }, { value: 50 }].map(
        (stat, index) => ({
            ...stat,
            label: t!(`stats.${index}.label`),
        }),
    );

    return (
        <section
            id="gallery"
            className="mt-16 flex h-fit min-h-screen flex-col space-y-6 p-2 md:p-8"
        >
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
                <h2 className="max-w-xl text-center text-4xl md:text-left md:text-5xl">
                    {t!("title")}
                </h2>
                <div className="flex max-w-xs flex-col items-center space-y-2 text-center md:items-end md:text-right">
                    <MainButton>{t!("button")}</MainButton>
                    <p className="text-zinc font-light">{t!("description")}</p>
                </div>
            </div>
            <div className="grid h-full auto-rows-[minmax(200px,_1fr)] grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                {villas.map((villa, index) => (
                    <div
                        key={index}
                        className={cn(
                            "group relative cursor-pointer overflow-hidden rounded-xl shadow-lg",
                            villa.isTall && "row-span-2",
                            index === villas.length - 1 &&
                                "sm:max-lg:col-span-2",
                        )}
                        onClick={() => {
                            setActiveIndex(index);
                            setOpen(true);
                        }}
                    >
                        <img
                            src={villa.image}
                            alt={villa.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-end bg-black bg-opacity-30 transition-opacity duration-300">
                            <h3 className="p-4 text-lg font-semibold text-white">
                                {villa.title}
                            </h3>
                        </div>
                        <div className="absolute bottom-4 right-4 drop-shadow-lg">
                            <ArrowRight className="size-8 rounded-full border-2 border-none bg-white text-zinc-700 transition-all duration-300 group-hover:-rotate-45 group-hover:bg-green group-hover:text-white md:size-10" />
                        </div>
                    </div>
                ))}
            </div>
            <div ref={ref} className="flex flex-wrap justify-evenly gap-2 p-10">
                {stats.map(
                    (stat, index) =>
                        isIntersecting && (
                            <div
                                key={index}
                                className="flex flex-col items-center gap-2 md:items-start"
                            >
                                <CountUp
                                    end={stat.value}
                                    className="text-6xl font-medium"
                                    suffix="+"
                                />
                                <p className="text-lg font-extralight text-zinc-400">
                                    {stat.label}
                                </p>
                            </div>
                        ),
                )}
            </div>
            {activeIndex !== undefined && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-screen flex h-fit min-h-screen flex-col items-center justify-center border-none bg-transparent md:p-8">
                        <DialogTitle className="text-2xl font-light text-white">
                            {villas[activeIndex].title}
                        </DialogTitle>
                        <Carousel
                            className="max-w-3xl"
                            style={{ marginTop: "var(--nav-height)" }}
                            setApi={setApi}
                            opts={{
                                watchDrag: false,
                                loop: true,
                            }}
                        >
                            <CarouselContent className="-ml-4">
                                {villas[activeIndex].images.map(
                                    (image, index) => (
                                        <CarouselItem key={index} className="">
                                            <div className="flex aspect-video h-min items-center justify-center">
                                                <img
                                                    src={image}
                                                    alt={image.toString()}
                                                    className="h-full w-full rounded-xl object-cover"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ),
                                )}
                            </CarouselContent>
                            <CarouselNext className="hidden border-green bg-green text-white hover:bg-transparent hover:text-green lg:flex" />
                            <CarouselPrevious className="hidden border-green bg-green text-white hover:bg-transparent hover:text-green lg:flex" />
                        </Carousel>
                        <ScrollArea className="hidden h-fit w-screen p-4 md:block">
                            <div className="mt-4 flex justify-center gap-4 pb-4 2xl:gap-8">
                                {villas[activeIndex].images.map(
                                    (image, index) => (
                                        <div
                                            key={index}
                                            className={cn(
                                                "cursor-pointer p-1 transition-transform",
                                                index ===
                                                    api?.selectedScrollSnap() &&
                                                    "scale-105 md:scale-110",
                                            )}
                                            onClick={() => {
                                                scrollTo(index);
                                            }}
                                        >
                                            <div className="flex aspect-video min-w-72 items-center justify-center rounded-xl">
                                                <img
                                                    src={image}
                                                    alt={image.toString()}
                                                    className="h-full w-full rounded-md object-cover"
                                                />
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                        <div className="flex gap-4 md:hidden">
                            <MainButton
                                className="size-10"
                                onClick={() => {
                                    api?.scrollPrev();
                                }}
                            >
                                <ArrowLeft />
                            </MainButton>
                            <MainButton
                                className="size-10"
                                onClick={() => {
                                    api?.scrollNext();
                                }}
                            >
                                <ArrowRight />
                            </MainButton>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </section>
    );
};
const ArticlesSection: React.FC<SectionProps> = ({ t, router }) => {
    const [importantArticle, setImportantArticle] = useState<Article | null>(
        null,
    );
    const [notableArticles, setNotableArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const articlesRef = collection(db, "articles");

                // Fetch one latest "important" article
                const importantQuery = query(
                    articlesRef,
                    where("type", "==", "important"),
                    orderBy("createdAt", "desc"),
                    limit(1),
                );
                const importantSnapshot = await getDocs(importantQuery);
                const importantData = importantSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))[0] as Article | undefined;

                // Fetch two latest "notable" articles
                const notableQuery = query(
                    articlesRef,
                    where("type", "==", "notable"),
                    orderBy("createdAt", "desc"),
                    limit(2),
                );
                const notableSnapshot = await getDocs(notableQuery);
                const notableData = notableSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Article[];

                setImportantArticle(importantData || null);
                setNotableArticles(notableData);
            } catch (err) {
                console.error("Error fetching articles:", err);
                setError("Failed to load articles");
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);
    if (!importantArticle && notableArticles.length <= 0) return;
    return (
        <section className="mb-8 flex h-fit flex-col space-y-6 p-2 md:min-h-screen md:p-8">
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
                <h2 className="max-w-xl text-center text-4xl md:text-left md:text-5xl">
                    {t!("title")}
                </h2>
                <div className="flex max-w-xs flex-col items-center space-y-2 text-center md:items-end md:text-right">
                    <p className="text-zinc font-light">{t!("description")}</p>
                    <MainButton
                        onClick={() => {
                            router!.push("/articles");
                        }}
                    >
                        {t!("button")}
                    </MainButton>
                </div>
            </div>
            <div className="grid h-full flex-1 grid-flow-dense grid-cols-1 gap-4 md:grid-cols-2">
                {importantArticle && (
                    <Link
                        href={`/articles/${importantArticle.id}`}
                        className="group relative col-span-1 flex flex-col rounded-2xl border md:row-span-2"
                    >
                        <p className="absolute right-2 top-1 text-xl font-extralight text-white">
                            {importantArticle.createdAt
                                .toDate()
                                .toLocaleDateString("en-GB")}
                        </p>
                        <div
                            style={{
                                backgroundImage: `url('${importantArticle.heroImage}')`,
                            }}
                            className="h-full rounded-2xl bg-cover bg-center max-md:h-72"
                        />
                        <div className="flex items-center justify-between gap-1 px-2 py-2">
                            <h3 className="text-xl sm:text-2xl md:text-3xl">
                                {importantArticle.title}
                            </h3>
                            <div className="drop-shadow-lg">
                                <ArrowRight className="size-8 rounded-full border bg-white text-zinc-700 transition-all duration-300 group-hover:-rotate-45 group-hover:bg-green group-hover:text-white" />
                            </div>
                        </div>
                    </Link>
                )}

                {notableArticles.map((article) => (
                    <Link
                        href={`/articles/${article.id}`}
                        key={article.id}
                        className="group relative col-span-1 row-span-1 hidden flex-col rounded-2xl border md:flex"
                    >
                        <p className="absolute right-2 top-1 text-xl font-extralight text-white">
                            {article.createdAt
                                .toDate()
                                .toLocaleDateString("en-GB")}
                        </p>
                        <div
                            style={{
                                backgroundImage: `url('${article.heroImage}')`,
                            }}
                            className="h-full rounded-2xl bg-cover bg-center"
                        />

                        <div className="flex items-center justify-between p-2">
                            <h3 className="text-3xl">{article.title}</h3>
                            <div className="drop-shadow-lg">
                                <ArrowRight className="size-8 rounded-full border bg-white text-zinc-700 transition-all duration-300 group-hover:-rotate-45 group-hover:bg-green group-hover:text-white" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};
const StepsSection: React.FC<SectionProps> = ({ t, router }) => {
    const steps = [
        {
            icon: <h2 className="my-4 text-7xl font-medium text-green">01</h2>,
        },
        {
            icon: <h2 className="my-4 text-7xl font-medium text-green">02</h2>,
        },
        {
            icon: <h2 className="my-4 text-7xl font-medium text-green">03</h2>,
        },
        {
            icon: <CircleCheckBig size={72} className="my-4 text-green" />,
        },
    ].map((step, index) => ({
        ...step,
        title: t!(`steps.${index}.title`),
        description: t!(`steps.${index}.description`),
    }));
    return (
        <section>
            <div className="mb-2 flex flex-col gap-4 p-2 max-md:items-center max-md:text-center md:flex-row md:justify-between md:p-8">
                <h2 className="max-w-xl text-4xl md:text-5xl">{t!("title")}</h2>
                <MainButton
                    onClick={() => {
                        router!.push("/booking");
                    }}
                >
                    {t!("button")}
                </MainButton>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="flex flex-col gap-2 from-white to-green-50 to-40% px-10 py-6 first:bg-gradient-to-r last:bg-gradient-to-l"
                    >
                        {step.icon}
                        <h3 className="text-3xl">{step.title}</h3>
                        <p className="max-w-sm font-light text-gray-400">
                            {step.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};
const FooterSection: React.FC<SectionProps> = ({ t, router }) => {
    return (
        <section className="h-[50vh] bg-[url('/footerBG.png')] bg-cover bg-center">
            <div className="flex h-full w-full flex-col items-center justify-center bg-[#228B0E]/60">
                <h1 className="font-cormorant text-[13vw] text-white">
                    {t!("title")}
                </h1>
                <MainButton
                    variant="transparent"
                    className="border-white text-white hover:border-green"
                    onClick={() => {
                        router!.push("/booking");
                    }}
                >
                    <span>{t!("button")}</span>
                    <ArrowRight />
                </MainButton>
            </div>
        </section>
    );
};

export default function Home() {
    const t = useTranslations("Pages.Home");
    const router = useRouter();
    return (
        <main className="h-fit w-full">
            <HeroSection t={(key) => t(`heroSection.${key}`)} router={router} />
            <PlansSection t={(key) => t(`plansSection.${key}`)} />
            <ServicesSection t={(key) => t(`servicesSection.${key}`)} />
            <GallerySection t={(key) => t(`gallerySection.${key}`)} />
            <ArticlesSection
                t={(key) => t(`articlesSection.${key}`)}
                router={router}
            />
            <StepsSection
                t={(key) => t(`stepsSection.${key}`)}
                router={router}
            />
            <FooterSection
                t={(key) => t(`footerSection.${key}`)}
                router={router}
            />
        </main>
    );
}
