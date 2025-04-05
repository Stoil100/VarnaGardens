import { z } from "zod";

export const BookingSchema = (t: (arg: string) => string) => {
    const phoneRegex =
        /^\+?[0-9]{1,3}?[-. ]?(\(?\d{1,4}\)?)?[-. ]?\d{1,4}[-. ]?\d{1,4}[-. ]?\d{1,9}$/;

    // Helper to trim strings before validation
    const trimString = (field: unknown) =>
        typeof field === "string" ? field.trim() : field;

    const schema = z
        .object({
            option: z.enum(["subscription", "service"], {
                required_error: t("option.required"),
                invalid_type_error: t("option.invalid"),
            }),
            name: z.preprocess(
                trimString,
                z
                    .string({
                        required_error: t("name.required"),
                    })
                    .min(2, { message: t("name.min") })
                    .max(50, { message: t("name.max") }),
            ),
            email: z.preprocess(
                trimString,
                z
                    .string({
                        required_error: t("email.required"),
                    })
                    .email({ message: t("email.invalid") }),
            ),
            phone: z.preprocess(
                trimString,
                z
                    .string({
                        required_error: t("phone.required"),
                    })
                    .regex(phoneRegex, { message: t("phone.invalid") }),
            ),
            address: z.preprocess(
                trimString,
                z.string({
                    required_error: t("address.required"),
                }),
            ),
            services: z
                .array(z.preprocess(trimString, z.string()), {
                    required_error: t("services.required"),
                    invalid_type_error: t("services.invalid"),
                })
                .min(1, { message: t("services.required") }),
            // "plan" is defined as optional here. Its conditional presence is validated later.
            plan: z
                .enum(["base", "standard", "deluxe", "premium"], {
                    required_error: t("plan.required"),
                    invalid_type_error: t("plan.invalid"),
                })
                .optional(),
        })
        .superRefine((data, ctx) => {
            if (data.option === "subscription") {
                // When the option is "subscription", the plan field must be provided.
                if (data.plan === undefined) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: t("plan.required"),
                        path: ["plan"],
                    });
                }
            } else if (data.option === "service") {
                // When the option is "service", the plan field must not be provided.
                if (data.plan !== undefined) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: t("plan.notAllowed"),
                        path: ["plan"],
                    });
                }
                // Optionally, enforce that services does not exceed 3 items for the "service" option.
                if (data.services.length > 3) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message: t("services.max"),
                        path: ["services"],
                    });
                }
            }
        });

    return schema;
};

export type BookingSchemaType = z.infer<ReturnType<typeof BookingSchema>>;
