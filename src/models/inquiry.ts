import { ContactSchemaType } from "@/components/schemas/contact";
import { Timestamp } from "firebase/firestore";

interface Inquiry extends ContactSchemaType {
    id: string;
    createdAt: Timestamp;
}

export type { Inquiry };
