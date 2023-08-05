import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/lib/prismadb";
import { extend } from "lodash";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params: { id } }: any) {
  try {
    const currentUser = await getCurrentUser();
    console.log(currentUser);
    const user = await prismadb.user.findUnique({
      where: {
        id,
      },
    });

    // if (!currentUser) {
    //   console.log("user not signed in");

    //   return new NextResponse("please sign in", { status: 400 });
    // }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req: Request, { params: { id } }: any) {
  try {
    const body = await req.json();
    const { firstName, lastName, password, educator, email } = body;
    // const currentUser = await getCurrentUser();
    const currentUser = await prismadb.user.findUnique({
      where: {
        id,
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

    // const newUser: any = {
    //   firstName,
    //   lastName,
    //   educator,
    // };

    // if (password) {
    //   newUser.password = password;
    // }

    let newUser = extend(currentUser, body);

    console.log(newUser);

    const updateUser = await prismadb.user.update({
      where: {
        id,
      },
      data: { ...newUser, id: undefined },
    });

    return NextResponse.json({ user: updateUser }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req: Request, { params: { id } }: any) {
  try {
    const currentUser = await prismadb.user.findUnique({
      where: {
        id,
      },
    });

    if (!currentUser) {
      console.log("user not signed in");

      return new NextResponse("please sign in", { status: 400 });
    }
    let deletedUser = await prismadb.user.delete({
      where: {
        id,
      },
    });
    console.log(deletedUser);
    deletedUser.password = "";
    return NextResponse.json({ user: deletedUser }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
