'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"
import { FormEventHandler } from "react";

const SignInForm = () => {
const router = useRouter();
const handleSubmit : FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget)

    const res = await signIn('credentials',{
        email: formData.get('email'),
        password: formData.get('password'),
        callbackUrl: '/profile'
    } )

    if(res && !res.error ) {
        router.push('/profile')
    } else {
        console.error(res?.error);
    }
}

return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <input type="email" name="email" required placeholder="Email" autoComplete="on"
        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"  />
        <input type="password" name="password" required placeholder="Password" autoComplete="on"
        className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-1" />
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200">Sign In</button>
    </form>
)
}

export {SignInForm}