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

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      fullName
    );
    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
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

    return parseStringify(user);

  } catch (error) {
    console.log("Erro", error);
  }
}
