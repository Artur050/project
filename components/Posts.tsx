'use client';
import { IPost } from "@/models/Posts/IPost";
import { getAllPosts } from "@/services/getPosts";
import Link from "next/link";
import useSWR from "swr";

const Posts = () =>  {
    const {data: posts, isLoading} = useSWR("posts", getAllPosts)

  return isLoading ? 
    (<h3>Loading....!</h3>
    ) : (
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
  )
};

export {Posts};