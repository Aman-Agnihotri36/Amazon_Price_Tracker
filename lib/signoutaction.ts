// app/lib/actions.ts (rename from signupaction.ts for clarity)
"use server";

import { signOut } from "@/auth";

export async function signOutWithGoogle() {
    await signOut({ redirectTo: "/" });
}