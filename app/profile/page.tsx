import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth/next";
import Image from "next/image";

export default async function Profile() {
    const session = await getServerSession(authConfig);

    return (
        <div>
            <h1>Profile of {session?.user?.name}</h1>
            {session?.user?.image && <img alt="image" src={session.user.image}/>}
        </div>
      
    );
  }
  