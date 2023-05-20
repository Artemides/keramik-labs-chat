import { getServerSession } from "next-auth/next";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export const GET = async (req: NextApiRequest) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      const homeUrl = new URL("/");
      return NextResponse.redirect(homeUrl);
    }
    const token = await getToken({ req, secret, raw: true });

    return NextResponse.json({ token });
  } catch (error) {
    console.log({ error });
  }
};
