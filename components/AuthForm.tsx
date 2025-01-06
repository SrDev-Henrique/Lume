/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataNascimento: "",
      cpf: "",
      email: "",
      password: "",
      primeiroNome: "",
      ultimoNome: "",
      endereco1: "",
      estado: "",
      codigoPostal: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
    try {
      if (type === 'sign-up') {
        
      }

      if (type === 'sign-in') {
        
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt={"Lume logo"}
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Lume
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user
              ? "Vincular Conta"
              : type === "sign-in"
              ? "Entrar"
              : "Criar Conta"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Vincule sua conta para começar"
                : "Por favor preencha seus dados"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="primeiroNome"
                      label="Primeiro Nome"
                      placeholder="Informe seu primeiro nome"
                    />
                    <CustomInput
                      control={form.control}
                      name="ultimoNome"
                      label="Último Nome"
                      placeholder="informe seu último nome"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="endereco1"
                    label="Endereço"
                    placeholder="Digite seu endereço"
                  />
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name="estado"
                      label="Estado"
                      placeholder="Exemplo: SP"
                    />
                    <CustomInput
                      control={form.control}
                      name="codigoPostal"
                      label="Código Postal"
                      placeholder="Exemplo: 12345-678"
                    />
                  </div>
                  <div className='flex gap-4'>
                    <CustomInput
                      control={form.control}
                      name="dataNascimento"
                      label="Data de Nascimento"
                      placeholder="DD/MM/YYYY"
                    />
                    <CustomInput
                      control={form.control}
                      name="cpf"
                      label="CPF"
                      placeholder="Digite seu CPF"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Digite seu email"
              />
              <CustomInput
                control={form.control}
                name="password"
                label="Senha"
                placeholder="Digite sua senha"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      {type === "sign-in"
                        ? "Entrando..."
                        : "Criando Conta..."}{" "}
                    </>
                  ) : type === "sign-in" ? (
                    "Entrar"
                  ) : (
                    "Criar Conta"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in" ? "Não tem uma conta?" : "Já tem uma conta?"}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Criar Conta" : "Entrar"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
