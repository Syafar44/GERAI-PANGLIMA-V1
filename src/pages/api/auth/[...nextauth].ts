import environment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 365,
  },
  secret: environment.AUTH_SECRET,
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"username" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        if (!credentials) return null;

        const { username, password } = credentials;

        // authServices.login harus validasi ke DB
        const result = await authServices.login({ username, password });
        if (!result || result.status !== 200) return null;

        const accessToken = result.data.data;
        const me = await authServices.getProfileWithToken(accessToken);
        const user = me?.data?.data;

        if (accessToken && user?._id) {
          user.accessToken = accessToken;
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWTExtended; user: UserExtended | null }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: { session: SessionExtended; token: JWTExtended }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
});
