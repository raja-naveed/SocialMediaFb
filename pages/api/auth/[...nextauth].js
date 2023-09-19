import NextAuth from "next-auth";
import GoggleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoggleProvider({
      clientId: "435913252922-h99hsmk8kdfkn0ujc9deg7aoa5r6a5qt.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.uid = token.sub;
      return session;
    },
  },
  secret: "secret123",
};

export default NextAuth(authOptions);