"use client";
import LoadingOverlay from "@/components/Loading";
import { useAuth } from "@/components/Providers";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "@/i18n/routing";
import { Booking } from "@/models/booking";
import { UserT } from "@/models/user";
import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc,
} from "firebase/firestore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Check,
    Hourglass,
    Mail,
    MapPin,
    Phone,
    Trash2,
    User,
    X,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase/firebase.config";
import AuthForm from "@/components/forms/auth/auth";
import MainButton from "@/components/MainButton";
import Image from "next/image";
import logo from "@/../public/logoText.png";
import { ArticleForm } from "@/components/forms/article/article";
// import ArticleForm from "@/components/forms/article";

type BookingProps = {
    booking: Booking;
    user: UserT;
};

const BookingComponent: React.FC<BookingProps> = ({ user, booking }) => {
    const [loading, setIsLoading] = useState(false);
    const t = useTranslations("Pages.Admin.bookings");
    const setStatusToConfirmed = async (bookingId: string) => {
        if (!user.approved) return;
        setIsLoading(true);
        try {
            const bookingRef = doc(db, "bookings", bookingId);
            await updateDoc(bookingRef, {
                status: "confirmed",
            });
            console.log("Status updated to confirmed.");
            setIsLoading(false);
        } catch (error) {
            console.error("Error updating status to confirmed:", error);
            setIsLoading(false);
        }
    };

    const setStatusToDeclined = async (bookingId: string) => {
        if (!user.approved) return;
        setIsLoading(true);
        try {
            const bookingRef = doc(db, "bookings", bookingId);
            await updateDoc(bookingRef, {
                status: "declined",
            });
            console.log("Status updated to rejected.");
            setIsLoading(false);
        } catch (error) {
            console.error("Error updating status to rejected:", error);
            setIsLoading(false);
        }
    };

    const setStatusToPostponed = async (bookingId: string) => {
        if (!user.approved) return;
        setIsLoading(true);
        try {
            const bookingRef = doc(db, "bookings", bookingId);
            await updateDoc(bookingRef, {
                status: "postponed",
            });
            console.log("Status updated to rejected.");
            setIsLoading(false);
        } catch (error) {
            console.error("Error updating status to rejected:", error);
            setIsLoading(false);
        }
    };

    const deleteBooking = async (bookingId: string) => {
        setIsLoading(true);
        try {
            const bookingRef = doc(db, "bookings", bookingId);
            await deleteDoc(bookingRef);
            console.log(`Booking with ID ${bookingId} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting booking: ", error);
        }
        setIsLoading(false);
    };

    return (
        <ScrollArea
            key={booking.id}
            className={`w-full rounded-lg border-2 shadow-lg ${
                {
                    pending: "border-yellow-400",
                    confirmed: "border-green",
                    declined: "border-red-500",
                    fulfilled: "border-blue-500",
                    expired: "border-gray-500",
                    postponed: "border-orange-400",
                }[booking.status] || "border-gray-300"
            }`}
        >
            {loading && <LoadingOverlay />}
            <div className="flex w-full items-center justify-between gap-8 px-4 py-3 md:gap-12">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div
                            className={`size-2 rounded-full ${
                                {
                                    pending: "bg-yellow-400",
                                    confirmed: "bg-green",
                                    declined: "bg-red-500",
                                    fulfilled: "bg-blue-500",
                                    expired: "bg-gray-500",
                                    postponed: "bg-orange-400",
                                }[booking.status] || "bg-gray-300"
                            }`}
                        />
                        <p>{t(`statuses.${booking.status}`)}</p>
                    </div>
                    {user.approved &&
                        (booking.status === "pending" ||
                            booking.status === "postponed") && (
                            <div className="flex items-center gap-2">
                                <Button
                                    className="h-fit bg-green p-2 hover:bg-green/90"
                                    onClick={() =>
                                        setStatusToConfirmed(booking.id!)
                                    }
                                >
                                    <Check />
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="h-fit p-2"
                                    onClick={() =>
                                        setStatusToDeclined(booking.id!)
                                    }
                                >
                                    <X />
                                </Button>
                            </div>
                        )}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <User /> <p>{booking.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail />
                        <p>{booking.email}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Phone />
                        <p>{booking.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin />
                        <p>{booking.address}</p>
                    </div>
                </div>

                <p className="capitalize">{t(`options.${booking.option}`)}</p>
                <div>
                    {booking.option === "service" ? (
                        booking.services!.map((service, index) => (
                            <p key={index}>{t(`services.${service}`)}</p>
                        ))
                    ) : (
                        <p className="capitalize">
                            {t(`plans.${booking.plan!.toLowerCase()}`)}
                        </p>
                    )}
                </div>
                <div className="flex flex-col items-center gap-1">
                    {user.approved && booking.status !== "postponed" && (
                        <Button
                            className="h-fit bg-orange-400 p-2 hover:bg-orange-300"
                            onClick={() => setStatusToPostponed(booking.id!)}
                        >
                            <Hourglass />
                        </Button>
                    )}
                    <Button
                        className="h-fit p-2"
                        onClick={() => deleteBooking(booking.id!)}
                    >
                        <Trash2 />
                    </Button>
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
};

export default function Admin() {
    const t = useTranslations("Pages.Admin");
    const router = useRouter();
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setIsLoading] = useState(false);
    const [processedBookings, setProcessedBookings] =
        useState<Booking[]>(bookings);
    const [selectedOption, setSelectedOption] = useState<string | undefined>(
        undefined,
    );
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
        undefined,
    );
    useEffect(() => {
        if (!user?.approved) {
            router.push("/");
        }
    }, [user, router]);

    useEffect(() => {
        setIsLoading(true);
        const bookingsRef = collection(db, "bookings");
        const unsubscribe = onSnapshot(
            bookingsRef,
            (snapshot) => {
                const fetchedBookings: Booking[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Booking[];
                setProcessedBookings(fetchedBookings);
                setBookings(fetchedBookings);
                setIsLoading(false);
            },
            (error) => {
                console.error("Error fetching bookings: ", error);
                setIsLoading(false);
            },
        );
        return () => unsubscribe();
    }, []);
    const handleSort = (option: string, direction: string) => {
        const sortedItems = [...processedBookings];
        if (option === "name") {
            sortedItems.sort((a, b) =>
                direction === "asc"
                    ? a.name.localeCompare(b.name)
                    : b.name.localeCompare(a.name),
            );
        } else if (option === "email") {
            sortedItems.sort((a, b) =>
                direction === "asc"
                    ? a.email.localeCompare(b.email)
                    : b.email.localeCompare(a.email),
            );
        }
        setProcessedBookings(sortedItems);
    };

    const handleFilter = (option?: string, status?: string) => {
        const filtered = bookings.filter(
            (booking) =>
                (option ? booking.option === option : true) &&
                (status ? booking.status === status : true),
        );
        setProcessedBookings(filtered);
    };

    return (
        <main className="min-h-screen p-2 md:p-4">
            {loading && <LoadingOverlay />}
            {!user.uid && (
                <div className="flex h-screen flex-col items-center justify-center gap-4">
                    <Tabs defaultValue="login" className="w-full max-w-lg">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="register">Register</TabsTrigger>
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
            )}
            {user.uid && !user.approved && (
                <div className="flex h-screen flex-col items-center justify-center gap-4">
                    <Image src={logo} alt={""} />
                    <h2 className="max-w-md text-center text-5xl">
                        {t("noPermission.message")}
                    </h2>
                    <MainButton
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                         {t("noPermission.goBack")}
                    </MainButton>
                </div>
            )}
            {user.uid && user.approved === true && (
                <section className="">
                    <div className="rounded-xl border p-2">
                        <h3 className="text-4xl">Upload Articles:</h3>
                        <ArticleForm/>
                    </div>
                    <div className="flex min-h-screen flex-col gap-4">
                        <h1 className="text-4xl">{t("bookings.title")}</h1>
                        {bookings.length < 1 ? (
                            <p>{t("bookings.notFound")}</p>
                        ) : (
                            <div className="space-y-2 md:p-2 md:shadow-xl">
                                <div className="flex flex-wrap items-end justify-center gap-2 xs:justify-between xs:gap-4">
                                    <Select
                                        onValueChange={(value) => {
                                            const [option, direction] =
                                                value.split("_");
                                            handleSort(option, direction);
                                        }}
                                    >
                                        <SelectTrigger className="w-full space-x-2 !border-none bg-gray-100 !outline-none !ring-0 xs:w-fit">
                                            <p>{t("bookings.sortBy")}</p>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="w-fit !min-w-fit">
                                            <SelectItem value="name_asc">
                                                {t("bookings.nameAsc")}
                                            </SelectItem>
                                            <SelectItem value="name_desc">
                                                {t("bookings.nameDesc")}
                                            </SelectItem>
                                            <SelectItem value="email_asc">
                                                {t("bookings.emailAsc")}
                                            </SelectItem>
                                            <SelectItem value="email_desc">
                                                {t("bookings.emailDesc")}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <div className="flex items-center justify-between gap-2 max-xs:w-full xs:justify-end">
                                        <p className="min-w-fit">
                                            {t("bookings.filterBy")}
                                        </p>
                                        <Select
                                            onValueChange={(status) => {
                                                const newStatus =
                                                    status === "all"
                                                        ? undefined
                                                        : status;
                                                setSelectedStatus(newStatus);
                                                handleFilter(
                                                    selectedOption,
                                                    newStatus,
                                                );
                                            }}
                                        >
                                            <SelectTrigger className="space-x-2 !border-none bg-gray-100 !outline-none !ring-0 xs:w-fit">
                                                <SelectValue
                                                    placeholder={t(
                                                        "bookings.status",
                                                    )}
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="w-fit !min-w-fit">
                                                <SelectItem value="all">
                                                    {t("bookings.statusAll")}
                                                </SelectItem>
                                                <SelectItem value="pending">
                                                    {t(
                                                        "bookings.statusPending",
                                                    )}
                                                </SelectItem>
                                                <SelectItem value="confirmed">
                                                    {t(
                                                        "bookings.statusConfirmed",
                                                    )}
                                                </SelectItem>
                                                <SelectItem value="declined">
                                                    {t(
                                                        "bookings.statusDeclined",
                                                    )}
                                                </SelectItem>
                                                <SelectItem value="fulfilled">
                                                    {t(
                                                        "bookings.statusFulfilled",
                                                    )}
                                                </SelectItem>
                                                <SelectItem value="expired">
                                                    {t(
                                                        "bookings.statusExpired",
                                                    )}
                                                </SelectItem>
                                                <SelectItem value="postponed">
                                                    {t(
                                                        "bookings.statusPostponed",
                                                    )}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Select
                                            onValueChange={(option) => {
                                                const newOption =
                                                    option === "all"
                                                        ? undefined
                                                        : option;
                                                setSelectedOption(newOption);
                                                handleFilter(
                                                    newOption,
                                                    selectedStatus,
                                                );
                                            }}
                                        >
                                            <SelectTrigger className="space-x-2 !border-none bg-gray-100 !outline-none !ring-0 xs:w-fit">
                                                <SelectValue
                                                    placeholder={t(
                                                        "bookings.option",
                                                    )}
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="w-fit !min-w-fit">
                                                <SelectItem value="all">
                                                    {t("bookings.optionAll")}
                                                </SelectItem>
                                                <SelectItem value="subscription">
                                                    {t(
                                                        "bookings.optionSubscription",
                                                    )}
                                                </SelectItem>
                                                <SelectItem value="service">
                                                    {t(
                                                        "bookings.optionService",
                                                    )}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex w-full flex-col items-center gap-4">
                                    {processedBookings.map((booking) => (
                                        <BookingComponent
                                            key={booking.id}
                                            booking={booking}
                                            user={user}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            )}
        </main>
    );
}
