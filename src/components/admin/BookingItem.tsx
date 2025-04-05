"use client";

import LoadingOverlay from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { Booking } from "@/models/booking";
import type { UserT } from "@/models/user";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
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
import { useState } from "react";
import { db } from "../../../firebase/firebase.config";

type BookingItemProps = {
    booking: Booking;
    user: UserT;
    t: (key: string) => string;
    onBookingUpdated: () => void;
};

export default function BookingItem({
    booking,
    user,
    t,
    onBookingUpdated,
}: BookingItemProps) {
    const [loading, setIsLoading] = useState(false);

    const updateBookingStatus = async (status: string) => {
        if (!user.approved) return;

        setIsLoading(true);
        try {
            const bookingRef = doc(db, "bookings", booking.id!);
            await updateDoc(bookingRef, { status });
            console.log(`Status updated to ${status}.`);
            onBookingUpdated();
        } catch (error) {
            console.error(`Error updating status to ${status}:`, error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteBooking = async () => {
        setIsLoading(true);
        try {
            const bookingRef = doc(db, "bookings", booking.id!);
            await deleteDoc(bookingRef);
            console.log(`Booking with ID ${booking.id} deleted successfully.`);
            onBookingUpdated();
        } catch (error) {
            console.error("Error deleting booking: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const statusColors = {
        pending: "border-yellow-400 bg-yellow-400",
        confirmed: "border-green bg-green",
        declined: "border-red-500 bg-red-500",
        fulfilled: "border-blue-500 bg-blue-500",
        expired: "border-gray-500 bg-gray-500",
        postponed: "border-orange-400 bg-orange-400",
    };

    const statusColor =
        statusColors[booking.status as keyof typeof statusColors] ||
        "border-gray-300 bg-gray-300";

    return (
        <ScrollArea
            className={`w-full rounded-lg border-2 shadow-lg ${statusColor.split(" ")[0]}`}
        >
            {loading && <LoadingOverlay />}
            <div className="flex w-full min-w-[800px] items-center justify-between gap-8 px-4 py-3">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div
                            className={`size-2 rounded-full ${statusColor.split(" ")[1]}`}
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
                                        updateBookingStatus("confirmed")
                                    }
                                >
                                    <Check className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="destructive"
                                    className="h-fit p-2"
                                    onClick={() =>
                                        updateBookingStatus("declined")
                                    }
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <p>{booking.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <p>{booking.email}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <p>{booking.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <p>{booking.address}</p>
                    </div>
                </div>

                <div className="space-y-1">
                    <p className="font-medium capitalize">
                        {t("options.title")}
                    </p>
                    <p className="font-medium capitalize">
                        {t(`options.${booking.option}`)}
                    </p>
                    <div>
                        {booking.option === "subscription" && (
                            <p className="text-sm capitalize">
                                {t(`plans.${booking.plan!.toLowerCase()}`)}
                            </p>
                        )}
                    </div>
                </div>
                <div>
                    <p className="font-medium capitalize">
                        {t("services.title")}
                    </p>
                    <div>
                        {booking.services?.map((service, index) => (
                            <p key={index} className="text-sm">
                                {t(`services.${service}`)}
                            </p>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {user.approved && booking.status !== "postponed" && (
                        <Button
                            className="h-fit bg-orange-400 p-2 hover:bg-orange-300"
                            onClick={() => updateBookingStatus("postponed")}
                        >
                            <Hourglass className="h-4 w-4" />
                        </Button>
                    )}
                    <Button
                        variant="destructive"
                        className="h-fit p-2"
                        onClick={deleteBooking}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
