import { z } from "zod";

export const ContactSchema = (t: (arg: string) => string) =>
    z.object({
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
        message: z
            .string({
                required_error: t("message.required"),
            })
            .max(700, { message: t("message.max") }),
    });
export type ContactSchemaType = z.infer<ReturnType<typeof ContactSchema>>;
