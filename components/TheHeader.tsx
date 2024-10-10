import Link from "next/link";

const TheHeader = () => {
    return (
      <header className=" flex h-[100px] bg-cyan-700 justify-center items-center gap-2 text-lg">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
      </header>
    )
  };
  
  export {TheHeader};