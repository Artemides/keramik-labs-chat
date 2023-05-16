import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handleError(req:NextApiRequest,res:NextApiResponse){

    const session=await getServerSession(req,res,authOptions);

    if(!session){
        return res.send({
            error:"You must be signed in to view this page"
        })
    }
    const token=getToken({req,secret,raw:true})

    res.json({token})
}