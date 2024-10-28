import { Navigation } from './Navigation';

const navItems = [{ label: 'Home', href: '/' }];

const TheHeader = () => {
    return (
        <header className="flex md:h-[100px] bg-[#7248B9] justify-between p-4 md:text-lg text-sm">
            <Navigation navLinks={navItems} />
        </header>
    );
};

export { TheHeader };
