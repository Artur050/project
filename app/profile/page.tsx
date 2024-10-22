import { authConfig } from "@/config/auth";
import { getServerSession } from "next-auth/next";
import Image from "next/image";

export default async function Profile() {
    const session = await getServerSession(authConfig);

    return (
        <div>
            <h1>Profile of {session?.user?.name}</h1>
            <h2>Email {session?.user?.email}</h2>
            {session?.user?.image && (
                <Image
                    alt="Profile image"
                    src={session.user.image}
                    width={100}
                    height={100}
                    layout="responsive"
                />
            )}
        </div>
      
    );
  }
  