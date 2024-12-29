type Booking ={
    id?:string,
    address: string;
    email: string;
    name: string;
    phone: string;
    option: "subscription" | "service";
    plan?: "standart" | "deluxe" | "premium";
    services?: string[];
    status:
        | "pending"
        | "confirmed"
        | "declined"
        | "fulfilled"
        | "expired"
        | "postponed"
        | "deleted";
}

export type { Booking };
  