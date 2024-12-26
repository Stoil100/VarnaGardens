import { z } from "zod";

export const HeroBookingSchema = (t: (arg: string) => string) =>
    z.object({
        name: z
            .string({
                required_error: t("errors.name.required"),
            })
            .min(2, { message: t("errors.name.min") })
            .max(50, { message: t("errors.name.max") }),
        email: z
            .string({
                required_error: t("errors.email.required"),
            })
            .email({ message: t("errors.email.invalid") }),
        phone: z
            .string({
                required_error: t("errors.phone.required"),
            })
            .regex(
                /^\+?[0-9]{1,3}?[-. ]?(\(?\d{1,4}\)?)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/,
                {
                    message: t("errors.phone.invalid"),
                },
            ),
        address: z.string({
            required_error: t("errors.address.required"),
        }),
        services: z.enum(
            ["cleanup", "invest", "care", "protection", "grass", "water"],
            {
                invalid_type_error: t("errors.services.invalid"),
            },
        ),
    });

export type BookingSchemaType = z.infer<ReturnType<typeof HeroBookingSchema>>;
