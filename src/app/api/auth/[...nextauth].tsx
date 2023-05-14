import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubAuthProvider from "next-auth/providers/github";

const authOptions:AuthOptions={
    providers:[
        GithubAuthProvider({
            clientId:process.env.GITHUB_CLIENT_ID!,
            clientSecret:process.env.GITHUB_CLIENT_SECRET!
        })
    ]
}
export default NextAuth(authOptions)