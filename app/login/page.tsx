"use client";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      console.log(callback);
      if (!callback || callback.error || callback.ok === false) {
        console.log("could not signin");
      } else {
        console.log("sign in successful");
      }
    });
  };

  const handleTest = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className=" h-screen w-screen grid place-items-center gap-10">
      <form
        className="flex flex-col gap-5 border border-white rounded p-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label>email:</label>
          <input
            className="text-black p-2 rounded"
            type="text"
            id="email"
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <label>password:</label>
          <input
            className="text-black p-2 rounded"
            type="text"
            {...register("password", { required: true })}
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <div>
        <button onClick={handleTest} className="">
          Test
        </button>
      </div>
    </div>
  );
};

export default Login;
