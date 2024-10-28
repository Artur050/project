import { authConfig } from '@/config/auth';
import { getServerSession } from 'next-auth/next';
import Image from 'next/image';

export default async function Profile() {
    const session = await getServerSession(authConfig);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Профиль пользователя
                </h1>
                <h2 className="text-lg font-semibold text-gray-600 mb-2">
                    Имя: {session?.user?.name}
                </h2>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    Email: {session?.user?.email}
                </h3>
                {session?.user?.image && (
                    <div className="flex justify-center mb-4">
                        <Image
                            alt="Profile image"
                            src={session.user.image}
                            width={100}
                            height={100}
                            layout="fixed"
                            className="rounded-full border-2 border-gray-300"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
