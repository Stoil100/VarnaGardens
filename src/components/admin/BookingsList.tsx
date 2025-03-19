"use client";

import { useAuth } from "@/components/Providers";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Booking } from "@/models/booking";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase.config";
import BookingItem from "./BookingItem";

type BookingsListProps = {
    t: (args: string) => string;
    setIsLoading: (loading: boolean) => void;
};

export default function BookingsList({ setIsLoading, t }: BookingsListProps) {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [processedBookings, setProcessedBookings] = useState<Booking[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | undefined>(
        undefined,
    );
    const [selectedStatus, setSelectedStatus] = useState<string | undefined>(
        undefined,
    );
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        setIsLoading(true);

        const bookingsRef = collection(db, "bookings");
        const bookingsQuery = query(bookingsRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(
            bookingsQuery,
            (snapshot) => {
                const fetchedBookings: Booking[] = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Booking[];

                setBookings(fetchedBookings);
                setProcessedBookings(fetchedBookings);
                setIsLoading(false);
            },
            (error) => {
                console.error("Error fetching bookings: ", error);
                setIsLoading(false);
            },
        );

        return () => unsubscribe();
    }, [refreshTrigger]);

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

    const handleBookingUpdated = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <div className="flex h-fit flex-col gap-4">
            <h2 className="text-3xl font-semibold">{t("title")}</h2>

            {bookings.length < 1 ? (
                <p className="text-muted-foreground">{t("notFound")}</p>
            ) : (
                <div className="space-y-4 rounded-lg border p-4 shadow-sm">
                    <div className="flex flex-wrap items-end justify-center gap-2 xs:justify-between xs:gap-4">
                        <Select
                            onValueChange={(value) => {
                                const [option, direction] = value.split("_");
                                handleSort(option, direction);
                            }}
                        >
                            <SelectTrigger className="w-full space-x-2 !border-none bg-gray-100 !outline-none !ring-0 xs:w-fit">
                                <p>{t("sortBy")}</p>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="w-fit !min-w-fit">
                                <SelectItem value="name_asc">
                                    {t("nameAsc")}
                                </SelectItem>
                                <SelectItem value="name_desc">
                                    {t("nameDesc")}
                                </SelectItem>
                                <SelectItem value="email_asc">
                                    {t("emailAsc")}
                                </SelectItem>
                                <SelectItem value="email_desc">
                                    {t("emailDesc")}
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <div className="flex items-center justify-between gap-2 max-xs:w-full xs:justify-end">
                            <p className="min-w-fit">{t("filterBy")}</p>
                            <Select
                                onValueChange={(status) => {
                                    const newStatus =
                                        status === "all" ? undefined : status;
                                    setSelectedStatus(newStatus);
                                    handleFilter(selectedOption, newStatus);
                                }}
                            >
                                <SelectTrigger className="space-x-2 !border-none bg-gray-100 !outline-none !ring-0 xs:w-fit">
                                    <SelectValue placeholder={t("status")} />
                                </SelectTrigger>
                                <SelectContent className="w-fit !min-w-fit">
                                    <SelectItem value="all">
                                        {t("statusAll")}
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        {t("statusPending")}
                                    </SelectItem>
                                    <SelectItem value="confirmed">
                                        {t("statusConfirmed")}
                                    </SelectItem>
                                    <SelectItem value="declined">
                                        {t("statusDeclined")}
                                    </SelectItem>
                                    <SelectItem value="fulfilled">
                                        {t("statusFulfilled")}
                                    </SelectItem>
                                    <SelectItem value="expired">
                                        {t("statusExpired")}
                                    </SelectItem>
                                    <SelectItem value="postponed">
                                        {t("statusPostponed")}
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                onValueChange={(option) => {
                                    const newOption =
                                        option === "all" ? undefined : option;
                                    setSelectedOption(newOption);
                                    handleFilter(newOption, selectedStatus);
                                }}
                            >
                                <SelectTrigger className="space-x-2 !border-none bg-gray-100 !outline-none !ring-0 xs:w-fit">
                                    <SelectValue placeholder={t("option")} />
                                </SelectTrigger>
                                <SelectContent className="w-fit !min-w-fit">
                                    <SelectItem value="all">
                                        {t("optionAll")}
                                    </SelectItem>
                                    <SelectItem value="subscription">
                                        {t("optionSubscription")}
                                    </SelectItem>
                                    <SelectItem value="service">
                                        {t("optionService")}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex w-full flex-col items-center gap-4">
                        {processedBookings.map((booking) => (
                            <BookingItem
                                key={booking.id}
                                booking={booking}
                                user={user}
                                t={t}
                                onBookingUpdated={handleBookingUpdated}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
