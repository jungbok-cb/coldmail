import NextLink from 'next/link';
import AccountConnect from './AccountConnect';

export function NavbarTitle() {
    return (
        <div className="flex h-8 items-center">
            <NextLink href="/" passHref className="relative h-8 w-8" aria-label="Home page">
                <div className="absolute inset-0 rounded-full bg-white" />
            </NextLink>
            <NextLink
                href="/"
                passHref
                className="font-robotoMono text-xl font-medium text-white no-underline ml-2"
                aria-label="Home page"
            >
                Welcome to COLD MAIL
            </NextLink>
        </div>
    );
}

function Navbar() {
    return (
        <nav className="flex items-center justify-between rounded-[50px] border border-stone-300 bg-white bg-opacity-10 p-4 backdrop-blur-2xl">
            <NavbarTitle />
            <AccountConnect />
        </nav>
    );
}

export default Navbar;
