import { BookingSchemaType } from "@/components/schemas/booking";
import { Timestamp } from "firebase/firestore";

type Booking = BookingSchemaType & {
    id: string;
    status:
        | "pending"
        | "confirmed"
        | "declined"
        | "fulfilled"
        | "expired"
        | "postponed";
    createdAt: Timestamp;
};

export type { Booking };
