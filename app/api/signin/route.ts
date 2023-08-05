import prismadb from "@/app/lib/prismadb";
import { comparePassword } from "../utils/auth";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { signIn } from "next-auth/react";

// export async function POST(req: Request, res: Response) {
//   try {
//     const body = await req.json();
//     const { email, password } = body;

//     let user = await prismadb.user.findUnique({
//       where: {
//         email,
//       },
//     });
//     if (!user)
//       return NextResponse.json({ error: "User not found" }, { status: 400 });
//     const match = await comparePassword(password, user.password);
//     if (!match)
//       return NextResponse.json(
//         { error: "Email and password dont match" },
//         { status: 400 }
//       );
//     const token = jwt.sign({ _id: user.id }, "hello", {
//       expiresIn: "1d",
//     });
//     user.password = "";
//     console.log(res.headers);
//     const cookieStore = cookies();
//     cookieStore.set("token", token, {
//       httpOnly: true,
//       // secure: true, // only works on https
//     });
//     console.log(token, "token");
//     console.log(user, "user");

//     return NextResponse.json(
//       { success: "Sign in successful", user },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.log(error);

//     return NextResponse.json({ error: "Could not sign in" }, { status: 400 });
//   }
// }

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { email, password } = body;
    let user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    const match = await comparePassword(password, user.password);
    if (!match)
      return NextResponse.json(
        { error: "Email and password dont match" },
        { status: 400 }
      );
    signIn("credentials", { email, password }).then((data) => {
      console.log(data);

      return data;
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Could not sign in" }, { status: 400 });
  }
}
