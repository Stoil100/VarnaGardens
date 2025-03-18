import { z } from "zod";

export const BookingSchema = (t: (arg: string) => string) =>
    z
        .object({
            name: z
                .string({
                    required_error: t("name.required"),
                })
                .min(2, { message: t("name.min") })
                .max(50, { message: t("name.max") }),
            email: z
                .string({
                    required_error: t("email.required"),
                })
                .email({ message: t("email.invalid") }),
            phone: z
                .string({
                    required_error: t("phone.required"),
                })
                .regex(
                    /^\+?[0-9]{1,3}?[-. ]?(\(?\d{1,4}\)?)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/,
                    {
                        message: t("phone.invalid"),
                    },
                ),
            address: z.string({
                required_error: t("address.required"),
            }),
            option: z.enum(["subscription", "service"], {
                invalid_type_error: t("option.invalid"),
            }),
        })
        .and(
            z.union([
                z.object({
                    option: z.literal("subscription"),
                    plan: z
                        .enum(["base", "standard", "deluxe", "premium"], {
                            invalid_type_error: t("plan.invalid"),
                        })
                        .optional(),
                }),
                z.object({
                    option: z.literal("service"),
                    services: z
                        .array(z.string())
                        .max(3, { message: t("services.max") })
                        .refine((value) => value.some((item) => item), {
                            message: t("services.required"),
                        })
                        .optional(),
                }),
            ]),
        );

export type BookingSchemaType = z.infer<ReturnType<typeof BookingSchema>>;
