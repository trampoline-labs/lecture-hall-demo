import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  // (any) - workaround for prisma adapter
  // types not corresponding with next-auth types
  adapter: PrismaAdapter(prisma) as any,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials.password, user.password!))) {
          return null;
        }

        // Any object returned will be saved in `user` property of the JWT

        // this is persisted to the jwt
        return {
          id: user.id,
          email: user.email,
          role: user.role!,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.sub!;
      }

      return session;
    },
  },
};
