"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createSessionClient();

    const response = await account.createEmailPasswordSession(email, password);

    return parseStringify(response);
  } catch (error) {
    console.error("Erro", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, primeiroNome, ultimoNome } = userData;
  try {
    const { account } = await createAdminClient();

    const fullName = `${primeiroNome} ${ultimoNome}`;

    // console.log("tentando criar conta...")

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullName
    );

    console.log("conta criada", newUserAccount);

    // console.log("tentando criar sessão...")

    const session = await account.createEmailPasswordSession(email, password);

    // console.log("sessão criada", session);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Erro", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();

    const user = await account.get();

    // console.log("usuário logado", user);

    return parseStringify(user);

  } catch (error) {
    console.log(error)
    return null
  }
}

export const logOutAccount = async () => {
  try {
    const { account } = await createSessionClient();


    (await cookies()).delete("appwrite-session");

    await account.deleteSession("current");

  } catch (error) {
    console.error("Erro", error);
    return null
  }
}