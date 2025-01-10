"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    console.log("Fetching user info for userId:", userId);

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("$id", [userId])] // Use the correct field name
    );

    console.log("User documents:", user.documents);

    if (user.documents.length === 0) {
      throw new Error("User not found");
    }

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log("Error in getUserInfo:", error);
    return null;
  }
};

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    // console.log("sessão criada", session);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(user);
  } catch (error) {
    console.error("Erro", error);
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, primeiroNome, ultimoNome } = userData;

  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${primeiroNome} ${ultimoNome}`
    );

    if (!newUserAccount) throw new Error("Error creating user");

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error("Error", error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logOutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    (await cookies()).delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    console.error("Erro", error);
    return null;
  }
};
