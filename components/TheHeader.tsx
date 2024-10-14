import { Navigation } from "./Navigation";

const navItems = [
    {label: "Home", href: "/"},
    {label: "Blog", href: "/blog"},
    {label: "About", href: "/about"},

]

const TheHeader = () => {
    return (
      <header className=" flex h-[100px] bg-cyan-700 justify-center items-center gap-2 text-lg">
        <Navigation navLinks={navItems} />
      </header>
    )
  };
  
  export {TheHeader};