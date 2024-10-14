import { Posts } from "@/components/Posts";
import { PostSearch } from "@/components/PostSearch";

export default function Blog() {

    return (
        <>
        <h1 className="text-4xl font-bold text-center my-8 text-gray-800">
            Welcome to BLOG
        </h1>
        <PostSearch />
        <Posts />
        </>
      
    );
}
  