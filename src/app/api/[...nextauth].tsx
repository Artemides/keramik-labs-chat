import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

import GithubProvider from 'next-auth/providers/github';

export const authOptions:NextAuthOptions={
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!
        })
    ]
}

export default NextAuth(authOptions)    