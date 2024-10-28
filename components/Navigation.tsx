'use client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchComponent from './SearchComponent ';

type NavLink = {
    label: string;
    href: string;
};
type Props = {
    navLinks: NavLink[];
};

const Navigation = ({ navLinks }: Props) => {
    const pathname = usePathname();
    const session = useSession();

    console.log(session);

    return (
        <>
            <nav className="md:flex md:flex-1 justify-between items-center md:gap-8 gap-1 grid">
                {navLinks.map(link => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={isActive ? ' text-white' : ''}
                        >
                            {link.label}
                        </Link>
                    );
                })}
                {session?.data && (
                    <>
                        <Link
                            href="/profile"
                            className={pathname === '/profile' ? 'text-white' : ''}
                        >
                            Profile
                        </Link>
                        <Link
                            href="/listtemplate"
                            className={pathname === '/listtemplate' ? 'text-white' : ''}
                        >
                            List of templates
                        </Link>
                        <Link
                            href="/template"
                            className={pathname === '/template' ? 'text-white' : ''}
                        >
                            Template
                        </Link>
                    </>
                )}
                {session?.data ? (
                    <>
                        <Link href="#" onClick={() => signOut({ callbackUrl: '/' })}>
                            Sign Out
                        </Link>
                        <SearchComponent />
                    </>
                ) : (
                    <>
                        <Link href="/signin" className={pathname === '/signin' ? 'text-white' : ''}>
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className={pathname === '/register' ? 'text-white' : ''}
                        >
                            Registration
                        </Link>
                    </>
                )}
            </nav>
        </>
    );
};

export { Navigation };
