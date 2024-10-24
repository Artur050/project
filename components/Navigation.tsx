'use client'
import { signOut, useSession } from "next-auth/react";
import Link from "next/link"
import { usePathname } from "next/navigation"

type NavLink = {
    label: string;
    href: string;
}
type Props = {
    navLinks: NavLink[];
}

const Navigation = ({ navLinks }:Props) => {
    const pathname = usePathname();
    const session = useSession();

    console.log(session);
    



    return (
        <>{
            navLinks.map((link) => {
               const isActive = pathname === link.href;
               return (
                <Link
                key={link.label}
                href={link.href}
                className={isActive ? ' text-white' : ''}
                >
                    {link.label}
                </Link>
               )
            })}
            {session?.data && (
                <>
                             <Link href="/profile">Profile</Link>
                             <Link href="/template">Template</Link>
                </>

            )}
            {session?.data ? <Link href="#" onClick={() => signOut({callbackUrl: '/' })}>Sign Out</Link> : 
            <>
            <Link href="/signin">Sign In</Link>
            <Link href="/register">Регистрация</Link>
            </> }
        </>
    )
}

export { Navigation }