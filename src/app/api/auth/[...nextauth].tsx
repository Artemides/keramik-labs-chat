import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubAuthProvider from "next-auth/providers/github";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
export const authOptions: AuthOptions = {
  providers: [
    GithubAuthProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  jwt: {
    encode: ({ secret, token }) =>
      jsonwebtoken.sign(
        {
          ...token,
          iss: "nextauth",
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
        },
        secret
      ),
    decode:async({secret,token})=>jsonwebtoken.verify(token!,secret) as JWT
  },
  callbacks:{
    async jwt({token,profile}){
        if(profile) token.name=profile?.name!;

        return token;
    },
    session({session,token}){
        if(token.name && session.user) session.user.name=token.name; 
        return session
    }
  }
};
export default NextAuth(authOptions);
