import { useFieldArray, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import MainButton from "@/components/MainButton";

type TitleDescriptionsProps = {
    control: Control<any>;
    name: string;
    t: (arg: string) => string;
};

export function TitleDescriptions({
    control,
    name,
    t,
}: TitleDescriptionsProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    });

    return (
        <div className="flex flex-col items-start gap-4">
            <FormLabel>{t("label")}</FormLabel>
            {fields.map((field, index) => (
                <FormField
                    key={field.id}
                    control={control}
                    name={`${name}.${index}.value`}
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        {...field}
                                        placeholder={t("placeholder")}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        variant="destructive"
                                    >
                                        {t("removeButton")}
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
            <MainButton
                variant="transparent"
                type="button"
                onClick={() => append({ id: Date.now(), value: "" })}
            >
                {t("addButton")}
            </MainButton>
        </div>
    );
}
