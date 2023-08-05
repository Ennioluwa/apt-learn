import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/lib/prismadb";
import { NextResponse } from "next/server";
import { extend } from "lodash";

export async function GET(
  req: Request,
  res: Response,
  next: NextResponse,
  { params: { id } }: any
) {
  try {
    {
      id && console.log(id);
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      console.log("user not signed in");

      return new NextResponse("please sign in", { status: 400 });
    }

    return NextResponse.json({ user: currentUser }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(
  req: Request,
  res: Response,
  next: NextResponse,
  { params: { id } }: any
) {
  const body = await req.json();
  const { firstName, lastName, password, educator, email } = body;
  console.log(id);

  try {
    // const currentUser = await getCurrentUser();
    const currentUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    if (!currentUser) {
      console.log("user not signed in");

      return new NextResponse("please sign in", { status: 400 });
    }

    if (password && password.length < 6) {
      return new NextResponse(
        "Password is required and should be min 6 characters long",
        {
          status: 400,
        }
      );
    }

    const newUser: any = {
      firstName,
      lastName,
      educator,
    };

    if (password) {
      newUser.password = password;
    }

    const updateUser = await prismadb.user.update({
      where: {
        email: currentUser.email,
      },
      data: newUser,
    });

    return NextResponse.json({ user: updateUser }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req: Request, res: Response, next: NextResponse) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      console.log("user not signed in");

      return new NextResponse("please sign in", { status: 400 });
    }

    return NextResponse.json({ user: currentUser }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
