import { IPost } from "@/models/Posts/IPost";
import { Metadata } from "next";
import Link from "next/link";


async function getData() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        next: {
            revalidate: 60,
        }
    });
    return response.json();
}

export const metadata: Metadata = {
    title: "Blog | Next App",
};

export default async function Blog() {
    const posts = await getData();
    return (
        <>
        <h1 className="text-4xl font-bold text-center my-8 text-gray-800">
            Welcome to BLOG
        </h1>
        <ul className="  max-w-4xl mt-100 flex flex-col absolute top-[450px]">
            {posts.map((post:IPost) => {
                return (
                    <li key={post.id}
                    className="bg-white shadow-lg rounded-sm p-1 mb-1 hover:bg-gray-100 transition-all"
                    >
                        <Link href={`/blog/${post.id}`}
                        
                        >{post.title}</Link>
                     </li>
                )
            })}
        </ul>
        </>
      
    );
}
  