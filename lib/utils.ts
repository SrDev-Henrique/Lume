/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const authFormSchema = (type: string) =>
  z.object({
    // Ambos
    email: z
      .string()
      .email("Por favor, insira um endereço de e-mail válido.")
      .nonempty("O campo de e-mail não pode estar vazio.")
      .transform((val) => val.toLowerCase()),
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres.")
      .nonempty("O campo de senha não pode estar vazio."),
    // sign-up
    primeiroNome:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, "Primeiro nome inválido.")
            .nonempty("Primeiro nome inválido."),
    ultimoNome:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, "Último nome inválido.")
            .nonempty("Último nome inválido."),
    endereco1:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .max(50, "Endereço inválido.")
            .nonempty("Endereço inválido."),
    cidade:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(1, "Cidade inválida.")
            .nonempty("Cidade inválida."),
    estado:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(2, "Estado inválido.")
            .max(2, "Estado precisa ter no máximo 2 caracteres.")
            .nonempty("Estado inválido."),
    codigoPostal:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .transform((val) =>
              val
                .replace(/\D/g, "")
                .replace(/^(\d{5})(\d{3})$/, "$1-$2")
            )
            .refine((val) => /^\d{5}-\d{3}$/.test(val), {
              message: "Código postal inválido",
            }),
    dataNascimento:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .max(10, "Data de nascimento precisa ter 10 dígitos.")
            .transform((val) =>
              val
                .replace(/\D/g, "")
                .replace(/^(\d{2})(\d{2})(\d{4})$/, "$1/$2/$3")
            )
            .refine((val) => /^\d{2}\/\d{2}\/\d{4}$/.test(val), {
              message: "Data de nascimento inválida",
            }),
    cpf:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .max(14, "O CPF deve ter 11 dígitos.")
            .transform((val) =>
              val
                .replace(/\D/g, "")
                .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
            )
            .refine((val) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(val), {
              message: "CPF inválido",
            }),
  });
