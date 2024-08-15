import { axiosInstance } from "@/lib/axios";
import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { cookies } from "next/headers";

const setAuthCookies = (uid: string, client: string, token: string) => {
  cookies().set('uid', uid);
  cookies().set('client', client);
  cookies().set('access-token', token);
};

const handleOAuthResponse = (response: any) => {
  if (response.status !== 200) {
    console.error("Failed to log in");
    return false;
  }

  const { uid, client, 'access-token': token } = response.headers;
  
  if (!uid || !client || !token) {
    console.error("Failed to retrieve tokens from response headers");
    return false;
  }

  setAuthCookies(uid, client, token);
  return true;
};

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        const response = await axiosInstance.post(
          "/auth/oauth",
          { user, profile },
          { headers: { "Content-Type": "application/json" } }
        );
        return handleOAuthResponse(response);
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};