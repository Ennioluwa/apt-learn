"use client";

import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const handleGetUsers = async (e: any) => {
    e.preventDefault();

    await axios
      .get("http://localhost:3000/api/users")
      .then(({ data }) => {
        console.log(data.users);
        setUsers(data.users);

        // router.refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center items-center gap-5">
      <button onClick={(e) => handleGetUsers(e)}>Get Users</button>
      <button onClick={() => signOut()}>sign out</button>
      <div>
        {users.map((user: any, i) => (
          <div key={i}>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
