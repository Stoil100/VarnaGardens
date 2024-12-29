import { z } from "zod";

export const BookingSchema = (t: (arg: string) => string) =>
    z
        .object({
            name: z
                .string({
                    required_error: t("form.errors.name.required"),
                })
                .min(2, { message: t("form.errors.name.min") })
                .max(50, { message: t("form.errors.name.max") }),
            email: z
                .string({
                    required_error: t("form.errors.email.required"),
                })
                .email({ message: t("form.errors.email.invalid") }),
            phone: z
                .string({
                    required_error: t("form.errors.phone.required"),
                })
                .regex(
                    /^\+?[0-9]{1,3}?[-. ]?(\(?\d{1,4}\)?)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/,
                    {
                        message: t("form.errors.phone.invalid"),
                    },
                ),
            address: z.string({
                required_error: t("form.errors.address.required"),
            }),
            option: z.enum(["subscription", "service"], {
                invalid_type_error: t("form.errors.option.invalid"),
            }),
        })
        .and(
            z.union([
                z.object({
                    option: z.literal("subscription"),
                    plan: z
                        .enum(["standart", "deluxe", "premium"], {
                            invalid_type_error: t("form.errors.plan.invalid"),
                        })
                        .optional(),
                }),
                z.object({
                    option: z.literal("service"),
                    services: z
                        .array(z.string()).max(3,{message: t("form.errors.services.max")})
                        .refine((value) => value.some((item) => item), {
                            message: t("form.errors.services.required"),
                        })
                        .optional(),
                }),
            ]),
        );

export type BookingSchemaType = z.infer<ReturnType<typeof BookingSchema>>;
