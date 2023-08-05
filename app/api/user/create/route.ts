import { NextResponse } from "next/server";
import prismadb from "@/app/lib/prismadb";
import { hashPassword } from "../../utils/auth";

export async function POST(req: Request, res: Response) {
  try {
    // await dbConnect();
    const body = await req.json();
    // console.log(body, req);

    let { firstName, lastName, email, password } = body as any;
    console.log(firstName, lastName, email, password);

    password = await hashPassword(password);
    if (!firstName)
      return new NextResponse("First name is required", {
        status: 400,
      });
    if (!lastName)
      return new NextResponse("Last name is required", {
        status: 400,
      });
    if (!password || password.length < 6) {
      return new NextResponse(
        "Password is required and should be min 6 characters long",
        {
          status: 400,
        }
      );
    }
    // let userExist = await userModel.findOne({ email }).exec();
    let userExist = await prismadb.user.findFirst({
      where: {
        email,
      },
    });
    if (userExist)
      return new NextResponse("Email is taken", {
        status: 400,
      });
    // const user = new userModel(req.body);
    const user = await prismadb.user.create({
      data: {
        email,
        password,
        firstName,
        lastName,
      },
    });
    console.log(user);

    // await user.save();
    // user.password = undefined;
    return new NextResponse("Successfully signed up", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}
