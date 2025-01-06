/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from "./ui/input";
import { FormField, FormLabel, FormControl, FormMessage } from "./ui/form";

import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { authFormSchema } from "@/lib/utils";

const formSchema = authFormSchema("sign-up");

interface CustomInputProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  placeholder: string;
}

const CustomInput = ({
  control,
  name,
  label,
  placeholder,
}: CustomInputProps) => {
  const formatValue = (name: string, value: string) => {
    if (name === "cpf") {
      return value
        .replace(/\D/g, "") 
        .replace(/(\d{3})(\d)/, "$1.$2") 
        .replace(/(\d{3})(\d)/, "$1.$2") 
        .replace(/(\d{3})(\d)/, "$1-$2"); 
    } else if (name === "dataNascimento") {
      return value
        .replace(/\D/g, "") 
        .replace(/(\d{2})(\d)/, "$1/$2") 
        .replace(/(\d{2})(\d)/, "$1/$2"); 
    } else if (name === "codigoPostal") {
      return value
        .replace(/\D/g, "") 
        .replace(/(\d{5})(\d)/, "$1-$2"); 
    }
    return value; 
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                className="input-class"
                type={name === "password" ? "password" : "text"}
                maxLength={name === "cpf" ? 14 : name === "dataNascimento" ? 10 : name === "codigoPostal" ? 9 : 50}
                {...field}
                onChange={(e) => {
                  const formattedValue = formatValue(name, e.target.value);
                  field.onChange(formattedValue);
                }}
                value={formatValue(name, field.value || "")}
              />
            </FormControl>
            <FormMessage className="form-message mt-2" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
