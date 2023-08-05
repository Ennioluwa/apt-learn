import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response, next: NextResponse) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      console.log("user not signed in");

      return new NextResponse("please sign in", { status: 400 });
    }

    let users = await prismadb.user.findMany({
      select: {
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
