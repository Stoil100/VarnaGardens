import { useFieldArray, Control } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MainButton from "@/components/MainButton"

type DescriptionsProps = {
  control: Control<any>;
  name: string;
  t: (arg: string) => string;
}

export function Descriptions({ control, name, t }: DescriptionsProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  })

  return (
    <div className="space-y-4 flex flex-col items-start">
      <FormLabel>{t("label")}</FormLabel>
      {fields.map((field, index) => (
        <FormField
          key={field.id}
          control={control}
          name={`${name}.${index}.value`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input {...field} placeholder={t("placeholder")} />
                  <Button type="button" onClick={() => remove(index)} variant="destructive">{t("removeButton")}</Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
      <MainButton
        type="button"
        variant="transparent"
        onClick={() => append({ id: fields.length, value: '' })}
      >
        {t("addButton")}
      </MainButton>
    </div>
  )
}

