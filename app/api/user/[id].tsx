import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  try {
    console.log(req);

    // const currentUser = await getCurrentUser();

    // if (!currentUser) {
    //   console.log("user not signed in");

    //   return new NextResponse("please sign in", { status: 400 });
    // }

    return NextResponse.json({ user: "users here" }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
