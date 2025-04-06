"use client";
import logoText from "@/../public/logoText.png";
import LoadingOverlay from "@/components/Loading";
import MainButton from "@/components/MainButton";
import { BookingSchema, BookingSchemaType } from "@/components/schemas/booking";
import { Badge } from "@/components/ui/badge";
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
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import AutoHeight from "embla-carousel-auto-height";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import L from "leaflet";
import {
    Calendar,
    ChevronLeft,
    CircleCheckBig,
    Flower,
    Flower2,
    Info,
    Locate,
    Mail,
    MapPin,
    Phone,
    Shovel,
    Sprout,
    TreeDeciduous,
    User,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { toast } from "sonner";
import { db } from "../../../../firebase/firebase.config";

const ProgressBar: React.FC<{
    progress: number;
    option: "service" | "subscription";
}> = ({ progress, option }) => (
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
        {option === "subscription" && (
            <div
                className={cn(
                    "h-2 w-8 rounded-full bg-zinc-300 transition-all",
                    progress >= 4 && "w-12 bg-green",
                )}
            />
        )}
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
            <ChevronLeft className="!size-5" />
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
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    loading?: boolean;
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
type MapPickerProps = {
    onLocationSelect: (lat: number, lng: number) => void;
    initialPosition?: [number, number] | null;
};
const MapField: React.FC<MapPickerProps> = ({
    onLocationSelect,
    initialPosition,
}) => {
    const [position, setPosition] = useState<[number, number] | null>(
        initialPosition || null,
    );
    const pinIcon = L.icon({
        iconUrl: "/tools/pin.png",
        iconAnchor: [18, 40],
        iconSize: [36, 36],
    });
    useEffect(() => {
        if (initialPosition) {
            setPosition(initialPosition);
        }
    }, [initialPosition]);

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                onLocationSelect(lat, lng);
            },
        });

        return position ? <Marker position={position} icon={pinIcon} /> : null;
    };
    return (
        <MapContainer
            center={initialPosition || [43.210192, 27.914749]}
            zoom={13}
            className="aspect-video w-full rounded-lg shadow-lg"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {position && <Marker position={position} icon={pinIcon} />}
            <LocationMarker />
        </MapContainer>
    );
};
const CarouselFormBaseItem: React.FC<CarouselItemsProps> = ({
    t,
    scrollNext,
    scrollPrev,
    form,
    progress,
    setLoading,
}) => {
    const [isReady, setIsReady] = useState(false);
    const [mapPosition, setMapPosition] = useState<[number, number] | null>(
        null,
    );
    const { watch, getFieldState, formState, setValue } = form!;
    const watchedBaseFields = watch(["name", "email", "phone", "address"]);
    const watchedOptionField = watch("option");
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

    const fetchCurrentLocation = async () => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }

        setLoading!(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const response = await axios.get(
                        "https://nominatim.openstreetmap.org/reverse",
                        {
                            params: {
                                lat: latitude,
                                lon: longitude,
                                format: "json",
                            },
                        },
                    );

                    const address =
                        response.data.display_name || "Address not found";
                    setValue("address", address);
                    setMapPosition([latitude, longitude]);
                } catch (error) {
                    console.error("Error fetching address:", error);
                } finally {
                    setLoading!(false);
                }
            },
            (error) => {
                console.error("Error getting location:", error);
                setLoading!(false);
            },
        );
    };

    const handleLocationSelect = async (lat: number, lng: number) => {
        try {
            const response = await axios.get(
                "https://nominatim.openstreetmap.org/reverse",
                {
                    params: {
                        lat,
                        lon: lng,
                        format: "json",
                    },
                },
            );

            const address = response.data.display_name || "Address not found";
            setValue("address", address);
            setMapPosition([lat, lng]);
        } catch (error) {
            console.error("Error fetching address:", error);
        }
        try {
            const response = await axios.get(
                "https://nominatim.openstreetmap.org/reverse",
                {
                    params: {
                        lat,
                        lon: lng,
                        format: "json",
                    },
                },
            );
            const address = response.data.display_name || "Address not found";
            setValue("address", address);
        } catch (error) {
            console.error("Error fetching address:", error);
            setValue("address", "Error fetching address");
        }
    };

    return (
        <CarouselItem className="relative flex h-fit min-h-screen w-screen flex-col items-center justify-between gap-2 p-3 text-center">
            <ScrollPrevButton scrollPrev={scrollPrev} />
            <div className="md:-mb-3" />
            <div className="flex max-w-lg flex-col items-center space-y-5 md:space-y-3">
                <div className="space-y-2">
                    <h3 className="text-2xl md:text-5xl">{t("title")}</h3>
                    <h5 className="text-lg font-light text-zinc-400 md:text-2xl">
                        {t("subtitle")}
                    </h5>
                </div>
                <div className="w-full max-w-md space-y-4">
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
                    <div className="space-y-3">
                        <FormField
                            control={form!.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center gap-1 font-light text-zinc-400">
                                        <MapPin fontWeight={1} size={16} />
                                        {t("address.label")}
                                    </FormLabel>
                                    <div className="flex items-center gap-2">
                                        <Tooltip>
                                            <TooltipTrigger
                                                type="button"
                                                onClick={fetchCurrentLocation}
                                                className="p-0"
                                            >
                                                <MainButton
                                                    asChild
                                                    className="aspect-square p-2"
                                                >
                                                    <Locate size={38} />
                                                </MainButton>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-green">
                                                <p>{t("address.tooltip")}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                        <FormControl>
                                            <Input
                                                className="border-none bg-zinc-100 outline-none"
                                                placeholder={t(
                                                    "address.placeholder",
                                                )}
                                                {...field}
                                            />
                                        </FormControl>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <MapField
                            onLocationSelect={handleLocationSelect}
                            initialPosition={mapPosition}
                        />
                    </div>
                </div>
                <MainButton
                    type="button"
                    onClick={scrollNext}
                    disabled={!isReady}
                >
                    {t("continue")}
                </MainButton>
            </div>
            <ProgressBar progress={progress!} option={watchedOptionField} />
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
                                                field.value ===
                                                    "subscription" &&
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
            <ProgressBar progress={progress!} option={watchedOptionField} />
        </CarouselItem>
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
    value: "base" | "standard" | "deluxe" | "premium";
};
const PlanCard: React.FC<
    PlanCardProps & { isSelected: boolean; onClick: () => void }
> = ({
    icon,
    badge,
    title,
    description,
    features,
    target,
    ideal,
    popular = false,
    t,
    isSelected,
    onClick,
}) => {
    return (
        <div
            className={cn(
                "relative flex flex-col gap-4 rounded-2xl border px-4 py-6 font-light shadow-lg transition-all md:max-w-xs",
                popular ? "mt-8 border-green bg-white" : "border-gray-300",
                isSelected && "border-green bg-green-50",
            )}
        >
            {popular && (
                <div className="absolute -top-8 left-1/2 -z-10 h-1/6 w-full -translate-x-1/2 transform rounded-t-2xl bg-green px-4 py-1 text-center text-lg font-extralight text-white outline outline-1 outline-green">
                    {t("planCards.popularLabel")}
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
                    <TooltipContent className="max-w-60 border border-green bg-white text-green shadow-md">
                        <p>{badge.info}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
            <div className="flex items-center justify-between">
                <h3 className="text-3xl">{title}</h3>
                {isSelected && <CircleCheckBig className="text-green" />}
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
            <div className="hidden justify-between gap-2 lg:flex">
                <Tooltip>
                    <TooltipTrigger
                        asChild
                        className="min-w-4 cursor-help text-muted-foreground"
                    >
                        <Info />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-60 border border-green bg-white text-green shadow-md">
                        <p>{ideal}</p>
                    </TooltipContent>
                </Tooltip>
                <p className="text-xs text-gray-400">{target}</p>
            </div>
        </div>
    );
};
type FormFinalFieldsProps = {
    t: (arg: string) => string;
    form: UseFormReturn<BookingSchemaType>;
    type?: "service" | "subscription";
};
const FormPlanTypeFields: React.FC<FormFinalFieldsProps> = ({ t, form }) => {
    const plans: PlanCardProps[] = [
        {
            value: "base",
            icon: <Shovel />,
            badge: {
                frequency: t!("planCards.base.badge.frequency"),
                info: t!("planCards.base.badge.info"),
            },
            title: t!("planCards.base.title"),
            description: t!("planCards.base.description"),
            features: [
                t!("planCards.base.features.0"),
                t!("planCards.base.features.1"),
            ],
            target: t!("planCards.base.target"),
            ideal: t!("planCards.base.ideal"),
            t: t!,
        },
        {
            value: "standard",
            icon: <Sprout />,
            badge: {
                frequency: t!("planCards.standard.badge.frequency"),
                info: t!("planCards.standard.badge.info"),
            },
            title: t!("planCards.standard.title"),
            description: t!("planCards.standard.description"),
            features: [
                t!("planCards.standard.features.0"),
                t!("planCards.standard.features.1"),
                t!("planCards.standard.features.2"),
            ],
            target: t!("planCards.standard.target"),
            ideal: t!("planCards.standard.ideal"),
            t: t!,
        },
        {
            value: "deluxe",
            icon: <Flower2 />,
            badge: {
                frequency: t!("planCards.deluxe.badge.frequency"),
                info: t!("planCards.deluxe.badge.info"),
            },
            title: t!("planCards.deluxe.title"),
            description: t!("planCards.deluxe.description"),
            features: [
                t!("planCards.deluxe.features.0"),
                t!("planCards.deluxe.features.1"),
                t!("planCards.deluxe.features.2"),
                t!("planCards.deluxe.features.3"),
            ],
            target: t!("planCards.deluxe.target"),
            ideal: t!("planCards.deluxe.ideal"),
            t: t!,
            popular: true,
        },
        {
            value: "premium",
            icon: <TreeDeciduous />,
            badge: {
                frequency: t!("planCards.premium.badge.frequency"),
                info: t!("planCards.premium.badge.info"),
            },
            title: t!("planCards.premium.title"),
            description: t!("planCards.premium.description"),
            features: [
                t!("planCards.premium.features.0"),
                t!("planCards.premium.features.1"),
                t!("planCards.premium.features.2"),
                t!("planCards.premium.features.3"),
                t!("planCards.premium.features.4"),
            ],
            target: t!("planCards.premium.target"),
            ideal: t!("planCards.premium.ideal"),
            t: t!,
        },
    ];
    return (
        <div className="w-full">
            <FormField
                control={form.control}
                name="plan"
                render={({ field }) => (
                    <FormItem className="w-full space-y-3">
                        <div className="flex flex-col items-center justify-center space-y-2 text-center">
                            <FormLabel className="text-2xl font-normal md:text-5xl">
                                {t("title")}
                            </FormLabel>
                            <FormDescription className="text-base font-light md:text-xl">
                                {t("description")}
                            </FormDescription>
                        </div>
                        <FormControl className="w-full">
                            <div className="grid w-full grid-cols-1 content-center gap-6 p-2 md:grid-cols-2 md:p-8 lg:grid-cols-4 xl:gap-0">
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
const FormServicesFields: React.FC<FormFinalFieldsProps> = ({
    t,
    form,
    type,
}) => {
    const services = [
        {
            value: "mowing",
            icon: <Flower size={38} />,
            title: t("mowing.title"),
            description: t("mowing.description"),
        },
        {
            value: "shaping",
            icon: <Flower size={38} />,
            title: t("shaping.title"),
            description: t("shaping.description"),
        },
        {
            value: "pruning",
            icon: <Flower size={38} />,
            title: t("pruning.title"),
            description: t("pruning.description"),
        },
        {
            value: "fertilizing",
            icon: <Flower size={38} />,
            title: t("fertilizing.title"),
            description: t("fertilizing.description"),
        },
        {
            value: "irrigation",
            icon: <Flower size={38} />,
            title: t("irrigation.title"),
            description: t("irrigation.description"),
        },
        {
            value: "weeding",
            icon: <Flower size={38} />,
            title: t("weeding.title"),
            description: t("weeding.description"),
        },
        ...(type === "subscription"
            ? [
                  {
                      value: "trimming",
                      icon: <Flower size={38} />,
                      title: t("trimming.title"),
                      description: t("trimming.description"),
                  },
                  {
                      value: "lowering",
                      icon: <Flower size={38} />,
                      title: t("lowering.title"),
                      description: t("lowering.description"),
                  },
                  {
                      value: "mulching",
                      icon: <Flower size={38} />,
                      title: t("mulching.title"),
                      description: t("mulching.description"),
                  },
              ]
            : []),
    ];

    return (
        <div>
            <FormField
                control={form!.control}
                name="services"
                render={() => (
                    <FormItem>
                        {type && (
                            <h2 className="mb-4 text-center text-2xl font-normal md:text-5xl">
                                {t(`title.${type}`)}
                            </h2>
                        )}
                        <div
                            className={cn(
                                "flex flex-wrap justify-center gap-4 md:justify-between",
                                type === "subscription"
                                    ? "max-w-5xl"
                                    : "max-w-3xl",
                            )}
                        >
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
                                                    "relative flex w-full max-w-xs flex-col justify-between rounded-2xl border px-2 pb-1 transition-all md:items-center md:px-4 md:text-center",
                                                    field.value?.includes(
                                                        service.value,
                                                    ) &&
                                                        "scale-105 border-2 border-green",
                                                )}
                                            >
                                                <div className="hidden md:block" />
                                                <FormControl className="absolute right-2 top-2">
                                                    <Checkbox
                                                        className="size-7 rounded-full border-zinc-200 data-[state=checked]:border-green data-[state=checked]:bg-green"
                                                        checked={field.value?.includes(
                                                            service.value,
                                                        )}
                                                        onCheckedChange={(
                                                            checked,
                                                        ) => {
                                                            // Create the new updated array
                                                            const updatedValue =
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
                                                                      );

                                                            if (
                                                                service.value ===
                                                                    "weeding" &&
                                                                checked &&
                                                                updatedValue?.length ===
                                                                    1
                                                            ) {
                                                                toast.error(
                                                                    t!(
                                                                        "weeding.tooltip",
                                                                    ),
                                                                );
                                                                return;
                                                            }
                                                            if (
                                                                !checked &&
                                                                updatedValue?.length ===
                                                                    1 &&
                                                                updatedValue[0] ===
                                                                    "weeding"
                                                            ) {
                                                                toast.error(
                                                                    t!(
                                                                        "weeding.tooltip",
                                                                    ),
                                                                );
                                                                return;
                                                            }
                                                            if (
                                                                type ===
                                                                    "subscription" ||
                                                                (type ===
                                                                    "service" &&
                                                                    updatedValue!
                                                                        .length <=
                                                                        3)
                                                            ) {
                                                                field.onChange(
                                                                    updatedValue,
                                                                );
                                                            } else {
                                                                toast.error(
                                                                    t("max"),
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <div className="flex items-center gap-1 max-md:w-5/6 max-md:self-start md:flex-col">
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
                                                    {service.value ===
                                                        "weeding" && (
                                                        <Tooltip>
                                                            <TooltipTrigger
                                                                asChild
                                                            >
                                                                <Info className="h-4 w-4 cursor-help text-muted-foreground" />
                                                            </TooltipTrigger>
                                                            <TooltipContent className="max-w-60">
                                                                <p>
                                                                    {t!(
                                                                        "weeding.tooltip",
                                                                    )}
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    )}
                                                </div>
                                                <FormDescription className="text-sm font-light">
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
const CarouselFormServicesItem: React.FC<CarouselItemsProps> = ({
    t,
    scrollNext,
    scrollPrev,
    form,
    progress,
}) => {
    const { watch, getFieldState } = form!;
    const watchedOptionField = watch("option");
    const watchedServiceField = watch("services");
    return (
        <CarouselItem className="relative flex h-fit min-h-screen w-full flex-col items-center justify-between gap-2 p-4">
            <ScrollPrevButton scrollPrev={scrollPrev} />
            <div />
            <div className="flex w-full flex-col items-center gap-3">
                <FormServicesFields
                    t={t}
                    form={form!}
                    type={watchedOptionField}
                />

                <MainButton
                    type={
                        watchedOptionField === "subscription"
                            ? "button"
                            : "submit"
                    }
                    disabled={
                        !watchedServiceField ||
                        getFieldState("services").invalid ||
                        (watchedOptionField === "service" &&
                            !form?.formState.isValid)
                    }
                    onClick={scrollNext}
                >
                    {watchedOptionField === "subscription"
                        ? t("continue")
                        : t("submit")}
                </MainButton>
            </div>
            <ProgressBar progress={progress!} option={watchedOptionField} />
        </CarouselItem>
    );
};
const CarouselFormPlanItem: React.FC<CarouselItemsProps> = ({
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
            <div className="flex w-full flex-col items-center gap-3">
                <FormPlanTypeFields t={t} form={form!} />
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
            <ProgressBar progress={progress!} option={watchedOptionField} />
        </CarouselItem>
    );
};
const CarouselFooterItem: React.FC<CarouselItemsProps> = ({ t, router }) => (
    <CarouselItem className="flex h-fit min-h-screen w-full flex-col items-center justify-between gap-4 py-8 text-center">
        <div />
        <div className="-ml-4 flex flex-col items-center justify-center gap-4 px-4">
            <CircleCheckBig className="size-32 text-green" />
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
    const locale = useLocale();
    const t = useTranslations("Pages.Booking");
    const router = useRouter();
    const [api, setApi] = useState<CarouselApi>();
    const formSchema = BookingSchema((key) => t!(`form.errors.${key}`));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const form = useForm<BookingSchemaType>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address: "",
            option: undefined,
            services: ["mowing"],
            plan: undefined,
        },
    });
    const progress = currentIndex > 0 && currentIndex < 5 ? currentIndex : 0;
    useEffect(() => {
        if (form.watch("option") === "service")
            form.setValue("services", ["mowing"]);
    }, [form.watch("option")]);
    async function onSubmit(values: BookingSchemaType) {
        try {
            setLoading(true);
            const cleanedValues = Object.fromEntries(
                Object.entries(values).filter(([_, v]) => v !== undefined),
            );
            const docRef = await addDoc(collection(db, "bookings"), {
                ...cleanedValues,
                status: "pending",
                createdAt: serverTimestamp(),
            });
            const response = await axios.post("/api/mail", {
                values,
                status: "pending",
                id: docRef.id,
                locale: locale,
            });
            console.log(response);
        } catch (error) {
            console.error("Error during submission:", error);
        } finally {
            setLoading(false);
            scrollNext();
        }
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
            {loading && <LoadingOverlay />}
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
                                setLoading={setLoading}
                                progress={progress}
                            />
                            <CarouselFormOptionItem
                                form={form}
                                scrollNext={scrollNext}
                                scrollPrev={scrollPrev}
                                t={(key) => t(`form.option.${key}`)}
                                progress={progress}
                            />
                            <CarouselFormServicesItem
                                form={form}
                                scrollNext={scrollNext}
                                scrollPrev={scrollPrev}
                                t={(key) => t(`form.services.${key}`)}
                                progress={progress}
                            />
                            {form.watch("option") === "subscription" && (
                                <CarouselFormPlanItem
                                    form={form}
                                    scrollNext={scrollNext}
                                    scrollPrev={scrollPrev}
                                    t={(key) => t(`form.plans.${key}`)}
                                    progress={progress}
                                />
                            )}
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
